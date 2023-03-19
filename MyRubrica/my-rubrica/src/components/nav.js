import React, { Component } from "react";

class Navbar extends Component {

    state = {
        bool : false
    }

    handleLogout = () => {
        window.location.href = "/login";
    }

    render() {
        return (
            <nav class="navbar navbar-dark bg-dark">
                <a style={{fontSize : '30px'}} class="navbar-brand">Rubrica</a>

                {this.props.isLoggedIn && <button type="button" style={{width : '250px',fontSize : '20px'}} class="btn btn-light" onClick={() => this.handleLogout()}>
                Logout</button>}
            </nav>
        )
    }
}

export default Navbar;