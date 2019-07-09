import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Form7Mode from './Form7Mode';
import FormCDOT from './FormCDOT';
import TableSheet from './TableSheet';
import NasWorkbook from './NasWorkbook';
import FilerPick from './FilerPick';
import TextToExcel from './TextToExcel';
import {Redirect} from 'react-router-dom';

it('App Component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Form7Mode Component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Form7Mode filer='pbnj00113n2' />, div);
  ReactDOM.unmountComponentAtNode(div)
});

it('FormCDOT Component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Form7Mode filer='pbnj00113n2' />, div);
  ReactDOM.unmountComponentAtNode(div)
});


it('TableSheet Component', () =>{
  const div = document.createElement('div');
  ReactDOM.render(<TableSheet data={[{"id": 1, "name": "testName", "age": 24}, {"id": 1, "name": "testName2", "age": 5}]}/>, div);
  ReactDOM.unmountComponentAtNode(div)
});

// it('NasWorkBook Component for 7Mode', () =>{
//   const div = document.createElement('div');
//   ReactDOM.render()
//   ReactDOM.unmountComponentAtNode(div)
// });

it('FilerPick Component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilerPick />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('TextToExcel Component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextToExcel />, div)
  ReactDOM.unmountComponentAtNode(div)
})
