"use strict";

class Document {

    constructor(titolo,descrizione,data,costo,src,project,id_user) {
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.data = data;
        this.costo = costo || '0';
        this.src = src;
        this.project = project;
        this.id_user = id_user;
    }
}

export default Document;