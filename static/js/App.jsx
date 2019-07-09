import React, { Component } from 'react';
import FilerPick from './FilerPick'
import {Divider} from 'semantic-ui-react';
import TextToExcel from './TextToExcel'
import './App.css'
import {Helmet} from 'react-helmet'

class App extends Component{

  constructor(props){
    super(props);
    this.state = {filer: '', redirect: "none", error:[]};
  }
    render(){

      return(
        <div>
        <Helmet>
          <style>{'body {background-color: #afafaf;}'}</style>
        </Helmet>
          <p style={{"padding": "60px", "text-align": "center", "font-size": "-webkit-xxx-large"}}>Bank Of America Migration Report System</p>
          <div style={{"padding": "60px"}}>
          <FilerPick/>
          </div>
          <h4 style={{"text-align":"center"}}>Or</h4>
          <hr style={{color: "red", backgroundColor: "black", "height":3, "width": "80%"}}></hr>
          <div style={{"padding": "60px"}}>
          <TextToExcel/>
          </div>
        </div>
      )
    }
}

export default App;
