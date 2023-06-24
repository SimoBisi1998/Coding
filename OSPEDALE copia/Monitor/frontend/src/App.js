import React, { Component } from "react";
import Nav from "./Components/nav";
import {BrowserRouter,Routes,Switch,Route, Link, Navigate} from "react-router-dom";
import Login from "./Components/login";
import Status from "./Components/status";
import Scelta from "./Components/scelta";
import Paziente from "./Components/paziente";
import Error from "./Components/error";
import Lista from "./Components/lista";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class App extends Component {

  componentDidMount = async() => {
    let res = await fetch("http://79.50.75.82:5000/getpatient",{
      method : 'GET',
      headers : {
          'Content-Type' : 'application/json'
      }
    });
    let response = await res.json();
    let array = this.state.patients;
    for(let i=0;i<response.length;i++){
        array.push(response[i]);
    }
    this.setState({patients : array});
  }

  state = {
    id : 0,
    authentication : false,
    reparto : 0,
    patients : []
  }

  handleAuthentication = (response) => {
    if(response){
      this.setState({authentication : true});
      localStorage.setItem("authentication",true)
      window.location.href = "/home";
      
    }
  }

  handleReparto = (number) => {
    this.setState({reparto : number});
  }

//<Status idPaziente={this.state.id}
  render() {
    return (
      <BrowserRouter>
        <Nav></Nav>
        <div class="login">
          <Routes>
            {localStorage.getItem("authentication") ? (
            <>
              <Route exact path="/login" element={<Login auth={this.handleAuthentication} setReparto={this.handleReparto}/>} ></Route>
              <Route exact path="/reparto/5/readstatus" element={<Status/>}/>
              <Route exact path="/reparto/:id/readstatus" element={<Status/>}/>
              {
                this.state.patients.map((patient) => {
                  <Route exact path={`reparto/${patient.id_paziente}/readstatus`} element={
                    <Status
                      id = {patient.id_paziente}
                      nome = {patient.nome}
                      cognome = {patient.cognome}
                      telefono = {patient.telefono}
                    />
                  }></Route>
                })
              }
              <Route exact path="/reparto/creapaziente" element={<Paziente />}></Route>
              <Route exact path="reparto/listapazienti" element={<Lista/>}></Route>
              <Route exact path="/home" element={<Scelta id={this.handleId} numberOfReparto={this.handleReparto} reparto={this.state.reparto}/>}></Route>
            </>
            ):(
            <>
              <Route exact path="*" element={<Error/>}></Route>
            </>
            )};
            <Route exact path="/login" element={<Login auth={this.handleAuthentication} setReparto={this.handleReparto}/>} ></Route>
            
          </Routes>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
