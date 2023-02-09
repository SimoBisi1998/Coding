"use strict";

import Api from "./api.js";
import { createEmptyApp } from "./templates/app-template.js";
import { createProjectHTML, createDocHTML } from './templates/project-template.js';


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
        const value = searchForm.elements['form-value'].value;
        const search_value = searchForm.elements['second-form-value'].value;
        let documents = "";
        let projects = "";
        let result_project = "";
        let result_doc = "";

        //GET documenti dal db
        let docs = await Api.getDocuments();

        if(myhome == true){
            //GET progetti seguiti e documenti seguiti se la chiamata arriva dalla home
            projects = await Api.getFollowProject(user);
            documents = await Api.getFollowDoc();
        }else {
            //Altrimenti get dei progetti e documenti generali
            projects = await Api.getProjects();
            documents = await Api.getDocuments();
        }
        //Se le due box sono vuote e le due checkbox non sono spuntate,allora riempio la page con i progetti
        if(value=="" && search_value=="" && !progetto && !documento) {
            appContainer.innerHTML = '';
            for(let proj of projects){
                appContainer.insertAdjacentHTML('beforeend', createProjectHTML(proj.titolo, proj.descrizione, proj.autore, proj.categoria,proj.id,proj.immagine));
            }
            return;
        }
        //Se nessuna delle due checkbox è spuntata
        if (!progetto && !documento) {
            appContainer.innerHTML = '';
            //Controllo quale delle due input box ha un valore, se una o l'altra ritorno o i progetti o i documenti in base al filtro (primo box categoria e quindi progetti,
            //secondo box invece per titoli di progetti/documenti)
            if(value!="" && search_value!=""){
                result_project = projects.filter((project) => (project.titolo === search_value || project.descrizione === search_value) && project.categoria === value);    
                this.showProjectElement(result_project,appContainer);
                if(result_project == null) {
                    appContainer.innerHTML = createEmptyApp();
                }
            }if(value!="" && search_value==""){
                result_project = projects.filter((project) => project.categoria === value);    
                this.showProjectElement(result_project,appContainer)
            }else if(value=="" && search_value!=""){
                result_project = projects.filter((project) => project.titolo === search_value || project.descrizione === search_value);
                this.showProjectElement(result_project,appContainer);
                if(documents!="") {
                    result_doc = documents.filter((doc) => doc.titolo === search_value || doc.descrizione === search_value);
                    this.showDocumentElement(result_doc,appContainer);
                }
            }
            //Altrimenti nel caso in cui fosse spuntato una sola tra le due checkbox
        }else {
            switch (true) {
                //Se progetto is true,allora mostro i progetti e controllo se ci sono valori nelle input box
                case progetto: {
                    if(search_value == "" && value == "") {
                        appContainer.innerHTML = '';
                        for(let proj of projects) {
                            appContainer.insertAdjacentHTML('beforeend', createProjectHTML(proj.titolo, proj.descrizione, proj.autore, proj.categoria,proj.id,proj.immagine)); 
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
                    this.showProjectElement(result_project,appContainer);
                    break;
                }
                //Se invece documento è check, controllo se ci sono valori nelle input box
                case documento: {
                    if(search_value == "" && value == "") {
                        appContainer.innerHTML = '';
                        for(let doc of documents) {
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
    static showProjectElement(result_project,appContainer) {
        result_project.forEach((proj) => {
            appContainer.insertAdjacentHTML('beforeend', createProjectHTML(proj.titolo, proj.descrizione, proj.autore, proj.categoria,proj.id,proj.immagine));

        })
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