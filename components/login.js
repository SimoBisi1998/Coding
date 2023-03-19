import React, { Component } from "react";
import { Link } from "react-router-dom";


class Login extends Component {
    
    componentDidMount = () => {
        document.cookie = `token=undefined`;
    }


    handleSubmitLogin = async(event) => {
        event.preventDefault();
        let form = document.forms['login-form'];
        let username = form.email.value;
        let password = form.password.value;
        let token="";
        let result = false;
        if(document.cookie!=="undefined") {
            token = document.cookie;
        } 
        this.setState({username : username,password : password})
        let res = await fetch('http://localhost:5000/login',{
            method : 'POST',
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({username,password})
        })
        if(res.ok){
            result = true;
            let newToken = await res.json();
            document.cookie = `token=${newToken['token']}`;
            localStorage.setItem('userId',newToken['userId']);
            this.props.auth(result);
        }else {
            this.props.auth(result);
        }
    }


    render() {
        return(
            <>
            <h1 style={{display : 'flex',justifyContent : 'center'}}>Login</h1>
            <br></br>
            <form name="login-form" onSubmit={this.handleSubmitLogin} >
                <div className="mb-3">
                    <h3><label for="exampleInputEmail1" className="form-label">Email</label></h3>
                    <input type="text" name="email" className="form-control" required/>
                </div>
                <div className="mb-3">
                    <h3><label for="exampleInputPassword1" className="form-label">Password</label></h3>
                    <input type="password" name="password" className="form-control" required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            </>
        );
    }
}

export default Login;