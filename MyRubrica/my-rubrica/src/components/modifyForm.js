import React, { Component } from "react";
import Contatto from "../Object/Contatto";

class ModifyForm extends Component{

    state = {
        contacts : {

        }
    }

    componentDidMount = () => {
        
    }

    onModify = async(event) => {
        event.preventDefault();
        let form = document.forms['my-form'];
        let nome = form.nome.value;
        let cognome = form.cognome.value;
        let numero = form.numero.value;
        let contatto = new Contatto(nome,cognome,numero);

        let string = document.cookie.split('=');
        let token = string[1];
        let userId = localStorage.getItem('userId');

        let obj = window.location.href.split('/');
        let loggedUserId = obj[5];
        await fetch(`http://localhost:5000/modify/${userId}`, {
            method : 'PUT',
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({contatto,loggedUserId})
        })

        window.history.back();
    }


    render () {
        return(
            <>
            <form name="my-form" onSubmit={this.onModify} >
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Nome</label>
                    <input type="text" name="nome" className="form-control" required/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Cognome</label>
                    <input type="text" name="cognome" className="form-control" required/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Numero</label>
                    <input type="number" name="numero" className="form-control" required/>
                </div>
                <button type="submit" className="btn btn-primary">Inserisci</button>
            </form>
            </>
        );
    }
}

export default ModifyForm;