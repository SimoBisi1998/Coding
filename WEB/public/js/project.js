"use strict";

import Api from "./api.js";

class Project {
    constructor(id_user,titolo,descrizione,autore,categoria) {
        this.id_user = id_user;
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.autore = autore;
        this.categoria = categoria;
    }

    static selectFilter = async(event,user) => {
        event.preventDefault();
        const searchForm = document.getElementById('search-form');
        const value = searchForm.elements['form-value'].value;

        if(user === undefined) {
            let projects = await Api.getProjects();
            const values = projects.filter((project) => project.categoria === value);      
            return values;
        }else {
            let projects = await Api.getFollowProject(user);
            const result = projects.filter((project) => project.categoria === value);      
            return result;   
        }
    }
}

export default Project;