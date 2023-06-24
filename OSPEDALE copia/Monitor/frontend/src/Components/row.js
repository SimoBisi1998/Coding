import React, { Component } from "react";
import { Link } from "react-router-dom";

class Row extends Component {

    state = {
        dolore : 0,
        frequenzaCardiaca : 0,
        frequenzaRespiratoria : 0,
        pressioneArteriosa : 0,
        saturazioneOssigeno : 0,
        statoDiCoscienza : 0
    }

    render(){
        return(
            <>
            <tr>
                <Link to={`/reparto/${this.props.id_paziente}/readstatus`}>
                    <td><button>{this.props.id_paziente}</button></td>
                </Link>
                <td>{this.props.nome}</td>
                <td>{this.props.cognome}</td>
            </tr>
            </>
        )
    }
}

export default Row;