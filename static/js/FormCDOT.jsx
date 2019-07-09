import React, { Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import {Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';


function createDistinctVolumes(items){
  var list = []
  if(items){
    items.volumeNames.forEach(function(element){
      var i = element.VolumeName
      list.push({label: i, value: i})
    });
  }
  return list;
}

function createDistinctQtrees(items){
  console.log(items)
  var list = []
    if(items){
      items.qtreeNames.forEach(function(element){
        var i = element.QtreeName
        list.push({label:i, value: i})
      });
    }
    return list;
}



class FormCDOT extends Component{
  constructor(props){
    super(props);
    this.state = {filer: 'pbnj00113n2', volume: '', qtree: '', CIFSCDOTData: '', redirect: false, distinctVolumes: [], distinctQtrees: [], isLoading: false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.qtreeDropDown = this.qtreeDropDown.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
    this.handleQtreeChange = this.handleQtreeChange.bind(this)
  }

  handleVolumeChange = (e, {value}) => {
    this.setState({volume: value})
    this.setState({distinctQtrees: this.qtreeDropDown(this.props.filer, value)});
  }

  handleQtreeChange = (e, {value}) => this.setState({qtree: value})



  qtreeDropDown(filer, volume){
    const data = {table: 'OCICDOT', filer: filer, volume: volume}
    axios.post(`http://localhost:5000/queryDistinctQtreesCDOT`, data)
      .then(res =>  {
        this.setState({distinctQtrees: createDistinctQtrees(res.data)})
        console.log(this.state.distinctQtrees)
    })
  }

  handleSubmit(event){
    alert('We are about to proceed with filer: ' + this.props.filer);
    const OCIdata = {table: "OCICDOT", filer: this.props.filer, volume: this.state.volume, qtree: this.state.qtree}
    //AXIOS calls here for CDOT queries. Pass data to the tables
    axios.post(`http://localhost:5000/queryCDOT`, OCIdata).then(res => {
        this.setState({'CIFSCDOTData': res.data})
        console.log(res.data)
        this.setState({redirect: true})
    })
    event.preventDefault();
  }

  componentWillMount() {
    const data = {table: 'OCICDOT', filer: this.props.filer}
    axios.post(`http://localhost:5000/queryDistinctVolumesCDOT`, data)
      .then(res =>  {
        this.setState({distinctVolumes: createDistinctVolumes(res.data)})
        console.log(this.state.distinctVolumes)
      })
  }

  render(){
    if(this.state.redirect){
          return(
            <div>
            <Redirect to={{
                     pathname: '/tables',
                     state: {
                              CIFSCDOTData: this.state.CIFSCDOTData,
                              CDOT: true,
                              SevenMode: false
                      }
            }}/>
            </div>
          );
    }
    else{
    const {isLoading} = this.state.isLoading
    return(
        <div>
              <h2 id="CDOTheading">Search CDOT Filer {this.props.filer} </h2>
              <div style={{"width": "50%","padding": "30px"}}>
              <h3>Volumes</h3>
        				<VirtualizedSelect ref="volumeSelect"
        					options={this.state.distinctVolumes}
        					simpleValue
        					clearable
        					name="select-volume"
        					value={this.state.volume}
        					onChange={(selectValue) => {this.setState({volume: selectValue})
                  this.setState({distinctQtrees: this.qtreeDropDown(this.props.filer, selectValue)})}}
        					searchable
        				/>
              </div>
              <div style={{"width": "50%","padding": "30px"}}>
                <h3>Qtree</h3>
                <VirtualizedSelect ref="qtreeSelect"
        					options={this.state.distinctQtrees}
        					simpleValue
        					clearable
        					name="select-qtree"
        					value={this.state.qtree}
        					onChange={(selectValue) => {this.setState({qtree: selectValue})}}
        					searchable
        				/>
              </div>
              <div style={{"width": "50%","padding": "30px"}}>
              <Button variant="Primary" disable={isLoading} onClick={!isLoading ? this.handleSubmit : null}>
                  {isLoading ? 'Loading...' : 'View Reports'}
              </Button>
              </div>
      </div>
    )
  }
  }
}


export default FormCDOT;
