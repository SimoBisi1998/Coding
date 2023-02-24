"use strict";

import Api from './api.js';
import Project from './project.js';
import Document from './document.js';
import Payment from './payment.js';
import Comment from './comment.js';
import { createFormProject, createNewForm,createProjectHTML,projectPage,projectPageFinanziatore,createFollowProjectTemplate,addModifyButton,
createListOfDonator,createListOfComment,deleteCommentButton ,createExitForm, createCarrello, buyedDoc,createListOfDocumentsBought,
deleteDocumentButton, HTMLfollowDocument,followedDoc,documentPage, createListOfDocumentsPage,commentForm,commentFormNew,formDoc,createModForm, 
projectPageUndefined, imageFollowProject,starProject,likeProject,notLikeProject, addNewModButton,createDocHTMLTemplate, createLinkToDownload} from './templates/project-template.js';
import page from '//unpkg.com/page/page.mjs';
import {createRegisterForm,createLoginForm,createLogoutForm,createSideNav} from './templates/login-template.js';
import {createAlert} from './templates/alert-template.js';
import {showAccount} from './templates/account-template.js';
import {createEmptyApp,createDonationMethod, createPaymentDocument} from './templates/app-template.js';

//showOneProject vedere modifca/elimina quando logga un altro creatore diveso da quello che ha creato il progetto

class App {
    constructor(navContainer,appContainer,searchContainer,navLeft) {
        this.appContainer = appContainer;
        this.navContainer = navContainer;
        this.searchContainer = searchContainer;
        this.navLeft = navLeft;
        this.user;
        this.projects;
        this.copyApp = this.appContainer.innerHTML;
        this.copyNavbar = this.navContainer.innerHTML;
        this.copySearch = this.searchContainer.innerHTML;
        this.myhome = false;
        
        //copia dell'init per ripristinare correttamente gli oggetti della pagina iniziale

        page('/', async() => {
            this.homePageHandler();
        });

        page('/signup', async() => {
            this.appContainer.innerHTML = '';
            this.navContainer.innerHTML = '';
            this.onRegisterButtonSubmitted();
        });

        page('/login',() => {
            this.appContainer.innerHTML = this.showProject();
            this.navContainer.innerHTML = '';
            this.onLoginButtonSubmitted();
        });

        page('/home',() => {
            this.homeHandler();
        });

        page('/info',() => {
            this.infoHandler();
        });

        page('/project', () => {
            this.projectHandler();
        });

        page('/document/follow/:id_documento',async(req) => {
            await Api.removeFollowDoc(req.params.id_documento,this.user);
            history.back();
        })

        page('/project/:id',async(req) => {
            this.projectPageHandler(req);
        })

        page('/project/follow/:id',async(req) => {
            this.removeFollowProject(req.params.id,this.user);
        })

        page('/api/comment/delete/:id_commento',(req) => {
            this.removeComment(req.params.id_commento,this.user);
        })

        page('/api/document/buy/:id_documento',(req) => {
            this.appContainer.innerHTML = '';
            this.appContainer.innerHTML = createPaymentDocument();
            this.buyDocument(req.params.id_documento);
        })

        page('/api/document/delete/:id_documento',(req) => {
            this.deleteDocumentByID(req.params.id_documento);
        })

        page('/api/document/follow/:id_documento',(req) => {
            this.followDocument(req.params.id_documento,this.user);
        })

        page('/api/project/follow/:id_progetto',(req) => {
            this.followProject(req.params.id_progetto,this.user)
        })

        page('/api/document/:id_documento',(req) => {
            this.appContainer.innerHTML = '';
            this.showDocumentPage(req.params.id_documento);
        })

        page('/api/project/donation/:id_progetto',(req) => {
            this.appContainer.innerHTML = '';
            this.appContainer.innerHTML = createDonationMethod();
            this.projectDonation(req.params.id_progetto);
        })

        page('/api/comment/modify/:id_commento',(req)  => {
            this.modifyComment(req.params.id_commento);
        })

        page('/api/document/modify/:id_documento',(req) => {
            this.modifyDocument(req.params.id_documento);
        })

        page('/project/like/:id_progetto',(req) => {
            this.likeProject(req.params.id_progetto);
        })

        page();
    }


    likeProject = async(idProject) => {
        let alertMessage = document.getElementById('alert-message');

        //GET dei progetti con like
        let res = await Api.getLikesProject();
        try {
            //Per ogni progetto con il like,controllo se appartiene all'utente loggato
            for(let like of res) {
                //Se è presente tra i progetti con i like,allora il secondo click effettuato è per togliere il like dal progetto
                if(like.id_progetto == idProject && like.user_email === this.user) {
                    document.getElementById('likeProject').innerHTML = notLikeProject(idProject);
                    //Eseguo la delete del like del progetto
                    await Api.removeLikeProject(idProject,this.user);
                    alertMessage.innerHTML = createAlert('success','Like tolto correttamente!');
                    setTimeout(() => {
                        alertMessage.innerHTML = '';
                    },2000);
                    history.back();
                    return;
                }
            }
            //Altrimenti metto like al progetto
            await Api.likeProject(idProject,this.user);
            alertMessage.innerHTML = createAlert('success','Mi piace aggiunto correttamente!');
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },2000);
            //await this.showOneProject(localStorage.getItem('idProject'));
            history.back();
        }catch(err) {
            alertMessage.innerHTML = createAlert('danger','Hai già messo mi piace al progetto!');
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },3000);
            history.back();
            throw err;
            
        }
    }

    /**Handler per la route "page('/project/:id')" che visualizza la pagina con tutte le informazioni del progetto
     * 
     */
    projectPageHandler = async(req) => {
        const idProject = req.params.id;
        const role = await this.verifyUser(this.user);

        localStorage.setItem('idProject',idProject);
        localStorage.setItem('role',role);

        this.searchContainer.innerHTML = '';
        await this.showOneProject(idProject);
        if(role!=='undefined'){
            if(role===true){
                let check = await this.verifyUserByProjectID(this.user,idProject); 
                if(check === true) {
                    this.navContainer.innerHTML = addModifyButton();
                    document.getElementById('elimina-progetto').addEventListener('click',async() => {
                        this.deleteProject(idProject,this.user);
                    })
                    document.getElementById('modifica-progetto').addEventListener('click',async() => {
                        this.modifyProject(idProject);
                    })
                    document.getElementById('crea-documento').addEventListener('click',async(event) => {
                        this.createDoc(idProject);
                    });
                }else{
                    this.navContainer.innerHTML = addNewModButton();

                }
            }
                document.getElementById('my-account').addEventListener('click',() => {
                    page('/info');
                })
                document.getElementById('home').addEventListener('click',() => {
                    page('/home');
                });
                document.getElementById('defaultPage').addEventListener('click',this.onLogoutSubmitted);
                document.getElementById('logout').addEventListener('click',this.onLogoutSubmitted); 
        }

        
    }

    /**Handler della pagina progetti per la route "page('/project')" contenente la lista di tutti i progetti
     * 
     */
    projectHandler = async() => {
        this.searchContainer.innerHTML = this.copySearch;
        const role = await this.verifyUser(this.user);
        document.getElementById('search-form').addEventListener('submit',async(event) => {
            this.showFilteredProjects(event,this.myhome);
        });
        if(role === true) {
            this.navContainer.innerHTML = createFormProject();
            document.getElementById('project').addEventListener('click',() => {
                this.onCreateProjectSubmitted(this.user)
            });
            document.getElementById('logout').addEventListener('click',this.onLogoutSubmitted);
            document.getElementById('my-account').addEventListener('click',() => {
                page('/info');
            })
            document.getElementById('home').addEventListener('click',() => {
                this.appContainer.innerHTML = '';
                page('/home');
            })     
        }else if(role === false){
            this.navContainer.innerHTML = createNewForm();
            document.getElementById('logout').addEventListener('click',this.onLogoutSubmitted);
            document.getElementById('my-account').addEventListener('click',() => {
                page('/info');
            })
            document.getElementById('home').addEventListener('click',() => {
                this.appContainer.innerHTML = '';
                page('/home');
            })   
        }

        document.getElementById('defaultPage').addEventListener('click',this.onLogoutSubmitted);
        this.projects = this.showProject();

    }

    /**Handler per la route "page('/info')" per estrarre le informazioni dell'utente loggato
     * 
     */

    infoHandler = async() => {
        this.navContainer.innerHTML = createLogoutForm();
        this.myAccount(this.user);
        this.searchContainer.innerHTML = this.copySearch;
        document.getElementById('home').addEventListener('click',() => {
            page('/home');
        })    
        document.getElementById('logout').addEventListener('click',this.onLogoutSubmitted);
    }

    /**Handler per la home, per la route "page(/home)" che una volta loggato mostra i progetti seguiti
     * 
     */
    homeHandler() {
        this.appContainer.innerHTML = '';
        this.navContainer.innerHTML = createLogoutForm();
        this.navLeft.innerHTML = createSideNav();
        this.searchContainer.innerHTML = this.copySearch;
        this.showFollowProject(this.user);
        let className = document.getElementById('set-button-invisible');
        className.style.display = 'block';
        document.getElementById('my-account').addEventListener('click',() => {
            page('/info');
        });   
        document.getElementById('search-form').addEventListener('submit',async(event) => {
            this.myhome = true;
            this.showFilteredProjects(event,this.myhome);
            this.myhome = false;
        });
        document.getElementById('investi').addEventListener('click',() => {
            page('/project');
        })
        document.getElementById('defaultPage').addEventListener('click',this.onLogoutSubmitted);

        document.getElementById('home').addEventListener('click',() => {
            page('/home');
        })
        
        document.getElementById('logout').addEventListener('click',this.onLogoutSubmitted);
    }

    /**Handler per mostrare la pagina iniziale a qualsiasi tipo di utente, riferimento alla route "page(uri('/'))"
     * 
     */

    homePageHandler = async() => {
        this.navLeft.innerHTML = '';
        this.appContainer.innerHTML = '';
        this.navContainer.innerHTML = this.copyNavbar;
        this.appContainer.innerHTML = this.showProject();
        this.searchContainer.innerHTML = this.copySearch;
        let className = document.getElementById('set-button-invisible');
        className.style.display = 'none';
        document.getElementById('signup').addEventListener('click',() => {
            page('/signup');
        });
        document.getElementById('login').addEventListener('click',() => {
            page('/login');
        });
        document.getElementById('search-form').addEventListener('submit',async(event) => {
            this.showFilteredProjects(event);
        });
        

    }
    /**Modifica documento 

    @param docID -> id del documentp

    */

    modifyDocument = async(docID) => {
        const alertMessage = document.getElementById('alert-message');

        //CONTROLLO INPUT LATO CLIENT
        //Query sugli input da controllare
        //Per ogni elemento della lista, per ognuno di essi valuto il valore cliccato dall'utente 
        //per evitare che vengano inseriti caratteri al posto di valori numeri
        const list = document.querySelectorAll('#form-cost');
        const arrayList = [...list];
        arrayList.forEach(element => {
            element.addEventListener("keydown", (event) => {
                if (event.key >= '0' && event.key<='9' || event.key === "Backspace") { //keyCode 9 => quando l'utente preme tab
                    return event;
                }else {
                    event.preventDefault();
                }
            })
        });

        //Stesso controllo precedente,ma per type text quindi non è possibile inserire numeri al posto di caratteri
        const list2 = document.querySelectorAll('#form-title,#form-description');
        const arrayList2 = [...list2];
        arrayList2.forEach(element => {
            element.addEventListener("keydown", (event) => {
                if (event.key >= '0' && event.key<='9') {
                    event.preventDefault();
                }else {
                    return event;
                }
            })
        });
        document.getElementById('close-modal').addEventListener('click',() => {
            history.back();
        })
        //creo i comandi di modifica e uscita dal form 
        const command = document.getElementById('command-form');
        command.innerHTML = createModForm();
        document.getElementById('mod-doc').addEventListener('click',async(event) => {
            event.preventDefault();
            try {
                let docForm = document.getElementById('document-form');
                const title = docForm.elements['form-title'].value;
                const description = docForm.elements['form-description'].value;
                const date = docForm.elements['form-date'].value;
                let costo = docForm.elements['form-cost'].value;
                const file = docForm.elements['form-pdf'].value;

                //Splitto il valore di img per ottenere il riferimento all'immagine che è stata selezionata
                let tmp = [];
                tmp = file.split("\\");
                tmp = tmp[2].split(".");

                let userID = await Api.verifyRegister(this.user);
                //creo l'oggetto doc
                let doc = new Document(title,description,date,costo,tmp[0],localStorage.getItem('idProject'),userID)

                //eseguo l'update del documento
                await Api.updateDocument(doc,docID);
                
                //const doc = new Document(title,description,date,costo,idProject);


                docForm.reset();
                document.getElementById('close-modal').click();

    
                alertMessage.innerHTML = createAlert('success','Documento modificato correttamente!');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);
                //this.showOneProject(localStorage.getItem('idProject'))
            }catch(error) {
                alertMessage.innerHTML = createAlert('danger','Documento non modificato.');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);
            }
        })
    }
    

    /**Modifica commento

    @param id_commento -> id del commento
    
    */
    modifyComment = async(id_commento) => {

        document.getElementById('modify-comment').remove();
        document.getElementById('new-form-comment').innerHTML = commentFormNew();
        let comment = "";

        //GET di tutti i commenti
        let comments = await Api.getComments();
        
        
        document.getElementById('comment-button-new').addEventListener('click',async (event) => {
            event.preventDefault();
            const commentForm = document.getElementById('comment-form-new');
            const alertMessage = document.getElementById('alert-message');
            try {
                //Per ogni commento, cerco quello che ha l'id corrispondente a quello del commento appena modificato
                for(let com of comments) {
                    if(com.id_commento == id_commento) {
                        await Api.updateComment(commentForm.comment.value,com.id_commento);
                    }
                }
                alertMessage.innerHTML = createAlert('success','Commento postato con successo!');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);
                commentForm.reset();
                history.back();
            }catch(error) {
                alertMessage.innerHTML = createAlert('danger','Commento non postato.');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);
            }
        })
    }

    /**Mostro tutti i dati relativi ad un particolare documento,creando la page opportuna con i propri commenti

    @param docID -> id del 

    */

    showDocumentPage = async(docID) =>{
        this.searchContainer.innerHTML = '';
        let form = commentForm();
        let role = await this.verifyUser(this.user);
        if(role == 'undefined') {
            form="";
            this.appContainer.innerHTML = documentPage(form);
        }else {
            this.appContainer.innerHTML = documentPage(form);
        }
        //GET dei commenti dal db
        let comment = await Api.getComments();

        //GET dei documenti dal db
        let doc_info = await Api.getDocuments();

        //Per ogni documento,se esso appartiene al progetto visualizzato allora viene inserito nella tabella
        for(let doc of doc_info) {
            if(doc.id_documento == docID) {
                document.getElementById('documents-table-page').innerHTML = createListOfDocumentsPage(doc.titolo,doc.descrizione,doc.data);
            }
        }

        //Se l'utente è un finanziatore/creatore, allora può commentare
        if(role!== 'undefined') {
            document.getElementById('comment-button').addEventListener('click',async (event) => {
                this.onCommentButtonSubmitted(event,docID);
            });
            document.getElementById('home').addEventListener('click',() => {
                page('/home');
            });
            
        }
       
        //Commenti
        comment.forEach((commento) => {
            if(commento.id_documento == docID && commento.id_user == this.user) {
                const commentsTable = document.querySelector('#comments-table');
                const com = deleteCommentButton(commento.id_commento, commento.testo,commento.id_user)
                commentsTable.insertAdjacentHTML('beforeend', com);
            }
            else if(commento.id_user != this.user && commento.id_documento == docID) {
                const commentsTable = document.querySelector('#comments-table');
                const com = createListOfComment(commento.testo, commento.id_user)
                commentsTable.insertAdjacentHTML('beforeend', com);
            }
        })
    }

    /**Metodo per seguire un documento
     * 
     * @param {*} docID 
     * @param {*} user 
     * @returns 
     */
    followDocument = async(docID,user) => {    
        let alertMessage = document.getElementById('alert-message');
        //GET dei documenti seguiti 
        let res = await Api.getFollowDoc();
        try {
            //Per ogni documento seguito,controllo se appartiene all'utente loggato
            for(let follow of res) {
                //Se è presente tra i progetti seguiti,allora il secondo click effettuato è per togliere il documento dai preferiti
                if(follow.id_documento == docID && follow.user_email === user) {
                    document.getElementById('full-heart').innerHTML = HTMLfollowDocument();
                    //Eseguo la delete del follow del documento
                    await Api.removeFollowDoc(docID,user);
                    alertMessage.innerHTML = createAlert('success','Documento tolto dai preferiti correttamente!');
                    setTimeout(() => {
                        alertMessage.innerHTML = '';
                    },2000);
                    history.back();
                    return;
                }
            }
            //Altrimenti seguo il documento
            await Api.followDoc(docID,user);
            alertMessage.innerHTML = createAlert('success','Documento salvato correttamente!');
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },2000);
            //await this.showOneProject(localStorage.getItem('idProject'));
            history.back();
        }catch(err) {
            alertMessage.innerHTML = createAlert('danger','Documento non salvato.');
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },3000);
            history.back();
            throw err;
        }
    }

    /**Metodo per eliminare un documento tramite l'id di esso, solamente il creatore del documento può farlo
     * 
     * @param {*} docID 
     */

    deleteDocumentByID = async(docID) => {
        let alertMessage = document.getElementById('alert-message');
        try {
            //Eseguo la delete del documento
            await Api.deleteDocumentByID(docID);
            alertMessage.innerHTML = createAlert('success','Documento eliminato con successo!');
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },3000);
            history.back();
        }catch(error) {
            alertMessage.innerHTML = createAlert('danger','Documento non eliminato.');
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },3000);
            history.back();
            throw error;
        }

    }

    /**Metodo che verifica se il progetto visualizzato è quello creato dall'utente(creatore) loggato
     * 
     * @param {*} user 
     * @param {*} idProject 
     * @returns 
     */
    verifyUserByProjectID = async(user,idProject) => {
        //let cont = 0;

        //GET id user currently logged
        let userID = await Api.verifyRegister(user);

        //GET all projects
        let projects = await Api.getProjects();
        let check = false;

        let modProj = document.getElementById('modifica-progetto');
        let deleteProj = document.getElementById('elimina-progetto');

        //Per ogni project, cerco quello visualizzato correntemente e verifico che sia stato creato dal creatore loggato, altrimenti ritorno false
        for(let proj of projects) {
            if(proj.id_user === userID && proj.id == idProject){
                check = true;
                //cont++;
                return check;
            }
        //Se check = false allora l'utente loggato non è il creatore
        }if(!check && modProj!=null && deleteProj!=null) {
            document.getElementById('modifica-progetto').remove();
            document.getElementById('elimina-progetto').remove();
        }
        return check;
    }

    /**Metodo per acquistare un documento
     * 
     * @param {*} idDocument 
     */
    buyDocument(idDocument) {
         //CONTROLLO INPUT LATO CLIENT
        //Query sugli input da controllare
        //Per ogni elemento della lista, per ognuno di essi valuto il valore cliccato dall'utente 
        //per evitare che vengano inseriti caratteri al posto di valori numeri
        const list = document.querySelectorAll('#CCV,#numero');
        const arrayList = [...list];
        arrayList.forEach(element => {
            element.addEventListener("keydown", (event) => {
                if (event.key >= '0' && event.key<='9' || event.key === "Backspace") { 
                    return event;
                }else {
                    event.preventDefault();
                }
            })
        });
        //Stesso controllo precedente,ma per type text quindi non è possibile inserire numeri al posto di caratteri
        const list2 = document.querySelectorAll('#nome,#cognome');
        const arrayList2 = [...list2];
        arrayList2.forEach(element => {
            element.addEventListener("keydown", (event) => {
                if (event.key >= '0' && event.key<='9') { 
                    event.preventDefault();
                }else {
                    return event;
                }
            })
        });
        document.getElementById('payment-document').addEventListener('submit',async(event) => {
            event.preventDefault();
            const paymentForm = document.getElementById('payment-document');
            const alertMessage = document.getElementById('alert-message');
            let e = document.getElementById("tipo");
            let text = e.options[e.selectedIndex].text;
            let userID = await Api.verifyRegister(this.user);
            let documents = await Api.getDocuments();
            let checkValue = false;
            for(let doc of documents){
                if(doc.id_documento == idDocument){
                    if(paymentForm.importo.value >= doc.costo){
                        checkValue = true;
                    }
                }
            }
            try {
                if(checkValue === true) {
                    //Istanzio l'oggetto payment composto dai campi presi dal paymentForm
                    let payment = new Payment(paymentForm.nome.value,paymentForm.cognome.value,text,paymentForm.numero.value,paymentForm.CCV.value,userID);
                    //Eseguo la POST
                    await Api.buyDocument(idDocument,payment,localStorage.getItem("idProject"));
                    alertMessage.innerHTML = createAlert('success','Pagamento avvenuto con successo!');
                    setTimeout(() => {
                        alertMessage.innerHTML = '';
                    },3000);
                    history.back();
                }else {
                    alertMessage.innerHTML = createAlert('danger',"L'importo inserito non è sufficiente.");
                    setTimeout(() => {
                        alertMessage.innerHTML = '';
                    },3000);
                }           
            }catch(error) {
                alertMessage.innerHTML = createAlert('danger','Dati nel formato sbagliato!');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);
                throw error;
            }
        })


    }

    /**Metodo che crea un documento a partire dall'id del progetto a cui apparterrà e quindi nel progetto in cui verrà
     * visualizzato
     * 
     * @param {*} idProject 
     */
    
    createDoc = async(idProject) => {
        const alertMessage = document.getElementById('alert-message');


        //CONTROLLO INPUT LATO CLIENT
        //Query sugli input da controllare
        //Per ogni elemento della lista, per ognuno di essi valuto il valore cliccato dall'utente 
        //per evitare che vengano inseriti caratteri al posto di valori numeri
        const list = document.querySelectorAll('#form-cost');
        const arrayList = [...list];
        arrayList.forEach(element => {
            element.addEventListener("keydown", (event) => {
                if (event.key >= '0' && event.key<='9' || event.key === "Backspace") { //keyCode 9 => quando l'utente preme tab
                    return event;
                }else {
                    event.preventDefault();
                }
            })
        });

        //Stesso controllo precedente,ma per type text quindi non è possibile inserire numeri al posto di caratteri
        const list2 = document.querySelectorAll('#form-title,#form-description');
        const arrayList2 = [...list2];
        arrayList2.forEach(element => {
            element.addEventListener("keydown", (event) => {
                if (event.key >= '0' && event.key<='9') {
                    event.preventDefault();
                }else {
                    return event;
                }
            })
        });
        const command = document.getElementById('command-form');
        command.innerHTML = createExitForm();
        //Viene effettuato il submit del form
        document.getElementById('submit-doc').addEventListener('click',async(event) => {
            event.preventDefault();
            try {
                let docForm = document.getElementById('document-form');
                const title = docForm.elements['form-title'].value;
                const description = docForm.elements['form-description'].value;
                const date = docForm.elements['form-date'].value;
                let costo = docForm.elements['form-cost'].value;
                const file = docForm.elements['form-pdf'].value;

                //Splitto il valore di img per ottenere il riferimento all'immagine che è stata selezionata
                let tmp = [];
                tmp = file.split("\\");
                tmp = tmp[2].split(".");
                
                let userID = await Api.verifyRegister(this.user)
                //Istanzio l'oggetto doc della classe Document
                const doc = new Document(title,description,date,costo,tmp[0],idProject,userID);
                
                //Eseguo la POST
                let docID = await Api.postDocument(doc);
                //docForm.reset();
                //document.getElementById('close-modal').click();
    
                alertMessage.innerHTML = createAlert('success','Documento aggiunto correttamente!');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);

                this.showOneProject(idProject)
            }catch(error) {
                alertMessage.innerHTML = createAlert('danger','Documento non aggiunto.');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);
                
                throw error;
            }
        })
    }

    /**Metodo per eliminare un commento tramite l'id di esso
     * 
     * @param {*} id_commento 
     * @param {*} user 
     */
    removeComment = async(id_commento,user) => {
        let alertMessage = document.getElementById('alert-message');
        try {
            //Elimino il commento con quell'id
            await Api.deleteComment(id_commento,user);
            alertMessage.innerHTML = createAlert('success',"Commento eliminato correttamente");
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },3000);
            history.back();
        }catch(error) {
            alertMessage.innerHTML = createAlert('danger',"Commento non eliminato.");
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },3000);
            history.back();
            throw error;
        }
    }

    /** Metodo che viene richiamato quando viene effettuata una pubblicazione di un commento
     * 
     * @param {*} event 
     * @param {*} docID 
     */
    onCommentButtonSubmitted = async(event,docID) => {
        event.preventDefault();
        const commentForm = document.getElementById('comment-form');
        const alertMessage = document.getElementById('alert-message');
        try {
            //Creo l'oggetto comment 
            let comment = new Comment(this.user,docID,localStorage.getItem('idProject'),commentForm.comment.value);
            let idComment = await Api.postComment(comment);
            alertMessage.innerHTML = createAlert('success','Commento postato con successo!');
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },3000);
            commentForm.reset();
            //Mostro tutti i commenti appena inseriti
            this.showAllComment(comment,idComment);
        }catch(error) {
            alertMessage.innerHTML = createAlert('danger','Commento non postato.');
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },3000);
            history.back();
            throw error;
        }
    }
    /**Metodo che viene richiamato dalla onCommentButtonSubmitted quando viene inserito un nuovo commento
     * 
     * @param {*} commento 
     * @param {*} idComment 
     */
    showAllComment = async(commento,idComment) => {
        //Se l'utente che ha postato il commento è quello effettivamente loggato, allora lo mostro con le funzioni per eliminare e modificare il commento
        if(commento.user == this.user) {
            const commentsTable = document.querySelector('#comments-table');
            const com = deleteCommentButton(idComment, commento.text,commento.user)
            commentsTable.insertAdjacentHTML('beforeend', com);
        }else {
            //Altrimenti se non è un commento postato dall'utente loggato, allora lo mostro semplicemente con un identificativo della mail dell'utente che 
            //lo ha postato
            const commentsTable = document.querySelector('#comments-table');
            const com = createListOfComment(commento.text, commento.user)
            commentsTable.insertAdjacentHTML('beforeend', com);
        }
    }

    /**Metodo per effettuare una donazione ad un progetto
     * 
     * @param {*} idProject 
     */
    projectDonation(idProject) {
        //CONTROLLO INPUT LATO CLIENT
        //Query sugli input da controllare
        //Per ogni elemento della lista, per ognuno di essi valuto il valore cliccato dall'utente 
        //per evitare che vengano inseriti caratteri al posto di valori numeri
        const list = document.querySelectorAll('#CCV,#numero');
        const arrayList = [...list];
        arrayList.forEach(element => {
            element.addEventListener("keydown", (event) => {
                if (event.key >= '0' && event.key<='9' || event.key === "Backspace") {
                    return event;
                }else {
                    event.preventDefault();
                }
            })
        });

        //Stesso controllo precedente,ma per type text quindi non è possibile inserire numeri al posto di caratteri
        const list2 = document.querySelectorAll('#nome,#cognome');
        const arrayList2 = [...list2];
        arrayList2.forEach(element => {
            element.addEventListener("keydown", (event) => {
                if (event.key >= '0' && event.key<='9') { 
                    event.preventDefault();
                }else {
                    return event;
                }
            })
        });
        //Quando viene effettuato la submit del form
        document.getElementById('register-button').addEventListener('click',async(event) => {
            //GET delle donazioni totali sul progetto proj.id
            event.preventDefault();
            const donationForm = document.getElementById('donation-form');
            const alertMessage = document.getElementById('alert-message');
            let e = document.getElementById("tipo");
            let text = e.options[e.selectedIndex].text;
            try {
                //Eseguo la post della donazione
                await Api.projectDonation(this.user,idProject,donationForm.nome.value,donationForm.cognome.value,text,donationForm.numero.value,donationForm.CCV.value,donationForm.importo.value);
                alertMessage.innerHTML = createAlert('success','Donazione avvenuta con successo!');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);
                //this.showOneProject(idProject);
                history.back();
            }catch(error) {
                alertMessage.innerHTML = createAlert('danger',`Hai inserito dei dati nel formato sbagliato,controlla!`);
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);          
                throw error;
            }
        })
    }


    /**Metodo per eliminare un progetto tramite l'id di esso
     * 
     * @param {*} idProject 
     */
    deleteProject = async(idProject) => {
        await Api.deleteProject(idProject);
        page('/home');
    }

    /**Metodo per modificare un progetto, solo se l'utente loggato è quello che ha creato il progetto
     * 
     * @param {*} idProject 
     */

    modifyProject(idProject) {
        //Stesso controllo precedente,ma per type text quindi non è possibile inserire numeri al posto di caratteri
        const list2 = document.querySelectorAll('#mod-title,#mod-description,#mod-author,#mod-category');
        const arrayList2 = [...list2];
        arrayList2.forEach(element => {
            element.addEventListener("keydown", (event) => {
                if (event.key >= '0' && event.key<='9') {
                    event.preventDefault();
                }else {
                    return event;
                }
            })
        });
        const command = document.getElementById('modify-template-form');
        command.innerHTML = createModForm();

        //Viene eseguita la submit del form
        document.getElementById('mod-doc').addEventListener('click',async(event) => {
            event.preventDefault();
            const alert = document.getElementById('alert-message');
            const modifyForm = document.getElementById('modify-form');

            let userID = await Api.verifyRegister(this.user)

            //Prendo i dati dal form
            const title = modifyForm.elements['mod-title'].value;
            const description = modifyForm.elements['mod-description'].value;
            const author = modifyForm.elements['mod-author'].value;
            const category = modifyForm.elements['mod-category'].value;
            const img = modifyForm.elements['mod-image'].value;

            let tmp = [];
            tmp = img.split("\\");
            tmp = tmp[2].split(".");

            const project = new Project(userID,title,description,author,category,tmp[0]);

            try {
                //Eseguo la PUT dei nuovi valori 
                await Api.modifyProject(project,idProject);
                //modifyForm.reset();
                //document.getElementById('close-modal').click();
                alert.innerHTML = createAlert('success',`Il progetto è stato modificato correttamente!`);
                setTimeout(() => {
                    alert.innerHTML = '';
                },3000);
                this.showOneProject(idProject);
            }catch(error) {
                alert.innerHTML = createAlert('danger',`Il progetto non è stato modificato correttamente.`);
                setTimeout(() => {
                    alert.innerHTML = '';
                },3000);
                history.back();
                throw(error);
            }
        })
    }

    /**Metodo per mostrare i progetti seguiti di un particolare utente
     * 
     * @param {*} user 
     * @returns 
     */

    showFollowProject = async(user) => {
        //GET dei progetti seguiti dall'utente loggato
        let followProjects = await Api.getFollowProject(user);

        //GET follow documents
        let docs = await Api.getFollowDoc();

        //GET all documents
        let documents = await Api.getDocuments();

        //Se la lista è vuota,stampo un messaggio di notifica
        if(followProjects.length === 0) {
            this.appContainer.innerHTML = createEmptyApp();
            return;
        }
        //Altrimenti inserisco i progetti seguiti all'interno della followProjectTable
        this.appContainer.innerHTML = '';
        for(let project of followProjects) {
            this.appContainer.innerHTML += createFollowProjectTemplate(project.titolo,project.descrizione,project.autore,project.categoria,project.id,project.image);
        }
        for(let d of documents) {
            for(let doc of docs){
                if(doc.id_documento == d.id_documento && doc.user_email == user){
                    this.appContainer.insertAdjacentHTML('beforeend', createDocHTMLTemplate(d.id_documento, d.titolo, d.descrizione, d.data));
                }          
            }
        }


    }

    /**Metodo per seguire un progetto tramite l'id del relativo progetto e l'utente (loggato) che vuole seguirlo
     * 
     * @param {*} idProject 
     * @param {*} username 
     * @returns 
     */
    followProject = async(idProject,username) =>  {
        let alertMessage = document.getElementById('alert-message');
        //GET dei progetti seguiti
        let res = await Api.getFollowProject(username);
        try {
            //Per ogni progetto seugito, controllo se è già stato seguito, se si allora lo tolgo dai seguiti
            for(let follow of res) {
                if(follow.id == idProject) {
                    document.getElementById('star-project').innerHTML = imageFollowProject();
                    await Api.removeThisProject(idProject,username);
                    alertMessage.innerHTML = createAlert('success','Progetto tolto dai preferiti correttamente!');
                    setTimeout(() => {
                        alertMessage.innerHTML = '';
                    },3000);
                    history.back();
                    return;
                }
            }
            //Altrimenti seguo il progetto
            await Api.postFollowProject(idProject,username);
            alertMessage.innerHTML = createAlert('success','Progetto salvato correttamente!');
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },2000);
            history.back();
        }catch(err) {
            alertMessage.innerHTML = createAlert('danger','Progetto non salvato.');
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },3000);
            history.back();
            throw err;
        }
    }

    /**Metodo per rimuovere un progetto seguito
     * 
     * @param {*} idProject 
     */

    removeFollowProject = async(idProject,user) => {
        try {
            await Api.removeThisProject(idProject,user);
            page.redirect('/home');
        }catch(error){
            history.back();
            throw error;
        }
    }

    /**Metodo per mostrare gli alert sulla parte superiore dello schermo
     * 
     * @param {*} result 
     */
    showAlertMessage(result) {
        const alert = document.getElementById('alert-message');
        if(result === 'success') {
            alert.innerHTML = createAlert('success','Progetto seguito correttamente!');
            setTimeout(() => {
                alert.innerHTML = '';
            },3000);
        }else {
            alert.innerHTML = createAlert('danger','Stai già seguendo il progetto!');
            setTimeout(() => {
                alert.innerHTML = '';
            },3000);
        }
    }

    /**Metodo che per ogni progetto mostra tutte le informazioni inerenti ad esso, creando la projectPage in base al tipo
     * di utente loggato
     * 
     * @param {*} id 
     */
    
    showOneProject = async(id) => {

        let totalDonations = 0;
        let arrayUser = [];
        
        //GET documents
        let documents = await Api.getDocuments();

        //GET delle donazioni totali sul progetto proj.id
        let sum = await Api.getDonations();

        //GET dei documenti acquistati
        let payment = await Api.getPayment();

        //GET dei documenti seguiti
        let followDoc = await Api.getFollowDoc();


        //GET progetti seguiti
        let followProj = await Api.getFollowProject(this.user);

        //GET dei progetti
        let projects = await this.showProject();

        //Controllo il tipo di utente loggato correntemente
        const ruolo = await this.verifyUser(this.user);

        //GET dei progetti con il mi piace
        const likesProject = await Api.getLikesProject();

        for(let proj of projects) {
            if(proj.id == id) {
                
                //SUM è una tupla composta da {id_progetto,id_user,importo}
                //totalDonations è la somma totale delle donazioni per quel progetto
                //arrayUser è la lista di user che hanno donato ad un progetto, in questo caso ad un determinato progetto
                sum.forEach((marker) => {
                    if(marker.id_progetto == id) {
                        totalDonations += marker.importo;
                        arrayUser.push(marker.id_user);
                    }
                })

                let favourites = "";
                let like = "";
                let checkLike = false;
                //Se è un creatore
                if(ruolo==true) {
                    favourites = starProject(proj.id);
                    like = notLikeProject(proj.id);
                    for(let fproj of followProj){
                        if(fproj.id == proj.id) {
                            favourites = imageFollowProject(proj.id);
                        }
                    }
                    for(let like of likesProject){
                        if(like.id_progetto == proj.id && this.user == like.user_email) {
                            checkLike = true;
                        }
                    }
                    if(checkLike){
                        like = likeProject(proj.id);
                    } 
                    this.appContainer.innerHTML = projectPage(proj.id,proj.titolo,proj.descrizione,proj.autore,proj.categoria,totalDonations,proj.immagine,favourites,like);
                //SE è un finanziatore
                }else if(ruolo==false){
                    favourites = starProject(proj.id);
                    like = notLikeProject(proj.id);
                    for(let fproj of followProj){
                        if(fproj.id == proj.id) {
                            favourites = imageFollowProject(proj.id);
                        }
                    }
                    for(let like of likesProject){
                        if(like.id_progetto == proj.id && this.user == like.user_email) {
                            checkLike = true;
                        }
                    }
                    if(checkLike){
                        like = likeProject(proj.id);
                    } 
                    this.appContainer.innerHTML = projectPageFinanziatore(proj.id,proj.titolo,proj.descrizione,proj.autore,proj.categoria,totalDonations,proj.immagine,favourites,like);    
                //Se non è registrato e quindi non è loggato
                }else if(ruolo == 'undefined') {
                    this.appContainer.innerHTML = projectPageUndefined(proj.id,proj.titolo,proj.descrizione,proj.autore,proj.categoria,totalDonations,proj.immagine);    
                }
                //per ogni utente nell'array, creo una nuova tupla <li> nella funzione createListDonator,andando a riempire la lista dei donatori 
                if(arrayUser.length==0){
                    document.getElementById('list-donator').innerHTML = createListOfDonator("Nessun donatore");
                }else {
                    arrayUser.forEach((user) => {
                        document.getElementById('list-donator').innerHTML += createListOfDonator(user);
                    })
                }
            
                let pay = [];
                let arrayIdUser = [];
                payment.forEach((paym) => {
                    pay.push(paym.id_doc);
                    arrayIdUser[paym.id_doc] = paym.id_user;
                })

                let resultProject = await this.verifyUserByProjectID(this.user,localStorage.getItem('idProject'));
                let userID = await Api.verifyRegister(this.user);

                if(this.user == 'undefined') {
                    documents.forEach((doc) => {
                        if(doc.id_progetto == id) {
                            let symbol = "€";
                        if(doc.costo==0) {
                            doc.costo = "Gratis";
                            symbol = "";
                        }
                        document.getElementById('documents-table').innerHTML += createListOfDocuments(doc.id_documento,doc.titolo,doc.descrizione,doc.data,doc.costo,symbol,"","","","",ruolo,doc.src);
                        }
                    })
                }else {
                        //Documenti
                        let basket = "";
                        let heart = "";
                        let modify = "";
                        let shop="";
                        let newValue = "";
                        documents.forEach(async(doc) => {
                            if(doc.id_progetto == id){
                                if(arrayIdUser[doc.id_documento] === userID && pay.includes(doc.id_documento)){
                                    shop = buyedDoc();
                                    newValue = createLinkToDownload(doc.src);
                                }else {
                                    shop = createCarrello(doc.id_documento);
                                    newValue="";
                                }
                                let value = doc.costo;
                                let checkFollowBought = false;
                                let symbol = "€"
                                if(doc.costo == 0) {
                                    value = "Gratis";
                                    symbol = "";
                                    shop = "";
                                }
                                basket = "";
                                if(resultProject=== true) {
                                    basket = deleteDocumentButton(doc.id_documento);
                                    modify = formDoc(doc.id_documento);
                                }else{
                                    if(ruolo!=='undefined'){
                                        checkFollowBought = false;
                                    }    
                                }
                                for(let follow of followDoc){
                                    if(follow.id_documento == doc.id_documento && this.user == follow.user_email) {
                                        checkFollowBought = true;
                                    }
                                }
                                if(doc.id_user !== userID){
                                    modify = "";
                                    basket = "";
                                }
                                if(checkFollowBought === true){
                                    heart = followedDoc(doc.id_documento);
                                }else {
                                    heart = HTMLfollowDocument(doc.id_documento);
                                }
                                if(value ==="Gratis"){
                                    newValue = createLinkToDownload(doc.src);
                                }
                                document.getElementById('documents-table').innerHTML += createListOfDocumentsBought(doc.id_documento,doc.titolo,doc.descrizione,doc.data,value,symbol,shop,basket,modify,heart,ruolo,doc.src,newValue);
                            }
                        })   
                }
                
            }
        }
    }
    
    /**Metodo che verifica se l'utente è loggato e il suo ruolo
     * 
     * @param {*} user 
     * @returns 
     */
    verifyUser = async(user) => {
        if(user == undefined) return 'undefined';
        if(user == 'undefined') {
            return 'undefined';
        }
        let check = false;
        const utente = await Api.verifyUser(user);
        if(utente!==user){
            return check;
        }else {
            return check=true;
        }
    }

    /**Metodo per effettuare la registrazione di un utente
     * 
     */
    onRegisterButtonSubmitted = async() =>  {
        this.appContainer.innerHTML = createRegisterForm();
        this.navContainer.innerHTML = this.copyNavbar;
        document.getElementById('login').addEventListener('click',() => {
            page('/login');
        });
        document.getElementById('signup').addEventListener('click',() => {
            page('/signup');
        });
        this.searchContainer.innerHTML = '';

        //Stesso controllo precedente,ma per type text quindi non è possibile inserire numeri al posto di caratteri
        const list2 = document.querySelectorAll('#nome,#cognome');
        const arrayList2 = [...list2];
        arrayList2.forEach(element => {
            element.addEventListener("keydown", (event) => {
                if (event.key >= '0' && event.key<='9') { //keyCode 9 => quando l'utente preme tab
                    event.preventDefault();
                }else {
                    return event;
                }
            })
        });
        //Submit del form
        document.getElementById('signup-form').addEventListener('submit',async (event) => {
            event.preventDefault();
            const form = event.target;
            const alert = document.getElementById('alert-message');
            let ruolo = "creatore";
            let value = document.getElementById('defaultCheck');
            //Controllo se spuntato il flag di finanziatore
            if(value.checked) ruolo = "finanziatore";
            try {
                //Registra l'utente
                const user = await Api.doRegister(form.email.value,form.password.value,form.nome.value,form.cognome.value,ruolo);
                if(user === false){
                    alert.innerHTML = createAlert('danger','Utente già registrato! ')
                    setTimeout(() => {
                        alert.innerHTML = '';
                    },3000);
                    page('/signup')
                    return;
                }
                alert.innerHTML = createAlert('success',`Benvenuto ${user}`);
                setTimeout(() => {
                    alert.innerHTML = '';
                },3000);
                form.reset();
                page('/login');
            }catch(error) {
                alert.innerHTML = createAlert('danger','Utente già registrato! ')
                setTimeout(() => {
                    alert.innerHTML = '';
                },3000);
                page('/signup')
                throw error;
            }
    });

    }

    /**Metodo per effettuare il login
     * 
     */
    onLoginButtonSubmitted() {
        this.navContainer.innerHTML = createLoginForm();
        document.getElementById('login-form').addEventListener('submit',async(event) => {
            event.preventDefault();
            const form = event.target;
            const alert = document.getElementById('alert-message');
            try {
                //Effettuo il login
                const user = await Api.doLogin(form.email.value,form.password.value);
                alert.innerHTML = createAlert('success',`Bentornato ${user}`);
                setTimeout(() => {
                    alert.innerHTML = '';
                },3000);       
                this.user = user;
                page.redirect('/home');
            }catch(error){
                alert.innerHTML = createAlert('danger','Utente non registrato!')
                setTimeout(() => {
                    alert.innerHTML = '';
                },3000);
                page.redirect('/login')
                throw error;
            }
        })
    }

    /**Metodo per creare un progetto
     * 
     * @param {*} user 
     */
    onCreateProjectSubmitted = async(user) =>  {
        //Stesso controllo precedente,ma per type text quindi non è possibile inserire numeri al posto di caratteri
        const list2 = document.querySelectorAll('#form-title,#form-description,#form-author,#form-category');
        const arrayList2 = [...list2];
        arrayList2.forEach(element => {
            element.addEventListener("keydown", (event) => {
                if (event.key >= '0' && event.key<='9') { //keyCode 9 => quando l'utente preme tab
                    event.preventDefault();
                }else {
                    return event;
                }
            })
        });
        //Submit del form
        document.getElementById('add-form-button').addEventListener('click',async(event) => {
            event.preventDefault();
            const alert = document.getElementById('alert-message');
            const addForm = document.getElementById('add-form');            
            const title = addForm.elements['form-title'].value;
            const description = addForm.elements['form-description'].value;
            const author = addForm.elements['form-author'].value;
            const category = addForm.elements['form-category'].value;
            const img = addForm.elements['form-image'].value;

            //Splitto il valore di img per ottenere il riferimento all'immagine che è stata selezionata
            let tmp = [];
            tmp = img.split("\\");
            tmp = tmp[2].split(".");
            
            let userID = await Api.verifyRegister(user)

            //Creo l'oggetto project
            const project = new Project(userID,title,description,author,category,tmp[0]);
            let x = await Api.createProject(project);
        
            addForm.reset();
            document.getElementById('close-modal').click();
            try {
                alert.innerHTML = createAlert('success',`Il progetto ${title} è stato creato correttamente!`);
                setTimeout(() => {
                    alert.innerHTML = '';
                },3000);
                page('/project');
                return;
            }catch(error) {
                    alert.innerHTML = createAlert('danger',`Il progetto ${title} non è stato creato.`);
                    setTimeout(() => {
                        alert.innerHTML = '';
                    },3000);
                    history.back();
                    throw(error);
                }
            })
    }

    /**Mostro l'elenco di tutti i progetti nel db
     * 
     * @returns projects
     */
    showProject = async() => {
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

        this.appContainer.innerHTML = "";
        for(let project of projects){
            //SE undefined, quindi vuol dire che non ci sono likes, allora metto 0
            if(newArray[project.id] == undefined) {
                newArray[project.id] = 0;
            }
            this.appContainer.insertAdjacentHTML('beforeend',createProjectHTML(project.titolo,project.descrizione,project.autore,project.categoria,project.id,project.immagine,newArray[project.id]));
        }
        return projects;
    }

    getMostLikelyProject = async() => {
        
    }
    
    /**Metodo per ottenere le informazioni dell'utente loggato
     * 
     * @param {*} user 
     */
    myAccount = async(user) => {
        try {
            const info = await Api.getInfo(user);
            this.searchContainer.innerHTML = showAccount(info.nome,info.cognome,info.email,info.ruolo);
            this.appContainer.innerHTML = '';
        }catch(error){
            history.back();
            throw error;
        }
    }

    /**Metodo per effettuare il logout dell'utente
     * 
     */
    onLogoutSubmitted = async() => {
        await Api.doLogout();
        this.user = 'undefined';
        page.redirect('/');
    }

    /**Metodo che mostra i progetti filtrati dalla barra di ricerca
     * 
     * @param {*} event 
     * @param {*} myhome 
     */
    showFilteredProjects = async(event,myhome) => {
        let progetto = false;
        let documento = false;
        
        //Se viene inserito un valore nella prima barra di ricerca,allora fa riferimento alla categoria e perciò ai progetti
        if(document.getElementById('search-titolo').checked == true && document.getElementById('search-documento').checked == false) {
            //Setto progetto a true
            progetto = true;
        }
        //Se invece il campo di ricerca documento non è vuoto, setto documento a true
        if(document.getElementById('search-documento').checked == true && document.getElementById('search-titolo').checked == false){
            documento = true;
        }
        //Se invece entrambi sono presenti,allora setto both a true
        if(document.getElementById('search-documento').checked == true && document.getElementById('search-titolo').checked == true){
            both = true;
        }
        
        //Chiamo la selectFilter in project
        await Project.selectFilter(event,this.user,progetto,documento,this.appContainer,myhome);
    }
}


export default App;