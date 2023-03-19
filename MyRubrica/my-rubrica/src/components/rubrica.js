import React, { Component } from "react";
import Row from "./row";
import {Link} from "react-router-dom";

class Rubrica extends Component {

    state = {
        contacts : []
    }

    componentDidMount = async() => {
        let string = document.cookie.split('=');
        let token = string[1];
        let userId = localStorage.getItem('userId'); 

        
        let response = await fetch(`http://localhost:5000/alluser/${userId}`,{
            headers : {
                'Authorization' : token
            }
        });
            if(response.ok){
                let res = await response.json();
                this.setState({contacts : res})
            }else {
                let res  = await response.json();
                throw res;
            }
    }

    handleSearchForm = async(event) => {
        event.preventDefault();
        let value = document.getElementById('search-form').value;

        //se value è vuoto allora ritorno l'elenco completo facendo la GET da didMount()
        if(value=="" || value==undefined){
            return this.componentDidMount();
        }

        //POST dove mando oltre alla stringa inserita nell'input anche l'id dell'utente che sta facendo 
        //la chiamata per distinguere i contatti utente per utente
        let res = await fetch(`http://localhost:5000/searchuser/${localStorage.getItem('userId')}`,{
            method : 'POST',
            headers : {
                'Authorization' : document.cookie.split('=')[1],
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({value})
        })
        if(res.ok) {
            let response = await res.json();
            //SE ok setto lo state contacts alla response proveniente dal server
            this.setState({contacts : response});
        }
    }

    render() {
        
        return(
            <div className="card text-center" style = {{marginTop : '200px'}}>
                <div className="card-header">
                <h1>RUBRICA</h1><br></br>
                <span>
                    <input type="search" name="search" id="search-form" class="form-control" />
                    <button type="button" class="btn btn-primary" onClick={(event) => this.handleSearchForm(event)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                    </span>
                </div>

                <div className="card-body">
                <table className="table table-striped-columns">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Telefono</th>
                            <th>Modifica</th>
                            <th>Cancella</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.contacts.map(obj => 
                            <Row 
                            id = {obj.id}
                            nome = {obj.nome}
                            cognome = {obj.cognome}
                            numero = {obj.numero}
                            />
                        )}
                    </tbody>
                </table>
                </div>
                <div className="card-footer text-muted" style={{marginTop : '300px'}}>
                    <table className="table table-striped-columns">
                    <thead>
                        <tr>
                            <Link to="/add">
                                <th><button className="btn btn-primary" style={{color : 'white',background : 'black'}}>Aggiungi</button></th>
                            </Link>
                        </tr>
                    </thead>
                    </table>
                </div>
            </div>
        );
    }
}
export default Rubrica;