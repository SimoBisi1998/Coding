import React, { Component } from "react";
import { Link } from "react-router-dom";

class Scelta extends Component{


    
    
    render(){
        return(
            <>
            <h1 style={{textAlign : "center",fontSize : "80px"}}>Reparto n°{localStorage.getItem("reparto")}</h1>
            <Link to={"/reparto/listapazienti"}>
                    <button type="button" class="btn btn-success">Lista Pazienti</button>
            </Link>
            <Link to={"/reparto/creapaziente"}>
                <button type="button" class="btn btn-success">Istanzia un nuovo paziente</button>
            </Link>
            </>
            
        );
    }

}

export default Scelta;