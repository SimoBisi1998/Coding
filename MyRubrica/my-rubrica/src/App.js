import React, { Component } from "react";
import Navbar from "./components/nav";
import Rubrica from "./components/rubrica";
import Form from "./components/form";
import ModifyForm from "./components/modifyForm";
import {BrowserRouter,Routes,Switch,Route, Link, Navigate} from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";

class App extends Component {

  componentDidMount = () => {
    let token = document.cookie;
    let string = token.split('=');
    if(string[1]=="undefined" || token=="") {
      this.setState({isLoggedIn : false})
    }else {
      this.setState({isLoggedIn : true})
    }
  }

  state = {
    contacts : [
    ],
    isLoggedIn : false,
    userId : ''
  }

  showRubrica = contatti => {
    this.setState({contacts : contatti});
  }

  handleDelete = contactId => {
    let updatedContacts = this.state.contacts.filter((obj) => obj.id != contactId)
    this.setState({contacts : updatedContacts})
  }

  handleAuthentication = (result) => {
    if(result==true){
      this.setState({isLoggedIn : true});
      window.location.href = "/home";
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar isLoggedIn={this.state.isLoggedIn}/>
        <div className='container'>
          <Routes>
            {this.state.isLoggedIn ? (
              <>
                <Route exact path="/home" element={<Rubrica/>}/>
                <Route exact path="/add" element={<Form showContacts={this.showRubrica} userId={this.state.userId} />}/>
                <Route exact path="/user/modify/:id" element={<ModifyForm id={this.handleModify}/>}/>
              </>
            ) : (
              <>
                <Route exact path="/" element={<Signup/>}/>
                <Route exact path="/login" element={<Login auth={this.handleAuthentication} identifyUser={this.handleIdentify} />}/>
                <Route exact path="/home" element={<p style={{display : 'flex', justifyContent : 'center',fontSize:'100px'}}>Page Not Found</p>}/>
                <Route exact path="/add" element={<p style={{display : 'flex', justifyContent : 'center',fontSize:'100px'}}>Page Not Found</p>}/>
                <Route exact path="/user/modify/:id" element={<p style={{display : 'flex', justifyContent : 'center',fontSize:'100px'}}>Page Not Found</p>}/>
              </>
            )}   
            <Route path="*" element={<p style={{display : 'flex', justifyContent : 'center',fontSize:'100px'}}>Page Not Found</p>}/>         
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
