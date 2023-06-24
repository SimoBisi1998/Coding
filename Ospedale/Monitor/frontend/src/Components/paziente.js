import React, { Component } from "react";

class Paziente extends Component{

    handleCreation = async(event) => {
        event.preventDefault();
        let nome = document.getElementById("nome").value;
        let cognome = document.getElementById("cognome").value;
        let telefono = document.getElementById("numerotelefono").value;
        let reparto = localStorage.getItem("reparto");

        if(nome==="" || cognome=="" || telefono=="" || reparto==""){
            alert("FIELD OR FIELDS AR NOT VALID");
        }

        await fetch('http://79.50.75.82:5000/newpaziente',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({nome,cognome,telefono,reparto})
        })
    }


    render(){
        return(
            <>
            <div style={{display : "flex",justifyContent : "center",alignItems : "center",flexDirection : "column"}}>
                <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                    <label class="form-label"><b>Nome</b></label>
                    <input style = {{height : "70px"}} class="form-control" id="nome" aria-describedby="emailHelp"/>
                </div>
                <br></br><br></br>
                <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                    <label class="form-label"><b>Cognome</b></label>
                    <input style = {{height : "70px"}} class="form-control" id="cognome"/>
                </div>
                <br></br><br></br>
                <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                    <label class="form-label"><b>Numero di telefono</b></label>
                    <input style = {{height : "70px"}} class="form-control" id="numerotelefono"/>
                </div>
                <br></br><br></br>
                <button style={{width : "200px",fontSize:"30px"}} type="submit" class="btn btn-success" 
                onClick={(event) => {this.handleCreation(event)}}>Crea</button>
            </div>                
            </>
            
        );
    }
}

export default Paziente;