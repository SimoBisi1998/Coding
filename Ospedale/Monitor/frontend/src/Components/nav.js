import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class Nav extends Component {
    render() {
        return(
            <nav className="navbar bg-dark">
                <a style={{fontSize : '30px',color : "white"}} class="navbar-brand">HomePage</a>
            </nav>
        );
    }
}

export default Nav;