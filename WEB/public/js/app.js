"use strict";

//addModifyButtonn da modificare, in modo tale che se logga l'utente non deve poter vedere il tasto elimina nel progetto che non ha creato. FATTO
//DELETE document FATTO
//follow Document (crea nuova tb su db) FATTO
//cambiare submit modal con click
//controllare on delete cascade
//caricare img per project e file per doc
//Search
//Controlli & commenti
//CSS

import Api from './api.js';
import Project from './project.js';
import Document from './document.js';
import Payment from './payment.js';
import Comment from './comment.js';
import { createFormProject, createNewForm,createProjectHTML,projectPage,projectPageFinanziatore,createFollowProjectTemplate,addModifyButton,
createListOfDonator,createListOfComment,deleteCommentButton ,createListOfDocuments,createExitForm, createCarrello, buyedDoc,createListOfDocumentsBought,
deleteDocumentButton, HTMLfollowDocument,followedDoc,documentPage, createListOfDocumentsPage} from './templates/project-template.js';
import page from '//unpkg.com/page/page.mjs';
import {createRegisterForm,createLoginForm,createLogoutForm,createSideNav} from './templates/login-template.js';
import {createAlert} from './templates/alert-template.js';
import {showAccount} from './templates/account-template.js';
import {createEmptyApp,createDonationMethod, createPaymentDocument} from './templates/app-template.js';


class App {
    constructor(navContainer,appContainer,searchContainer,navLeft) {
        this.appContainer = appContainer;
        this.navContainer = navContainer;
        this.searchContainer = searchContainer;
        this.navLeft = navLeft;
        this.user;
        this.projects;
        
        //copia dell'init per ripristinare correttamente gli oggetti della pagina iniziale
        const copyApp = this.appContainer.innerHTML;
        const copyNavbar = this.navContainer.innerHTML;
        const copySearch = this.searchContainer.innerHTML;

        page('/', async() => {
            this.navContainer.innerHTML = copyNavbar;
            this.appContainer.innerHTML = this.showProject();
            this.searchContainer.innerHTML = copySearch;
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
                let projects = await Project.selectFilter(event,this.user);
                this.showFilteredProjects(projects);
            });
            
            this.projects = await this.showProject();
        });

        page('/signup', async() => {
            appContainer.innerHTML = '';
            navContainer.innerHTML = '';
            this.onRegisterButtonSubmitted();
        });

        page('/login',() => {
            this.appContainer.innerHTML = copyApp;
            this.navContainer.innerHTML = '';
            this.onLoginButtonSubmitted();
        });

        page('/home',() => {
            this.navContainer.innerHTML = '';
            this.appContainer.innerHTML = '';
            this.navContainer.innerHTML = createLogoutForm();
            this.navLeft.innerHTML = createSideNav();
            this.searchContainer.innerHTML = copySearch;
            this.showFollowProject(this.user);
            document.getElementById('my-account').addEventListener('click',() => {
                page('/info');
            });   
            document.getElementById('search-form').addEventListener('submit',async(event) => {
                let projects = await Project.selectFilter(event,this.user);
                this.showFilteredProjects(projects);
            });

            document.getElementById('logout').addEventListener('click',this.onLogoutSubmitted);
        });

        page('/info',() => {
            this.myAccount(this.user);
            this.searchContainer.innerHTML = copySearch;
            document.getElementById('home').addEventListener('click',() => {
                page('/home');
            })
        });

        page('/project', async() => {
            this.searchContainer.innerHTML = copySearch;
            const role = await this.verifyUser(this.user);
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
        });

        page('/project/:id',async(req) => {
            const idProject = req.params.id;
            const role = await this.verifyUser(this.user);

            

            localStorage.setItem('idProject',idProject);
            localStorage.setItem('role',role);
            
            this.searchContainer.innerHTML = '';
            await this.showOneProject(idProject);
            document.getElementById('star-project').addEventListener('click',() => {
                this.followProject(idProject,this.user);
            });

            if(role!=undefined){
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
                    document.getElementById('my-account').addEventListener('click',() => {
                        page('/info');
                    })

                }else{
                    document.getElementById('donation').addEventListener('click',async() => {
                        this.appContainer.innerHTML = '';
                        this.appContainer.innerHTML = createDonationMethod();
                        this.projectDonation(idProject);
                    })
                    document.getElementById('comment-button').addEventListener('click',async (event) => {
                        this.onCommentButtonSubmitted(event,idProject);
                    });
                    document.getElementById('my-account').addEventListener('click',() => {
                        page('/info');
                    })
                }
                document.getElementById('home').addEventListener('click',() => {
                    page('/home');
                });
                document.getElementById('logout').addEventListener('click',this.onLogoutSubmitted); 
            }
        })

        //Route per togliere il follow da un progetto
        //una volta cliccato sull'id del project(svg checked), verrà richiamata questa route a cui passo l'id del progetto che è stato selezionato
        //infine faccio un redirect su '/home' per effettuare la stampa nuovamente dei progetti followed rimasti.
        page('/project/follow/:id',async(req) => {
            await this.removeFollowProject(req.params.id);
        })

        page('/api/project/delete/:id_commento',(req) => {
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

        page('/api/document/:id_documento',(req) => {
            this.showDocumentPage(req.params.id_documento);
        })

        page();
    }

    showDocumentPage = async(docID) =>{
       this.appContainer.innerHTML = documentPage();
       let doc_info = await Api.getDocuments();
       for(let doc of doc_info) {
            if(doc.id_documento == docID) {
                document.getElementById('documents-table-page').innerHTML = createListOfDocumentsPage(doc.titolo,doc.descrizione,doc.data);
            }
       }
    }

    followDocument = async(docID,user) => {
        let alertMessage = document.getElementById('alert-message');
        let res = await Api.getFollowDoc();
        try {
            for(let follow of res) {
                if(follow.id_documento == docID && follow.user_email === user) {
                    document.getElementById('full-heart').innerHTML = HTMLfollowDocument();
                    await Api.removeFollowDoc(docID);
                    alertMessage.innerHTML = createAlert('success','Documento tolto dai preferiti correttamente!');
                    setTimeout(() => {
                        alertMessage.innerHTML = '';
                    },2000);
                    history.back();
                    return;
                }
            }
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

    deleteDocumentByID = async(docID) => {
        let alertMessage = document.getElementById('alert-message');
        try {
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

    //Verifico che il progetto corrente sia effettivamente stato creato dallo user loggato in questo momento
    //Cont indica che nel caso in cui non fosse effettivamente l'utente loggato a visionare il progetto di un altro, ritorna check prima di
    //rimuovere la remove,altrimenti troverebbe la getElementByID==null poichè i due bottoni sono già stati eliminati in precendenza
    //se cont==0 vuol dire che sono già stati eliminati
    verifyUserByProjectID = async(user,idProject) => {
        let cont = 0;
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
                cont++;
                return check;
            }
        }if(!check && modProj!=null && deleteProj!=null) {
            alert(cont);
            document.getElementById('modifica-progetto').remove();
            document.getElementById('elimina-progetto').remove();
        }
        return check;
    }

    buyDocument(idDocument) {
        document.getElementById('payment-document').addEventListener('submit',async(event) => {
            event.preventDefault();
            const paymentForm = document.getElementById('payment-document');
            const alertMessage = document.getElementById('alert-message');
            try {
                let payment = new Payment(paymentForm.nome.value,paymentForm.cognome.value,paymentForm.tipo.value,paymentForm.numero.value,paymentForm.CCV.value);
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
    
    createDoc = async(idProject) => {
        const alertMessage = document.getElementById('alert-message');

        const value = document.getElementById('defaultCheck');
        const element = document.getElementById('input-box');
        const command = document.getElementById('command-form');
        command.innerHTML = createExitForm();
        document.getElementById('submit-doc').addEventListener('click',async(event) => {
            event.preventDefault();
            try {
                let docForm = document.getElementById('document-form');
                const title = docForm.elements['form-title'].value;
                const description = docForm.elements['form-description'].value;
                const date = docForm.elements['form-date'].value;
                let costo = docForm.elements['form-cost'].value;

                const doc = new Document(title,description,date,costo,idProject);
                
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

    showDocuments = async(doc,docID)=>{
        const documentsTable = document.querySelector('#documents-table');


        //se l'utente non è loggato
        if(this.user == undefined) {
            const documents = createListOfDocumentsBought(docID,doc.titolo,doc.descrizione,doc.data,doc.costo,"","","");
            documentsTable.insertAdjacentHTML('beforeend',documents);
        }
        else {
            //GET dei documenti acquistati
        let payment = await Api.getPayment();

        let pay = [];
        payment.forEach((paym) => {
            pay.push(paym.id_doc);
        })

        let basket = "";
        if(pay.includes(doc.id)){
            let shop = buyedDoc();
            let value = doc.costo;
            let symbol = "€"
            basket = "";
            if(await this.verifyUserByProjectID(this.user,localStorage.getItem('idProject')) === true) {
                basket = deleteDocumentButton();
            }
            const documents = createListOfDocumentsBought(docID,doc.titolo,doc.descrizione,doc.data,value,symbol,shop,basket);
            documentsTable.insertAdjacentHTML('beforeend',documents);
        }else {
            let shop = createCarrello();
            let value = doc.costo;
            let symbol = "€"
            basket = "";
            if(doc.costo == 0) {
                value = "Gratis";
                symbol = "";
                shop = "";
            }
            if(await this.verifyUserByProjectID(this.user,localStorage.getItem('idProject')) === true) {
                basket = deleteDocumentButton();
            }
            const documents = createListOfDocuments(docID,doc.titolo,doc.descrizione,doc.data,value,symbol,shop,basket);
            documentsTable.insertAdjacentHTML('beforeend',documents);
            }
        }
    }
    
    removeComment = async(id_commento,user) => {
        let alertMessage = document.getElementById('alert-message');
        try {
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

    onCommentButtonSubmitted = async(event,idProject) => {
        event.preventDefault();
        const commentForm = document.getElementById('comment-form');
        const alertMessage = document.getElementById('alert-message');
        try {
            let comment = new Comment(this.user,idProject,commentForm.comment.value);
            let idComment = await Api.postComment(comment);
            alertMessage.innerHTML = createAlert('success','Commento postato con successo!');
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },3000);
            commentForm.reset();
            this.showAllComment(comment,idComment);
        }catch(error) {
            alertMessage.innerHTML = createAlert('danger','Commento non postato.');
            setTimeout(() => {
                alertMessage.innerHTML = '';
            },3000);
        }
    }
    showAllComment = async(commento,idComment) => {
        if(commento.user == this.user) {
            const commentsTable = document.querySelector('#comments-table');
            const com = deleteCommentButton(idComment, commento.text)
            commentsTable.insertAdjacentHTML('beforeend', com);
        }else {
            const commentsTable = document.querySelector('#comments-table');
            const com = createListOfComment(commento.text, commento.user)
            commentsTable.insertAdjacentHTML('beforeend', com);
        }
    }

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
        document.getElementById('donation-form').addEventListener('submit',async(event) => {
            event.preventDefault();
            const donationForm = document.getElementById('donation-form');
            const alertMessage = document.getElementById('alert-message');
            try {
                await Api.projectDonation(this.user,idProject,donationForm.nome.value,donationForm.cognome.value,donationForm.tipo.value,donationForm.numero.value,donationForm.CCV.value,donationForm.importo.value);
                alertMessage.innerHTML = createAlert('success','Donazione avvenuta con successo!');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);
                //history.back();
                await this.showOneProject(idProject);
            }catch(error) {
                alertMessage.innerHTML = createAlert('danger','Donazione non avvenuta!');
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                },3000);
                throw error;
            }
        })
    }


    deleteProject = async(idProject) => {
        await Api.deleteProject(idProject);
        page('/home');
    }

    modifyProject(idProject) {
        document.getElementById('modify-button').addEventListener('click',async(event) => {
            event.preventDefault();
            const alert = document.getElementById('alert-message');
            const modifyForm = document.getElementById('modify-form');

            const title = modifyForm.elements['mod-title'].value;
            const description = modifyForm.elements['mod-description'].value;
            const author = modifyForm.elements['mod-author'].value;
            const category = modifyForm.elements['mod-category'].value;

            const project = new Project(title,description,author,category);
            
            console.log("bella");
            const result = await Api.modifyProject(project,idProject);
            modifyForm.reset();
            document.getElementById('close-modal').click();
            try {
                alert.innerHTML = createAlert('success',`Il progetto è stato modificato correttamente!`);
                setTimeout(() => {
                    alert.innerHTML = '';
                },3000);
            }catch(error) {
                alert.innerHTML = createAlert('danger',`Il progetto non è stato modificato correttamente.`);
                setTimeout(() => {
                    alert.innerHTML = '';
                },3000);
                throw(error);
            }
        })
    }

    showFollowProject = async(user) => {
        let followProjects = await Api.getFollowProject(user);
        if(followProjects.length === 0) {
            this.appContainer.innerHTML = createEmptyApp();
            return;
        }
        this.appContainer.innerHTML = '';
        for(let project of followProjects) {
            this.appContainer.innerHTML += createFollowProjectTemplate(project.titolo,project.descrizione,project.autore,project.categoria,project.id);
        }

    }

    followProject = async(idProject,username) =>  {
        try {
            await Api.postFollowProject(idProject,username);
            this.showAlertMessage('success');
        }catch(error) {
            this.showAlertMessage('danger');
        }
    }

    removeFollowProject = async(idProject) => {
        try {
            await Api.removeThisProject(idProject);
            page.redirect('/home');
        }catch(error){
            throw error;
        }
    }

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

    //Pagina dedicata all'intero progetto
    //Per ogni progetto associo al suo id, il totale delle donazioni che verranno mostrate.
    showOneProject = async(id) => {
        
        let totalDonations = 0;
        let arrayUser = [];
         //GET documents
         let documents = await Api.getDocuments();

         //GET delle donazioni totali sul progetto proj.id
         let sum = await Api.getDonations();

         //GET dei commenti per quel progetto proj.id
         let comment = await Api.getComments();

         //GET dei documenti acquistati
         let payment = await Api.getPayment();

         //GET dei documenti seguiti
         let followDoc = await Api.getFollowDoc();


        let projects = await this.showProject();

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

                if(ruolo || ruolo===undefined) {
                    this.appContainer.innerHTML = projectPage(proj.titolo,proj.descrizione,proj.autore,proj.categoria,totalDonations,arrayUser);
                }else if(ruolo===false){
                    this.appContainer.innerHTML = projectPageFinanziatore(proj.titolo,proj.descrizione,proj.autore,proj.categoria,totalDonations,arrayUser);    
                }
                //per ogni utente nell'array, creo una nuova tupla <li> nella funzione createListDonator,andando a riempire la lista dei donatori 
                arrayUser.forEach((user) => {
                    document.getElementById('list-donator').innerHTML += createListOfDonator(user);
                })

                let pay = [];
                payment.forEach((paym) => {
                    pay.push(paym.id_doc);
                })

                if(this.user == undefined) {
                    documents.forEach((doc) => {
                        let symbol = "€";
                        if(doc.costo==0) {
                            doc.costo = "Gratis";
                            symbol = "";
                        }
                        document.getElementById('documents-table').innerHTML += createListOfDocuments(doc.id_documento,doc.titolo,doc.descrizione,doc.data,doc.costo,symbol,"","");
                    })
                }else {
                        //Documenti
                        let basket = "";
                        let heart = "";
                        documents.forEach(async(doc) => {
                            if(doc.id_progetto == id){
                                if(pay.includes(doc.id_documento)){
                                    let shop = buyedDoc();
                                    let value = doc.costo;
                                    let symbol = "€"
                                    basket = "";
                                    if(await this.verifyUserByProjectID(this.user,localStorage.getItem('idProject')) === true) {
                                        basket = deleteDocumentButton();
                                    }else {
                                    }
                                    document.getElementById('documents-table').innerHTML += createListOfDocumentsBought(doc.id_documento,doc.titolo,doc.descrizione,doc.data,value,symbol,shop,basket);
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
                                        basket = deleteDocumentButton();
                                    }else {
                                        let ruoloUser = await Api.getInfo(this.user);
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
                                    document.getElementById('documents-table').innerHTML += createListOfDocuments(doc.id_documento,doc.titolo,doc.descrizione,doc.data,value,symbol,shop,basket,heart);
                                    
                                }
                            }   
                        })
                }
                

                //Commenti
                comment.forEach((commento) => {
                    if(commento.id_progetto == id && commento.id_user == this.user) {
                        const commentsTable = document.querySelector('#comments-table');
                        const com = deleteCommentButton(commento.id_commento, commento.testo)
                        commentsTable.insertAdjacentHTML('beforeend', com);
                    }
                    else if(commento.id_user != this.user && commento.id_progetto == id) {
                        const commentsTable = document.querySelector('#comments-table');
                        const com = createListOfComment(commento.testo, commento.id_user)
                        commentsTable.insertAdjacentHTML('beforeend', com);
                    }
                })
                
            }
        }
    }

    verifyUser = async(user) => {
        if(user === undefined) {
            return undefined;
        }
        let check = false;
        const utente = await Api.verifyUser(user);
        if(utente!==user){
            return check;
        }else {
            return check=true;
        }
    }

    onRegisterButtonSubmitted = async() =>  {
        
        this.appContainer.innerHTML = createRegisterForm();
        document.getElementById('signup-form').addEventListener('submit',async (event) => {
            event.preventDefault();
            const form = event.target;
            const alert = document.getElementById('alert-message');
            let ruolo = "creatore";
            let value = document.getElementById('defaultCheck');
            if(value.checked) ruolo = "finanziatore";
            try {
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

    onLoginButtonSubmitted() {
        this.navContainer.innerHTML = createLoginForm();
        document.getElementById('login-form').addEventListener('submit',async(event) => {
            event.preventDefault();
            const form = event.target;
            const alert = document.getElementById('alert-message');
            try {
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

    onCreateProjectSubmitted = async(user) =>  {
        //creare banner e correggere che apre comunque il form
                    document.getElementById('add-form').addEventListener('submit',async(event) => {
                        event.preventDefault();
                        const alert = document.getElementById('alert-message');
                        const addForm = document.getElementById('add-form');
            
                        const title = addForm.elements['form-title'].value;
                        const description = addForm.elements['form-description'].value;
                        const author = addForm.elements['form-author'].value;
                        const category = addForm.elements['form-category'].value;
            
                        //ritorna undefined
                        let userID = await Api.verifyRegister(user)

                        console.log(userID);
                        const project = new Project(userID,title,description,author,category);
                        
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

    showProject = async() => {
        const projects = await Api.getProjects();
        this.appContainer.innerHTML = '';
        for(let project of projects){
            this.appContainer.innerHTML += createProjectHTML(project.titolo,project.descrizione,project.autore,project.categoria,project.id);
        }
        return projects;
    }
    
    myAccount = async(user) => {
        try {
            const info = await Api.getInfo(user);
            this.searchContainer.innerHTML = showAccount(info.nome,info.cognome,info.email,info.ruolo);
            this.appContainer.innerHTML = '';
        }catch(error){
            throw(error);
        }
    }

    onLogoutSubmitted = async() => {
        await Api.doLogout();
        page.redirect('/');
    }

    showFilteredProjects(projects) {
        this.appContainer.innerHTML = '';
        projects.forEach((proj) => {
            this.appContainer.innerHTML += createProjectHTML(proj.titolo,proj.descrizione,proj.autore,proj.categoria);
        })
    }
}


export default App;