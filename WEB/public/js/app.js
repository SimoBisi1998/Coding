"use strict";

import Api from './api.js';
import Project from './project.js';
import Document from './document.js';
import Payment from './payment.js';
import Comment from './comment.js';
import { createFormProject, createNewForm,createProjectHTML,projectPage,projectPageFinanziatore,createFollowProjectTemplate,addModifyButton,
createListOfDonator,createListOfComment,deleteCommentButton ,createListOfDocuments,createExitForm, createCarrello, buyedDoc,createListOfDocumentsBought,
deleteDocumentButton, HTMLfollowDocument,followedDoc,documentPage, createListOfDocumentsPage,commentForm,commentFormNew,modifyDocument,formDoc,createModForm, projectPageUndefined, imageFollowProject,starProject} from './templates/project-template.js';
import page from '//unpkg.com/page/page.mjs';
import {createRegisterForm,createLoginForm,createLogoutForm,createSideNav} from './templates/login-template.js';
import {createAlert} from './templates/alert-template.js';
import {showAccount} from './templates/account-template.js';
import {createEmptyApp,createDonationMethod, createPaymentDocument,createNavProjects} from './templates/app-template.js';


class App {
    constructor(navContainer,appContainer,searchContainer,navLeft) {
        this.appContainer = appContainer;
        this.navContainer = navContainer;
        this.searchContainer = searchContainer;
        this.navLeft = navLeft;
        this.user;
        this.projects;
        this.copyApp = this.appContainer.innerHTML;;
        this.copyNavbar = this.navContainer.innerHTML;;
        this.copySearch = this.searchContainer.innerHTML;;
        let myhome = false;
        
        //copia dell'init per ripristinare correttamente gli oggetti della pagina iniziale

        page('/', async() => {
            this.homePageHandler();
        });

        page('/signup', async() => {
            appContainer.innerHTML = '';
            navContainer.innerHTML = '';
            this.onRegisterButtonSubmitted();
        });

        page('/login',() => {
            this.appContainer.innerHTML = this.copyApp;
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

        page('/project/:id',async(req) => {
            this.projectPageHandler(req);
        })

        page('/project/follow/:id',async(req) => {
            await this.removeFollowProject(req.params.id);
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


        page();
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
                    this.navContainer.innerHTML = addModifyButton();
                    this.verifyUserByProjectID(this.user,idProject); 
                    document.getElementById('elimina-progetto').addEventListener('click',async() => {
                        this.deleteProject(idProject,this.user);
                    })
                    document.getElementById('modifica-progetto').addEventListener('click',async() => {
                        this.modifyProject(idProject);
                    })
                    document.getElementById('crea-documento').addEventListener('click',async(event) => {
                        this.createDoc(idProject);
                    });
                }
                document.getElementById('my-account').addEventListener('click',() => {
                    page('/info');
                })
                document.getElementById('home').addEventListener('click',() => {
                    page('/home');
                });
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
            this.showFilteredProjects(event,myhome);
        });
        if(role) {
            this.navContainer.innerHTML = createFormProject();
            document.getElementById('project').addEventListener('click',() => {
                this.onCreateProjectSubmitted(this.user)
            });
        }else {
            this.navContainer.innerHTML = createNewForm();
        }
        document.getElementById('logout').addEventListener('click',this.onLogoutSubmitted);
        document.getElementById('my-account').addEventListener('click',() => {
            page('/info');
        })
        document.getElementById('home').addEventListener('click',() => {
            this.appContainer.innerHTML = '';
            page('/home');
        })
        this.projects = await this.showProject();        
    }

    /**Handler per la route "page('/info')" per estrarre le informazioni dell'utente loggato
     * 
     */

    infoHandler = async() => {
        this.myAccount(this.user);
        this.searchContainer.innerHTML = this.copySearch;
        document.getElementById('home').addEventListener('click',() => {
            page('/home');
        })    
    }

    /**Handler per la home, per la route "page(/home)" che una volta loggato mostra i progetti seguiti
     * 
     */
    homeHandler() {
        this.navContainer.innerHTML = '';
        this.appContainer.innerHTML = '';
        this.navContainer.innerHTML = createLogoutForm();
        this.navLeft.innerHTML = createSideNav();
        this.searchContainer.innerHTML = this.copySearch;
        this.showFollowProject(this.user);
        document.getElementById('my-account').addEventListener('click',() => {
            page('/info');
        });   
        document.getElementById('search-form').addEventListener('submit',async(event) => {
            myhome = true;
            this.showFilteredProjects(event,myhome);
        });
        document.getElementById('logout').addEventListener('click',this.onLogoutSubmitted);
    }

    /**Handler per mostrare la pagina iniziale a qualsiasi tipo di utente, riferimento alla route "page(uri('/'))"
     * 
     */

    homePageHandler = async() => {
        this.navContainer.innerHTML = this.copyNavbar;
        this.appContainer.innerHTML = this.showProject();
        this.searchContainer.innerHTML = this.copySearch;
        document.getElementById('signup').addEventListener('click',() => {
            page('/signup');
        });
        document.getElementById('login').addEventListener('click',() => {
            page('/login');
        });
        document.getElementById('investi').addEventListener('click',() => {
            page('/project');
        })
        document.getElementById('search-form').addEventListener('submit',async(event) => {
            this.showFilteredProjects(event);
        });
        this.projects = await this.showProject();
    }
    /**Modifica documento 

    @param docID -> id del documentp

    */

    modifyDocument = async(docID) => {
        const alertMessage = document.getElementById('alert-message');

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

                //creo l'oggetto doc
                let doc = {
                    id_documento : docID,
                    titolo : title,
                    descrizione : description,
                    data : date,
                    costo : costo
                }

                //eseguo l'update del documento
                await Api.updateDocument(doc);
                //const doc = new Document(title,description,date,costo,idProject);


                docForm.reset();
                document.getElementById('close-modal').click();

    
                alertMessage.innerHTML = createAlert('success','Documento aggiunto correttamente!');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);
                history.back();
            }catch(error) {
                alertMessage.innerHTML = createAlert('danger','Documento non aggiunto.');
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
        let form = commentForm();
        let role = await this.verifyUser(this.user);
        if(role == true || role == 'undefined') {
            form="";
            this.appContainer.innerHTML = documentPage(form);
        }
        
        this.appContainer.innerHTML = documentPage(form);

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

        //Se l'utente è un finanziatore, allora può commentare
        if(role == false) {
            document.getElementById('comment-button').addEventListener('click',async (event) => {
                this.onCommentButtonSubmitted(event,docID);
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
                    await Api.removeFollowDoc(docID);
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
        document.getElementById('payment-document').addEventListener('submit',async(event) => {
            event.preventDefault();
            const paymentForm = document.getElementById('payment-document');
            const alertMessage = document.getElementById('alert-message');
            try {
                //Istanzio l'oggetto payment composto dai campi presi dal paymentForm
                let payment = new Payment(paymentForm.nome.value,paymentForm.cognome.value,paymentForm.tipo.value,paymentForm.numero.value,paymentForm.CCV.value);
                //Eseguo la POST
                await Api.buyDocument(idDocument,payment);
                alertMessage.innerHTML = createAlert('success','Pagamento avvenuto con successo!');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);
                history.back();
            }catch(error) {
                alertMessage.innerHTML = createAlert('danger','Acquisto non avvenuto!');
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

        const value = document.getElementById('defaultCheck');
        const element = document.getElementById('input-box');
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

                //Istanzio l'oggetto doc della classe Document
                const doc = new Document(title,description,date,costo,idProject);
                
                //Eseguo la POST
                let docID = await Api.postDocument(doc);
                //docForm.reset();
                //document.getElementById('close-modal').click();
    
                alertMessage.innerHTML = createAlert('success','Documento aggiunto correttamente!');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);

                this.showDocuments(doc,docID);
            }catch(error) {
                alertMessage.innerHTML = createAlert('danger','Documento non aggiunto.');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);
            }
        })
    }

    /**Metodo per mostrare i documenti appena inseriti
     * 
     * @param {*} doc 
     * @param {*} docID 
     */

    showDocuments = async(doc,docID)=>{
        const documentsTable = document.querySelector('#documents-table');


        //se l'utente non è loggato
        if(this.user == 'undefined') {
            const documents = createListOfDocumentsBought(docID,doc.titolo,doc.descrizione,doc.data,doc.costo,"","","");
            documentsTable.insertAdjacentHTML('beforeend',documents);
        }
        else {
            //GET dei documenti acquistati
            let payment = await Api.getPayment();

            //GET dei documenti seguiti
            let followDoc = await Api.getFollowDoc();

            //Controllo se un documento è stato acquistato oppure no
            let pay = [];
            payment.forEach((paym) => {
                pay.push(paym.id_doc);
            })

            let basket = "";
            let modify = "";
            let heart="";
            //Se è presente il documento tra i pagamenti del cliente
            if(pay.includes(doc.id)){
                let shop = buyedDoc();
                let value = doc.costo;
                let symbol = "€"
                basket = "";
                modify="";
                if(await this.verifyUserByProjectID(this.user,localStorage.getItem('idProject')) === true) {
                    basket = deleteDocumentButton();
                    modify = formDoc();
                }
                //Creo la lista dei documenti acquistati che verrà inserita nella documents-table
                const documents = createListOfDocumentsBought(docID,doc.titolo,doc.descrizione,doc.data,value,symbol,shop,basket,modify);
                documentsTable.insertAdjacentHTML('beforeend',documents);
            }else {
                let ruoloUser = await Api.getInfo(this.user);
                let shop = createCarrello();
                let value = doc.costo;
                let symbol = "€"
                basket = "";
                modify="";
                heart="";
                if(doc.costo == 0) {
                    value = "Gratis";
                    symbol = "";
                    shop = "";
                }
                if(await this.verifyUserByProjectID(this.user,localStorage.getItem('idProject')) === true) {
                    basket = deleteDocumentButton();
                    modify = formDoc();
                }else {
                    if(ruolo)
                    if(ruoloUser.ruolo === 'finanziatore') {
                        heart = HTMLfollowDocument();
                    }
                }
                for(let follow of followDoc){
                    if(follow.id_documento == doc.id_documento && this.user == follow.user_email) {
                        heart = followedDoc();
                        checkFollow = true;
                    }
                }
                //Creo la lista documenti diversa rispetto a quella precedente
                const documents = createListOfDocuments(docID,doc.titolo,doc.descrizione,doc.data,value,symbol,shop,basket,heart,modify,ruoloUser.ruolo);
                if(documents!=null) {
                    documentsTable.insertAdjacentHTML('beforeend',documents);
                }
                }
        }
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
                if (event.key >= '0' && event.key<='9' || event.key === 'Backspace' || event.keyCode == 9) { //keyCode 9 => quando l'utente preme tab
                    return event;
                }else {
                    event.preventDefault();
                }
            })
        });
        //Quando viene effettuato la submit del form
        document.getElementById('register-button').addEventListener('click',async(event) => {
            //GET delle donazioni totali sul progetto proj.id
            event.preventDefault();
            const donationForm = document.getElementById('donation-form');
            const alertMessage = document.getElementById('alert-message');
            try {
                //Eseguo la post della donazione
                await Api.projectDonation(this.user,idProject,donationForm.nome.value,donationForm.cognome.value,donationForm.tipo.value,donationForm.numero.value,donationForm.CCV.value,donationForm.importo.value);
                alertMessage.innerHTML = createAlert('success','Donazione avvenuta con successo!');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);
                await this.showOneProject(idProject);
                history.back();
            }catch(error) {
                alertMessage.innerHTML = createAlert('danger','Donazione non avvenuta!');
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
        const command = document.getElementById('command-form');
        command.innerHTML = createModForm();

        //Viene eseguita la submit del form
        document.getElementById('mod-doc').addEventListener('click',async(event) => {
            event.preventDefault();
            const alert = document.getElementById('alert-message');
            const modifyForm = document.getElementById('modify-form');

            //Prendo i dati dal form
            const title = modifyForm.elements['mod-title'].value;
            const description = modifyForm.elements['mod-description'].value;
            const author = modifyForm.elements['mod-author'].value;
            const category = modifyForm.elements['mod-category'].value;
            const image = modifyForm.elements['mod-image'].value;
            const project = new Project(title,description,author,category,image);
            
            try {
                //Eseguo la PUT dei nuovi valori 
                await Api.modifyProject(project,idProject);
                modifyForm.reset();
                document.getElementById('close-modal').click();
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
                    await Api.removeThisProject(idProject);
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
            throw err;
        }
    }

    /**Metodo per rimuovere un progetto seguito
     * 
     * @param {*} idProject 
     */

    removeFollowProject = async(idProject) => {
        try {
            await Api.removeThisProject(idProject);
            page.redirect('/home');
        }catch(error){
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
                //Se è un creatore
                if(ruolo==true) {
                    favourites = starProject(proj.id);
                    for(let fproj of followProj){
                        if(fproj.id == proj.id) {
                            favourites = imageFollowProject(proj.id);
                        }
                    }
                    this.appContainer.innerHTML = projectPage(proj.id,proj.titolo,proj.descrizione,proj.autore,proj.categoria,totalDonations,proj.immagine,favourites);
                //SE è un finanziatore
                }else if(ruolo==false){
                    favourites = starProject(proj.id);
                    for(let fproj of followProj){
                        if(fproj.id == proj.id) {
                            favourites = imageFollowProject(proj.id);
                        }
                    }
                    this.appContainer.innerHTML = projectPageFinanziatore(proj.id,proj.titolo,proj.descrizione,proj.autore,proj.categoria,totalDonations,proj.immagine,favourites);    
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
                payment.forEach((paym) => {
                    pay.push(paym.id_doc);
                })

                if(this.user == 'undefined') {
                    documents.forEach((doc) => {
                        let symbol = "€";
                        if(doc.costo==0) {
                            doc.costo = "Gratis";
                            symbol = "";
                        }
                        document.getElementById('documents-table').innerHTML += createListOfDocuments(doc.id_documento,doc.titolo,doc.descrizione,doc.data,doc.costo,symbol,"","","","",ruolo);
                    })
                }else {
                        //Documenti
                        let basket = "";
                        let heart = "";
                        let modify = "";
                        documents.forEach(async(doc) => {
                            if(doc.id_progetto == id){
                                if(pay.includes(doc.id_documento)){
                                    let shop = buyedDoc();
                                    let value = doc.costo;
                                    let symbol = "€"
                                    basket = "";
                                    modify = "";
                                    if(await this.verifyUserByProjectID(this.user,localStorage.getItem('idProject')) === true) {
                                        basket = deleteDocumentButton(doc.id_documento);
                                        modify = formDoc();
                                    }else {
                                    }
                                    document.getElementById('documents-table').innerHTML += createListOfDocumentsBought(doc.id_documento,doc.titolo,doc.descrizione,doc.data,value,symbol,shop,basket,modify);
                                }else {
                                    let checkFollow = false;
                                    let shop = createCarrello();
                                    let value = doc.costo;
                                    let symbol = "€"
                                    basket = "";
                                    heart = "";
                                    if(doc.costo == 0) {
                                        value = "Gratis";
                                        symbol = "";
                                        shop = "";
                                    }
                                    if(await this.verifyUserByProjectID(this.user,localStorage.getItem('idProject')) === true) {
                                        basket = deleteDocumentButton(doc.id_documento);
                                        modify = formDoc();
                                        
                                    }else {
                                        if(ruolo!=='undefined'){
                                            let ruoloUser = await Api.getInfo(this.user);
                                            if(ruoloUser.ruolo === 'finanziatore') {
                                                heart = HTMLfollowDocument();
                                            }
                                        }
                                    }
                                    for(let follow of followDoc){
                                        if(follow.id_documento == doc.id_documento && this.user == follow.user_email) {
                                            heart = followedDoc();
                                            checkFollow = true;
                                        }
                                    }
                                    document.getElementById('documents-table').innerHTML += createListOfDocuments(doc.id_documento,doc.titolo,doc.descrizione,doc.data,value,symbol,shop,basket,heart,modify,ruolo);
                                }
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
            }
        })
    }

    /**Metodo per creare un progetto
     * 
     * @param {*} user 
     */
    onCreateProjectSubmitted = async(user) =>  {
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
        this.appContainer.innerHTML = '';
        for(let project of projects){
            this.appContainer.innerHTML += createProjectHTML(project.titolo,project.descrizione,project.autore,project.categoria,project.id,project.immagine);
        }
        return projects;
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
            throw(error);
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