"use strict";

import Api from "./api.js";
import { createEmptyApp } from "./templates/app-template.js";
import { createProjectHTML, createDocHTML,createDocHTMLTemplate,createFollowProjectTemplate } from './templates/project-template.js';


class Project {
    constructor(id_user, titolo, descrizione, autore, categoria,image) {
        this.id_user = id_user;
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.autore = autore;
        this.categoria = categoria;
        this.image = image;
    }

    /**Metodo per filtrare i progetti o documenti
     * 
     * @param {*} event 
     * @param {*} user 
     * @param {*} progetto 
     * @param {*} documento 
     * @param {*} appContainer 
     * @param {*} myhome 
     * @returns 
     */
    static selectFilter = async (event, user, progetto, documento, appContainer,myhome) => {
        event.preventDefault();
        const searchForm = document.getElementById('search-form');
        //Converto i valori inseriti in lowercase, così che la ricerca sia facilitata sia in caso di maiuscole che di minuscole
        const value = searchForm.elements['form-value'].value.toLowerCase();
        const search_value = searchForm.elements['second-form-value'].value.toLowerCase();
        let documents = "";
        let projects = "";
        let result_project = "";
        let result_doc = "";

        let userID = await Api.verifyRegister(user);
        //GET documenti dal db
        let docs = await Api.getDocuments();
        //SE la chiamata è stata effettuata dalla home di un utente,allora prendo i progetti e documenti seguiti
        if(myhome == true){
            //GET progetti seguiti e documenti seguiti se la chiamata arriva dalla home
            projects = await Api.getFollowProject(user);
            //Converto le stringhe dell'array di oggetti in lowercase
            projects.forEach(function(value){
                value.titolo = value.titolo.toLowerCase();
                value.categoria = value.categoria.toLowerCase();
                value.descrizione = value.descrizione.toLowerCase();
            })
            documents = await Api.getFollowDoc();
        }else {
            //Altrimenti get dei progetti e documenti generali
            projects = await Api.getProjects();
            projects.forEach(function(value){
                value.titolo = value.titolo.toLowerCase();
                value.categoria = value.categoria.toLowerCase();
                value.descrizione = value.descrizione.toLowerCase();
            })
            documents = await Api.getDocuments();
            documents.forEach(function(value){
                value.titolo = value.titolo.toLowerCase();
                value.descrizione = value.descrizione.toLowerCase();
            })
        }
        //Se le due box sono vuote e le due checkbox non sono spuntate,allora riempio la page con i progetti
        if(value=="" && search_value=="" && !progetto && !documento) {
            appContainer.innerHTML = '';
            let result = await Api.getProjectByLike();
            let totalDocuments = await Api.getDocuments();
            let arrayLike = [];
            for(let x of result){
                arrayLike.push(x);
            }
            let newArray = [];

            //Per ogni coppia{idProject,numberLikes} vado ad allocare l'array con le rispettive posizioni in cui inserisco il numero di likes, dove in ogni cella avrò il numero di like di quel progetto
            for(let x of arrayLike){
                newArray[x.idProject] = x.numberLikes;
            }

            for(let project of projects){
                //SE undefined, quindi vuol dire che non ci sono likes, allora metto 0
                if(newArray[project.id] == undefined) {
                    newArray[project.id] = 0;
                }
                if(myhome===true) {
                    project.immagine = project.image;
                }
                appContainer.insertAdjacentHTML('beforeend',createProjectHTML(project.titolo,project.descrizione,project.autore,project.categoria,project.id,project.immagine,newArray[project.id]));
            }
            this.showDocumentElement(documents,appContainer)
            return;
        }
        //Se nessuna delle due checkbox è spuntata
        if (!progetto && !documento) {
            appContainer.innerHTML = '';
            //Controllo quale delle due input box ha un valore, se una o l'altra ritorno o i progetti o i documenti in base al filtro (primo box categoria e quindi progetti,
            //secondo box invece per titoli di progetti/documenti)
            if(value!="" && search_value!=""){
                result_project = projects.filter((project) => (project.titolo === search_value || project.descrizione === search_value) && project.categoria === value);    
                if(result_project == null) {
                    appContainer.innerHTML = createEmptyApp();
                }
            }else if(value!="" && search_value==""){
                result_project = projects.filter((project) => project.categoria === value);    
            }else if(value=="" && search_value!=""){
                result_project = projects.filter((project) => project.titolo === search_value || project.descrizione === search_value);

                if(documents!="") {
                    result_doc = documents.filter((doc) => doc.titolo === search_value || doc.descrizione === search_value);
                    this.showDocumentElement(result_doc,appContainer);
                }
            }
            this.showProjectElement(result_project,appContainer,myhome)
            
            //Altrimenti nel caso in cui fosse spuntato una sola tra le due checkbox
        }else {
            switch (true) {
                //Se progetto is true,allora mostro i progetti e controllo se ci sono valori nelle input box
                case progetto: {
                    if(myhome===true && search_value=="" && value==""){
                        appContainer.innerHTML = '';
                        let result = await Api.getProjectByLike();
                        let arrayLike = [];
                        for(let x of result){
                            arrayLike.push(x);
                        }
                        let newArray = [];

                        //Per ogni coppia{idProject,numberLikes} vado ad allocare l'array con le rispettive posizioni in cui inserisco il numero di likes, dove in ogni cella avrò il numero di like di quel progetto
                        for(let x of arrayLike){
                            newArray[x.idProject] = x.numberLikes;
                        }

                        for(let project of projects){
                            //SE undefined, quindi vuol dire che non ci sono likes, allora metto 0
                            if(newArray[project.id] == undefined) {
                                newArray[project.id] = 0;
                            }
                            if(myhome===true){
                                project.immagine = project.image;
                            }
                            appContainer.insertAdjacentHTML('beforeend',createFollowProjectTemplate(project.titolo,project.descrizione,project.autore,project.categoria,project.id,project.immagine,newArray[project.id]));
                        }
                        return;
                    }
                    if(search_value == "" && value == "") {
                        const projects = await Api.getProjects();
                        let result = await Api.getProjectByLike();
                        let arrayLike = [];
                        for(let x of result){
                            arrayLike.push(x);
                        }
                        let newArray = [];

                        //Per ogni coppia{idProject,numberLikes} vado ad allocare l'array con le rispettive posizioni in cui inserisco il numero di likes, dove in ogni cella avrò il numero di like di quel progetto
                        for(let x of arrayLike){
                            newArray[x.idProject] = x.numberLikes;
                        }

                        appContainer.innerHTML = '';
                        for(let project of projects){
                            //SE undefined, quindi vuol dire che non ci sono likes, allora metto 0
                            if(newArray[project.id] == undefined) {
                                newArray[project.id] = 0;
                            }
                            if(myhome===true){
                                project.immagine = project.image;
                            }
                            appContainer.insertAdjacentHTML('beforeend',createProjectHTML(project.titolo,project.descrizione,project.autore,project.categoria,project.id,project.immagine,newArray[project.id]));
                        }
                        return;
                    }
                    appContainer.innerHTML = '';
                    if(value!="" && search_value==""){
                        result_project = projects.filter((project) => project.categoria === value);
                    }if(search_value!="" && value==""){
                        result_project = projects.filter((project) => project.titolo === search_value || project.descrizione === search_value);
                    }else if(value!="" && search_value!="") {
                        result_project = projects.filter((project) => project.categoria === value && (project.titolo === search_value || project.descrizione === search_value));
                    }
                    this.showProjectElement(result_project,appContainer,myhome);
                    break;
                }
                //Se invece documento è check, controllo se ci sono valori nelle input box
                case documento: {
                    appContainer.innerHTML = '';
                    let docs = await Api.getDocuments();
                    docs.forEach(function(value){
                        value.titolo = value.titolo.toLowerCase();
                        value.descrizione = value.descrizione.toLowerCase();
                    })
                    let i = 0;
                    if(myhome===true && search_value=="" && value==""){
                        for(let d of docs) {
                            for(let doc of documents){
                                if(doc.id_documento == d.id_documento && doc.user_email == user){
                                    appContainer.insertAdjacentHTML('beforeend', createDocHTMLTemplate(d.id_documento, d.titolo, d.descrizione, d.data));
                                }
                            }
                        }
                        return;
                    }
                    if(search_value == "" && value == "" && myhome===true) {
                        for(let d of docs) {
                            for(let doc of documents){
                                if(doc.id_documento == d.id_documento && doc.user_email == user){
                                    appContainer.insertAdjacentHTML('beforeend', createDocHTMLTemplate(d.id_documento, d.titolo, d.descrizione, d.data));
                                }
                                
                            }
                        }
                        return;
                    }else if(search_value == "" && value != "" && myhome===true){
                        appContainer.innerHTML = '';
                        projects = await Api.getProjects();
                        for(let p of projects){
                            if(p.categoria === value){
                                for(let d of docs) {
                                    for(let doc of documents){
                                        if(doc.id_documento == d.id_documento && p.id == d.id_progetto && doc.user_email == user){
                                            appContainer.insertAdjacentHTML('beforeend', createDocHTMLTemplate(d.id_documento, d.titolo, d.descrizione, d.data));
                                        }
                                        
                                    }
                                }
                            }
                        }
                        for(let doc of result_doc){
                            appContainer.insertAdjacentHTML('beforeend', createDocHTML(doc.id_documento, doc.titolo, doc.descrizione, doc.data));
                        }
                        return;
                    }else if(search_value != "" && value != "" && myhome===true) {
                        appContainer.innerHTML = '';
                        projects = await Api.getProjects();
                        for(let p of projects){
                            if(p.categoria === value){
                                for(let d of docs) {
                                    for(let doc of documents){
                                        if(doc.id_documento == d.id_documento && doc.user_email == user &&p.id == d.id_progetto && (d.titolo ==search_value || d.descrizione == search_value)){
                                            appContainer.insertAdjacentHTML('beforeend', createDocHTMLTemplate(d.id_documento, d.titolo, d.descrizione, d.data));
                                        }
                                        
                                    }
                                }
                            }
                        }
                        return;
                    }else if(search_value=="" && value!="") {
                        appContainer.innerHTML = '';
                        for(let p of projects){
                            if(p.categoria === value){
                                for(let doc of documents){
                                    if(p.id == doc.id_progetto){
                                        appContainer.insertAdjacentHTML('beforeend', createDocHTML(doc.id_documento, doc.titolo, doc.descrizione, doc.data));
                                    }      
                                }
                            }
                        }
                        return;
                    }
                    else if(search_value!="" && value!=""){
                        appContainer.innerHTML = '';
                        for(let p of projects){
                            if(p.categoria === value){
                                for(let doc of documents){
                                    if(p.id == doc.id_progetto && (doc.titolo ==search_value || doc.descrizione == search_value)){
                                        appContainer.insertAdjacentHTML('beforeend', createDocHTML(doc.id_documento, doc.titolo, doc.descrizione, doc.data));
                                    }     
                                }
                            }
                        }
                        return;
                    }
                    
                    else if(search_value!="" && value==""){      
                        appContainer.innerHTML = '';
                        result_doc = documents.filter((doc) => doc.titolo === search_value || doc.descrizione === search_value);
                        this.showDocumentElement(result_doc,appContainer);
                        return;
                    }else if(search_value == "" && value == ""){
                        appContainer.innerHTML = '';
                        for(let doc of documents){
                            appContainer.insertAdjacentHTML('beforeend', createDocHTML(doc.id_documento, doc.titolo, doc.descrizione, doc.data));
                        }
                        return;
                    }
                    appContainer.innerHTML = '';
                    let newDoc = [];
                    for(let d of documents) {
                        for(let doc of docs) {
                            if(d.id_documento == doc.id_documento) {
                                newDoc.push(doc);
                            }
                        }
                    }
                    result_doc = newDoc.filter((doc) => doc.titolo === search_value || doc.descrizione === search_value);
                    this.showDocumentElement(result_doc,appContainer);
                    break;
                }
            }
        }
    }

    /**Metodo che refresha la page con i progetti filtrati precedentemente
     * 
     * @param {*} result_project 
     * @param {*} appContainer 
     */
    static showProjectElement = async(result_project,appContainer,myhome) => {
        
        let result = await Api.getProjectByLike();
        let arrayLike = [];
        for(let x of result){
            arrayLike.push(x);
        }
        let newArray = [];

        //Per ogni coppia{idProject,numberLikes} vado ad allocare l'array con le rispettive posizioni in cui inserisco il numero di likes, dove in ogni cella avrò il numero di like di quel progetto
        for(let x of arrayLike){
            newArray[x.idProject] = x.numberLikes;
        }
        appContainer.innerHTML = '';
        for(let project of result_project){
            //SE undefined, quindi vuol dire che non ci sono likes, allora metto 0
            if(newArray[project.id] == undefined) {
                newArray[project.id] = 0;
            }
            if(myhome===true){
                project.immagine = project.image;
            }
            appContainer.insertAdjacentHTML('beforeend',createProjectHTML(project.titolo,project.descrizione,project.autore,project.categoria,project.id,project.immagine,newArray[project.id]));
        }
       
    }

    /**Metodo che refresha la pagina con i documenti filtrati precedentemente
     * 
     * @param {*} result_doc 
     * @param {*} appContainer 
     */
    static showDocumentElement(result_doc,appContainer) {
        result_doc.forEach((doc) => {
            appContainer.insertAdjacentHTML('beforeend', createDocHTML(doc.id_documento, doc.titolo, doc.descrizione, doc.data));
        })
    }
}

export default Project;