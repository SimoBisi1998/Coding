"use strict";

class Document {

    constructor(titolo,descrizione,data,costo,project) {
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.data = data;
        this.costo = costo || '0';
        this.project = project;
    }
}

export default Document;