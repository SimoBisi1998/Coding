import React, { Component} from "react";
import Contatto from "../Object/Contatto";

class Form extends Component {
    
    state = {
        contacts : [

        ]
    }

    onAdd = async(event) => {
        event.preventDefault();
        let form = document.forms['my-form'];
        let nome = form.nome.value;
        let cognome = form.cognome.value;
        let numero = form.numero.value;
        let contatto = new Contatto(nome,cognome,numero);
        let string = document.cookie.split('=');
        let token = string[1];
        let userId = localStorage.getItem('userId');
        await fetch(`http://localhost:5000/contacts/${userId}`, {
            method : 'POST',
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({contatto})
        })
        window.history.back();
    }

    render() {
        return(
            <>
            <form name="my-form" onSubmit={this.onAdd} >
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
                <button type="submit" onClick={() => this.props.showContacts(this.state.contacts)} className="btn btn-primary">Inserisci</button>
            </form>
            </>
        );
    }
}

export default Form;