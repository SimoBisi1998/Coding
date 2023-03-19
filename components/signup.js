import React, { Component } from "react";
import { Link} from "react-router-dom";
import Rubrica from "./rubrica";

class Signup extends Component {

    state = {
        username : '',
        password : ''
    }

    handleSubmitSignUp = async(event) => {
        event.preventDefault();
        let form = document.forms['signup-form'];
        let username = form.email.value;
        let password = form.password.value;
        this.setState({username : username,password : password})

        //POST dei dati del form, richiedendo al server il token per autenticare successivamente l'utente
        let res = await fetch('http://localhost:5000/signup',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({username,password})
        })
        let token = await res.json();
        document.cookie = `token=${token}`;
        window.location.href = "/login";
    }
    
    render() {
        return(
            <>
            <br></br><br></br><br></br>
            <h1 style={{display : 'flex',justifyContent : 'center',fontSize:'50px',fontFamily:'Arial'}}><b>REGISTRATI</b></h1>
            <br></br><br></br><br></br>
            <form name="signup-form" onSubmit={this.handleSubmitSignUp}>
                <div class="form-outline mb-4">
                    <h3><label class="form-label" for="form2Example1">Email</label></h3>
                    <input type="email" id="form2Example1" name="email" class="form-control" />
                </div>

                <div class="form-outline mb-4">
                    <h3><label class="form-label" for="form2Example2">Password</label></h3>
                    <input type="password" id="form2Example2" name="password" class="form-control" />
                </div>

                <button type="submit" class="btn btn-primary btn-block mb-4">Registrati</button>
                <Link to="/login">
                        <button style={{marginLeft : '10px',width : '95px'}} type="submit" class="btn btn-primary btn-block mb-4" >Login</button>
                </Link>
            </form>
            </>
        );
    }
}

export default Signup;