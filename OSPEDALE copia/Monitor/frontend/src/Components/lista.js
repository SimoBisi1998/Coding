import React, { Component } from "react";
import Row from "./row";
class Lista extends Component {

    state = {
        patients : []
    }


    componentDidMount = async() => {
        let res = await fetch("http://79.50.75.82:5000/getpatient",{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
        }
        });
        if(res.ok) {
            let response = await res.json();
            let array = this.state.patients;
            for(let i=0;i<response.length;i++){
                array.push(response[i]);
            }
            this.setState({patients : array});
        }
    }


    render() {
        return(
            <>
            <table className="table table-striped-columns">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.patients.map(patient => 
                        <Row
                            id_paziente = {patient.id_paziente}
                            nome = {patient.nome}
                            cognome = {patient.cognome}
                        />
                    )}
                </tbody>
            </table>
            </>
        ) 
    }
}

export default Lista;