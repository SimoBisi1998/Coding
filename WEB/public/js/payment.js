"use strict";

class payment {
    static counter = 0;

    constructor(nome,cognome,tipo,numero,CCV,userID) {
        this.nome = nome;
        this.cognome = cognome;
        this.tipo = tipo;
        this.numero = numero;
        this.CCV = CCV;
        this.userID = userID;
    }
}

export default payment;