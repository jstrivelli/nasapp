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
  var list = []
    if(items){
      items.qtreeNames.forEach(function(element){
        var i = element.QTreeName
        list.push({label:i, value: i})
      });
    }
    return list;
}



class Form7Mode extends Component{
  constructor(props){
    super(props);
    this.state = {filer: 'pbnj00113n2', volume: '', qtree: '', CIFS7ModeData: '', redirect: false, distinctVolumes: [], distinctQtrees: [], isLoading: false};
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
    const data = {table: 'OCI7Mode', filer: filer, volume: volume}
    axios.post(`http://localhost:5000/queryDistinctQtrees7Mode`, data)
      .then(res =>  {
        this.setState({distinctQtrees: createDistinctQtrees(res.data)})
    })
  }

  handleSubmit(event){
    alert('We are about to proceed with filer: ' + this.props.filer);
    const OCIdata = {table: "OCI7Mode", filer: this.props.filer, volume: this.state.volume, qtree: this.state.qtree}
    //AXIOS calls here for 7MODE queries. Pass data to the tables
    axios.post(`http://localhost:5000/query7mode`, OCIdata).then(res => {
        this.setState({'CIFS7ModeData': res.data})
        console.log(res.data)
        this.setState({redirect: true})
    })
    event.preventDefault();
  }

  componentWillMount() {
    const data = {table: 'OCI7Mode', filer: this.props.filer}
    axios.post(`http://localhost:5000/queryDistinctVolumes7Mode`, data)
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
                              CIFS7ModeData: this.state.CIFS7ModeData,
                              SevenMode: true,
                              CDOT: false
                      }
            }}/>
            </div>
          );
    }
    else{
    const {isLoading} = this.state.isLoading
    return(
        <div>
              <h2 id="7Modeheading">Search 7Mode Filer {this.props.filer} </h2>
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


export default Form7Mode;
