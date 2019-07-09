import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class TextToExcel extends Component {
  constructor(props){
    super(props);
    this.state = {error: undefined, CIFS7ModeData: "", CIFSCDOTData: "", redirect: false}
  }
  onChange = e => {
         let files = e.target.files;
         var data = {};
         console.log(files);
         let reader = new FileReader();
         reader.onload = r => {
              console.log(r.target.result);
              data = {text: r.target.result}
              axios.post(`http://localhost:5000/parseFile`, data)
                .then(res => {
                  if(res.data.error){
                    this.setState({error: res.data.error})
                  }
                  else{
                    console.log(res)
                    this.setState({CIFS7ModeData: res.data.ociData7Mode, CIFSCDOTData: res.data.ociDataCDOT, redirect: true})
                  }
              })
          };


         reader.readAsText(files[0]);
     }


  render() {
    if(this.state.redirect){
          if(this.state.CIFS7ModeData !==  "" && this.state.CIFSCDOTData === ""){
              return(
                    <Redirect to={{
                             pathname: '/tables',
                             state: {
                                      CIFS7ModeData: this.state.CIFS7ModeData,
                                      SevenMode: true,
                              }
                    }}/>
              );
          }
          else if(this.state.CIFS7ModeData === "" && this.state.CIFSCDOTData !== ""){
            return(
              <Redirect to={{
                       pathname: '/tables',
                       state: {
                                CIFSCDOTData: this.state.CIFSCDOTData,
                                CDOT: true,
                        }
              }}/>
            );
          }
          else{
            return(
              <Redirect to={{
                     pathname: '/tables',
                     state: {
                              CIFSCDOTData: this.state.CIFSCDOTData,
                              CIFS7ModeData: this.state.CIFS7ModeData,
                              CDOT: true,
                              SevenMode: true
                      }
            }}/>
          );
          }
    }
    if(this.state.error){
      return(
        <div onSubmit={this.onFormSubmit}>
        <center>
          <h5>{this.state.error}</h5>
            <input type="file" name="file" onChange={e => this.onChange(e)} className="inputfile"/>
            </center>
          </div>

      )
    }
    else{
      return (
          <div onSubmit={this.onFormSubmit} style={{"align-items": "center"}}>
            <center>
            <input type="file" name="file" onChange={e => this.onChange(e)} className="inputfile"/>
            </center>
          </div>
       )
   }
  }
}

export default TextToExcel;
