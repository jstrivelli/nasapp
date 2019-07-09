import React, { Component } from 'react';
import Form7Mode from './Form7Mode';
import FormCDOT from './FormCDOT'
import {Input} from 'semantic-ui-react';
import axios from 'axios';
import {
  Container, Col, Form,
  FormGroup,
} from 'reactstrap';

class FilerPick extends Component{
  constructor(props){
    super(props);
    this.state = {filer: '', redirect: "Filer", message: "Filer"};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({filer: event.target.value})
  }

  handleSubmit(event){
    alert('A name was submitted: ' + this.state.filer);
    event.preventDefault();
    const data = {filer: this.state.filer}
    axios.post(`http://localhost:5000/queryFilerType`, data)
      .then(res => {
        var response = res.data.data
        if(response !== "undefined"){
          this.setState({redirect: response.filerType})
        }
    })
  }

  render(){
          if(this.state.redirect === "7Mode"){
            return(<Form7Mode filer={this.state.filer}/>)
          }
          else if(this.state.redirect === "CDOT"){
            return(<FormCDOT filer={this.state.filer}/>)
          }
          else{
                  return(
                          <div>
                                <Container className="App">
                                      <h2>{this.state.redirect}</h2>
                                      <Form className="form" onSubmit={this.handleSubmit}>
                                        <Col>
                                          <FormGroup>
                                              <Input
                                              action={{color: 'blue', content: 'Browse'}}
                                              icon='search'
                                              iconPosition='left'
                                              placeholder='Filer'
                                              value = {this.state.value}
                                              onChange={this.handleChange}
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Form>
                                    </Container>
                        </div>
                )

            }
  }
}

export default FilerPick;
