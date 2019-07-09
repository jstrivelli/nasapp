import React, { Component } from 'react';
import Workbook from 'react-excel-workbook'
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Redirect} from 'react-router-dom';
import TableSheet from './TableSheet';
import {DataFrame} from 'pandas-js';
import Helmet from 'react-helmet';
import './App.css';


function populateColumnNamesExcelWorkbook(data){
  console.log("Loading Data into table")
  //console.log(items.columns)
  var list = []
  const df = new DataFrame(data)
  for(var i = df.columns.size-1; i >= 0; i--){
    list.push(<Workbook.Column label={df.columns.get(i)} value={df.columns.get(i)}/>)
  }
  return list;
}



class NasWorkbook extends Component{
  constructor(props){
    super(props);
    this.state = {SevenMode: false, CDOT: false, CIFSCDOTData:"", CIFS7ModeData:""}
  }


  render(){
    try{
          const redirect = this.props.location.state
          if(redirect.SevenMode && redirect.CDOT){
            return(
              <div>
              <Helmet>
                <style>{'body {background-color: #afafaf;}'}</style>
              </Helmet>
                <div>
                <Workbook filename="example.xlsx" element={<button className="btn btn-lg btn-primary" style={{"background-color": "#13bf28", "border-color": "#9E9E9E"}}>Export Reports Excel</button>}>
                        <Workbook.Sheet data={redirect.CIFSCDOTData} name="Sheet A">
                                {populateColumnNamesExcelWorkbook(redirect.CIFSCDOTData)}
                        </Workbook.Sheet>
                        <Workbook.Sheet data={redirect.CIFSCDOTData} name="Another sheet">
                              {populateColumnNamesExcelWorkbook(redirect.CIFSCDOTData)}
                        </Workbook.Sheet>
                </Workbook>
                </div>
                <div style={{"padding": "20px"}}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="CDOT">
                          <Row>
                                    <Col sm={0.5}>
                                      <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                          <Nav.Link eventKey="CDOT">CDOT</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                          <Nav.Link eventKey="7Mode">7Mode</Nav.Link>
                                        </Nav.Item>

                                      </Nav>
                                    </Col>
                                    <Col sm={11}>
                                      <Tab.Content>
                                      <div className="subTabs" style={{padding: "20px"}}>
                                        <Tab.Pane eventKey="CDOT">
                                              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                                        <Row>
                                                                  <Col sm={0.5}>

                                                                    <Nav variant="pills" className="flex-column">
                                                                      <Nav.Item>
                                                                        <Nav.Link eventKey="first">CIFSData</Nav.Link>
                                                                      </Nav.Item>
                                                                      <Nav.Item>
                                                                        <Nav.Link eventKey="second">NFSData</Nav.Link>
                                                                      </Nav.Item>

                                                                    </Nav>
                                                                  </Col>
                                                                  <Col sm={11}>
                                                                    <Tab.Content>
                                                                      <Tab.Pane eventKey="first">
                                                                           <TableSheet data={redirect.CIFSCDOTData}/>
                                                                      </Tab.Pane>
                                                                      <Tab.Pane eventKey="second">
                                                                          <h1>Will be populated as we go</h1>
                                                                      </Tab.Pane>
                                                                    </Tab.Content>
                                                                  </Col>
                                                        </Row>
                                              </Tab.Container>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="7Mode">
                                                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                                          <Row>
                                                                    <Col sm={0.5}>

                                                                      <Nav variant="pills" className="flex-column">
                                                                        <Nav.Item>
                                                                          <Nav.Link eventKey="first">CIFSData</Nav.Link>
                                                                        </Nav.Item>
                                                                        <Nav.Item>
                                                                          <Nav.Link eventKey="second">NFSData</Nav.Link>
                                                                        </Nav.Item>

                                                                      </Nav>
                                                                    </Col>
                                                                    <Col sm={11}>
                                                                      <Tab.Content>
                                                                        <Tab.Pane eventKey="first">
                                                                             <TableSheet data={redirect.CIFS7ModeData}/>
                                                                        </Tab.Pane>
                                                                        <Tab.Pane eventKey="second">
                                                                            <h1>Will be populated as we go</h1>
                                                                        </Tab.Pane>
                                                                      </Tab.Content>
                                                                    </Col>
                                                          </Row>
                                                </Tab.Container>
                                        </Tab.Pane>
                                        </div>
                                      </Tab.Content>
                                    </Col>
                          </Row>
                </Tab.Container>
              </div>
              </div>
        );
          }
          else if(redirect.SevenMode){
            return(
              <div>
              <Helmet>
                <style>{'body {background-color: #afafaf;}'}</style>
              </Helmet>
                <div>
                <Workbook filename="example.xlsx" element={<button className="btn btn-lg btn-primary" style={{"background-color": "#13bf28", "border-color": "#9E9E9E"}}>Export Reports Excel</button>}>
                        <Workbook.Sheet data={redirect.CIFSCDOTData} name="Sheet A">
                                {populateColumnNamesExcelWorkbook(redirect.CIFS7ModeData)}
                        </Workbook.Sheet>
                        <Workbook.Sheet data={redirect.CIFSCDOTData} name="Another sheet">
                              {populateColumnNamesExcelWorkbook(redirect.CIFS7ModeData)}
                        </Workbook.Sheet>
                </Workbook>
                </div>
                <div style={{"padding": "20px"}}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="7Mode">
                          <Row>
                                    <Col sm={0.5}>
                                      <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                          <Nav.Link eventKey="CDOT">CDOT</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                          <Nav.Link eventKey="7Mode">7Mode</Nav.Link>
                                        </Nav.Item>

                                      </Nav>
                                    </Col>
                                    <Col sm={11}>
                                      <Tab.Content>
                                      <div className="subTabs" style={{padding: "20px"}}>
                                        <Tab.Pane eventKey="7Mode">
                                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                                  <Row>
                                                            <Col sm={0.5}>

                                                              <Nav variant="pills" className="flex-column">
                                                                <Nav.Item>
                                                                  <Nav.Link eventKey="first">CIFSData</Nav.Link>
                                                                </Nav.Item>
                                                                <Nav.Item>
                                                                  <Nav.Link eventKey="second">NFSData</Nav.Link>
                                                                </Nav.Item>

                                                              </Nav>
                                                            </Col>
                                                            <Col sm={11}>
                                                              <Tab.Content>
                                                                <Tab.Pane eventKey="first">
                                                                    <TableSheet data={redirect.CIFS7ModeData}/>
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="second">
                                                                      <h1>Will be populated as we go</h1>
                                                                </Tab.Pane>
                                                              </Tab.Content>
                                                            </Col>
                                                  </Row>
                                        </Tab.Container>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="CDOT">
                                            <h1>No CDOT Data to Display</h1>
                                        </Tab.Pane>
                                        </div>
                                      </Tab.Content>
                                    </Col>
                          </Row>
                </Tab.Container>
              </div>
              </div>
        );
          }
          else if(redirect.CDOT){
              return(
                <div>
                <Helmet>
                  <style>{'body {background-color: #afafaf;}'}</style>
                </Helmet>
                  <div>
                  <Workbook filename="example.xlsx" element={<button className="btn btn-lg btn-primary" style={{"background-color": "#13bf28", "border-color": "#9E9E9E"}}>Export Reports Excel</button>}>
                          <Workbook.Sheet data={redirect.CIFSCDOTData} name="Sheet A">
                                  {populateColumnNamesExcelWorkbook(redirect.CIFSCDOTData)}
                          </Workbook.Sheet>
                          <Workbook.Sheet data={redirect.CIFSCDOTData} name="Another sheet">
                                {populateColumnNamesExcelWorkbook(redirect.CIFSCDOTData)}
                          </Workbook.Sheet>
                  </Workbook>
                  </div>
                  <div style={{"padding": "20px"}}>
                  <Tab.Container id="left-tabs-example" defaultActiveKey="CDOT">
                            <Row>
                                      <Col sm={0.5}>
                                        <Nav variant="pills" className="flex-column">
                                          <Nav.Item>
                                            <Nav.Link eventKey="CDOT">CDOT</Nav.Link>
                                          </Nav.Item>
                                          <Nav.Item>
                                            <Nav.Link eventKey="7Mode">7Mode</Nav.Link>
                                          </Nav.Item>

                                        </Nav>
                                      </Col>
                                      <Col sm={11}>
                                        <Tab.Content>
                                        <div className="subTabs" style={{padding: "20px"}}>
                                          <Tab.Pane eventKey="CDOT">
                                          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                                    <Row>
                                                              <Col sm={0.5}>

                                                                <Nav variant="pills" className="flex-column">
                                                                  <Nav.Item>
                                                                    <Nav.Link eventKey="first">CIFSData</Nav.Link>
                                                                  </Nav.Item>
                                                                  <Nav.Item>
                                                                    <Nav.Link eventKey="second">NFSData</Nav.Link>
                                                                  </Nav.Item>

                                                                </Nav>
                                                              </Col>
                                                              <Col sm={11}>
                                                                <Tab.Content>
                                                                  <Tab.Pane eventKey="first">
                                                                       <TableSheet data={redirect.CIFSCDOTData}/>
                                                                  </Tab.Pane>
                                                                  <Tab.Pane eventKey="second">
                                                                    <h1>No 7Mode Data to Display </h1>
                                                                  </Tab.Pane>
                                                                </Tab.Content>
                                                              </Col>
                                                    </Row>
                                          </Tab.Container>
                                          </Tab.Pane>
                                          <Tab.Pane eventKey="7Mode">
                                              <h1>No 7Mode Data to Display </h1>
                                          </Tab.Pane>
                                          </div>
                                        </Tab.Content>
                                      </Col>
                            </Row>
                  </Tab.Container>
                </div>
                </div>
          );
            }
            else{
              return(<h3>Oop please refresh the page</h3>)
            }
        }
      catch(e){
        console.log("We are experiencing an issue with loading the data people so we redirected you back to the home page")
        return(

              <Redirect to={{
                       pathname: '/'
              }}/>

         )
      }
  }
}



export default NasWorkbook;
