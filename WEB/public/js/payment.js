"use strict";

class payment {
    static counter = 0;

    constructor(nome,cognome,tipo,numero,CCV,importo) {
        this.nome = nome;
        this.cognome = cognome;
        this.tipo = tipo;
        this.numero = numero;
        this.CCV = CCV;
        this.importo = importo; 
    }
}

export default payment;