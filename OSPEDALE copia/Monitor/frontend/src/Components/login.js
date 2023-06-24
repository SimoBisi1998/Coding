import React, { Component } from "react";

class Login extends Component {

    state = {
        verify : false
    }

    handleSubmitLogin = async(event) => {
        event.preventDefault();
        let form = document.forms['login-form'];
        //get value from form
        let username = form.email.value;
        let password = form.password.value;
        this.sendCredentials(username,password);
    }

    sendCredentials = async(username,password) => {
        let result = await fetch('http://79.50.75.82:5000/login', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({username,password})
        })
        if(result.ok){
            let packet = await result.json();
            //set cookie,username and the number of the reparto
            document.cookie = `token=${packet['token']}`;
            localStorage.setItem("username",packet["username"]);
            localStorage.setItem("reparto",packet["reparto"])
            this.setState({verify : true});
            this.props.auth(true);
            this.props.setReparto(localStorage.getItem("reparto"));
        }

        
    }


    render() {
        return(
            <>
            <form name="login-form" style={{display : "flex",justifyContent : "center",
             alignItems : "center",flexDirection : "column",
             position : "absolute", top : "30%", left : "45%"}} onSubmit={this.handleSubmitLogin}>
                <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"><b>Email address</b></label>
                    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <br></br><br></br>
                <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"><b>Password</b></label>
                    <input type="password" name="password" class="form-control" id="exampleInputPassword1"/>
                </div>
                <br></br>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
            </>
        );
    }
}

export default Login;