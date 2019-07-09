import React from 'react'
import App from './App'
import {HashRouter, Route} from 'react-router-dom';
import NasWorkbook from './NasWorkbook';


export default(
  <HashRouter>
  <div>
    <Route exact path='/' component={App} />
    <Route path='/tables' component={NasWorkbook}/>
  </div>
  </HashRouter>
)
