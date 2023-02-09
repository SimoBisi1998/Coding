"use strict";

class Api {

    static doLogin = async(username,password) => {
        let response = await fetch('/api/sessions', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({username,password})
        })
        if(response.ok){
            const user = await response.json();
            return user;
        }else {
            throw user;
        }
    }
    
    static doRegister = async (email, password,nome,cognome,ruolo) => {
        const correct  = await this.verifyRegister(email);
        if(!correct.ok){
            let response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,password,nome,cognome,ruolo})
            });
            if(response.ok) {
                return email;
            }
            else {
                try {
                    const errDetail = await response.json();
                    throw errDetail.message;
                }
                catch(err) {
                    throw err;
                }
            }
        }
    }

    static verifyRegister = async(email) => {
        let response = await fetch('/users');
        if(response.ok){
            const users = await response.json();
            for(const user of users) {
                if(user.email === email) {
                    //alert("UTENTE GIA' REGISTRATO!");
                    return user.id;
                }
            }
            return users;
        }
        else {
            const users = await response.json();
            throw users;
        }
        
    }

    static getInfo = async(email) => {
        let response = await fetch('/users/info');
        if(response.ok){
            let user = await response.json();
            for(let utente of user){
                if(utente.email === email){
                    user = {
                        email : utente.email,
                        nome : utente.nome,
                        cognome : utente.cognome,
                        ruolo : utente.ruolo
                    }
                    return user;
                }
            }
            return user;
        }else {
            let user = await response.json();
            throw user;
        }
    }

    static createProject = async(project) => {
        let response = await fetch('/api/projects',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({project})
            });

            if(response.ok){
                return;
            }
            else{
                let proj = await response.json();
                throw proj;
            }
    }

    static verifyUser = async(user) => {
        let response = await fetch('/users');
        if(response.ok){
            let users = await response.json();
            for(let us of users){
                if(us.email === user && us.ruolo === 'creatore'){
                    return us.email;
                }
            }
        return users;
        }else {
            let users = await response.json();
            throw users;
        }
    }

    static getProjects = async() => {
        let response = await fetch('/projects');
        if(response.ok){
            let projects = await response.json();
            return projects;
        }else {
            let projects = await response.json();
            throw(projects);
        }

    }

    static selectProject = async() => {
        let response = await fetch('/api/project/:id');
        if(response.ok){
            let project = await response.json();
            return project;
        }else {
            let project = await response.json();
            throw project;
        }
    }

    static doLogout = async() => {

        await fetch('/api/sessions/current',{
            method : 'DELETE'
        });
    }

    static postFollowProject = async(idProject,username) => {
        let response = await fetch('/follow',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({idProject,username})
        });

        if(response.ok) {
            return;
        }else {
            let result = await response.json();
            throw result;
        }
    }

    static removeThisProject = async(idProject) => {
        await fetch('/project/follow/:id',{
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({idProject})
        });
    }


    //recupero i progetti seguiti dallo user passato come parametro
    static getFollowProject = async(user) => {
        let response = await fetch('/api/project/follow');
        if(response.ok){
            let arrayProject = [];
            let result = await response.json(); //lista di progetti seguiti
            let projects = await this.getProjects(); //lista totale dei progetti
            for(let index of result) {
                if(index.user_email === user){ //controllo che gli id dei vari progetti corrispondano a quelli seguiti dallo user passato come parametro
                    for(let project of projects){
                        if(index.id_progetto === project.id) { //se trovo lo stesso id del progetto che corrisponde alla lsita dei progetti ottenuti tramite la get, alloco un array di oggetti Project da restituire 
                            const proj = {
                                titolo : project.titolo,
                                descrizione : project.descrizione,
                                autore : project.autore,
                                categoria : project.categoria,
                                id : project.id,
                                image : project.immagine
                            }
                            arrayProject.push(proj);
                        }
                    }
                }
            }
        return arrayProject;
        }else {
            let result = await response.json();
            throw result;
        }
    }

    static modifyProject = async(project,idProject) => {
        let response = await fetch('/api/project/modify',{
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({project,idProject})
        });
        if(response.ok){
            return;
        }else {
            let result = await response.json();
            throw result;
        }
    }

    static deleteProject = async(idProject) => {
        await fetch('/api/project/delete',{
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({idProject})
        });
    }

    static projectDonation = async(user,idProject,nome,cognome,tipo,numero,CCV,importo) => {
        let response = await fetch('/api/project/donation',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({user,idProject,nome,cognome,tipo,numero,CCV,importo})
        });
        if(response.ok) {
            let confirm = await response.json();
            return confirm;
        }else {
            let confirm = await response.json();
            throw confirm;
        }
    }

    static getDonations = async() => {
        let response = await fetch('/api/project/donations');
        if(response.ok) {
            let result = await response.json();
            return result;
        }
        else {
            let result = await response.json();
            throw result;
        }
    }

    static postComment = async(commento) => {
        let response = await fetch('/api/document/comment', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({commento})
        });
        if(response.ok) {
            let res = await response.json();
            return res;
        }else {
            let res = await response.json();
            throw res;
        }
    }

    static getComments = async() => {
        let response = await fetch('/api/document/comment');
        if(response.ok){
            let result = await response.json();
            return result;
        }else {
            let result = await response.json();
            throw result;
        }
    }

    static deleteComment = async(id_commento,user) => {
        let response = await fetch('/api/comment/delete/:id_commento',{
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({id_commento,user})
        });
        if(response.ok) {
            let res = await response.json();
            return res;
        }else {
            let res = await response.json();
            throw res;
        }
    }

    static getDocuments = async() => {
        let res = await fetch('/api/project/documents');
        if(res.ok) {
            let response = await res.json();
            return response;
        }
        else {
            let response = await res.json();
            throw response;
        }
    }

    static postDocument = async(doc) => {
        let response = await fetch('/api/documents',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({doc})
        });
        if(response.ok) {
            let res = await response.json();
            return res;
        }
        else {
            let res = await response.json();
            throw res;
        }
    }

    static buyDocument = async(idDocument,payment) => {
        let response = await fetch('/api/document/buy/:id_documento', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({idDocument,payment})
        });
        if(response.ok) {
            return;
        }else {
            let res = await response.json();
            throw res;
        }
    }

    static getPayment = async() => {
        let response = await fetch('/api/document/buy')
        if(response.ok){
            let res = await response.json();
            return res;
        }else {
            let res = await response.json();
            return res;
        }
    }

    static deleteDocumentByID = async(idDocument) => {
        let response = await fetch('/api/document/delete/:id_documento', {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({idDocument})
        });
        if(response.ok){
            let res = await response.json();
            return res;
        }
        else {
            response = await response.json();
            throw response;
        }
    }

    static followDoc = async(idDocument,username) => {
        let response = await fetch('/api/document/follow', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({idDocument,username})
        });
        if(response.ok){
            return;
        }else {
            let res = await response.json();
            throw res;
        }
    }

    static getFollowDoc = async() => {
        let response = await fetch('/document/follow');
        if(response.ok) {
            let res = await response.json();
            return res;
        }
        else {
            let res = await response.json();
            return res;
        }
    }

    static removeFollowDoc = async(idDocument) => {
        let response = await fetch('/document/remove/follow',{
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({idDocument})
        });
        if(response.ok){
            return;
        }
    }

    static updateComment = async(commento,id_commento) => {
        let response = await fetch('/api/document/comment/update', {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({commento,id_commento})
        });
        if(response.ok) {
            return;
        }
        else {
            let res = await response.json();
            throw res;
        }
    }

    static updateDocument = async(doc) => {
        let response = await fetch('/api/document/modify',{
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({doc})
        });
        if(response.ok){
            return;
        }else {
            let res = await response.json();
            throw res;
        }
    }
}
export default Api;
