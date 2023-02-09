'use strict';

// imports
const express = require('express');
const morgan = require('morgan');
const userDb = require('./user-db.js');
const documentDb = require('./document-db.js');
const projectDb = require('./project-db.js');
const path = require('path');
const session = require('express-session');
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy;
const {body,check, validationResult} = require('express-validator');


// init express
const app = express();
const port = 3000;

//middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));

const isLoggedIn = (req,res,next) => {
  if(req.isAuthenticated()) {
    return next();
  }else {
    return res.status(401).json({"statusCode" : 401, "message" : "not authenticated"});
  }
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    userDb.getUser(username, password).then(({user, check}) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!check) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userDb.getUserById(id).then(user => {
    done(null, user);
  });
});

app.use(session({
  //store: new FileStore(), // by default, Passport uses a MemoryStore to keep track of the sessions - if you want to use this, launch nodemon with the option: --ignore sessions/
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session()); //per memorizzare la sessione

//GET /api/users per verificare se un utente è gia registrato e per controllare se è un creatore o un finanziatore
//Request body: vuoto
//Response body: lista di utenti registrati
app.get('/users',(req,res) => {
  userDb.getUsers()
  .then((users) => res.json(users))
  .catch(() => res.status(500).end());
})

//POST /users => uri per effettuare il login
//Request body: username,password
//Response body: vuoto

app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) {
          return res.status(401).json(info);
      }
      req.login(user, function(err) {
        if (err) { return next(err); }
        // req.user contains the authenticated user
        return res.json(req.user.username);
      });
  })(req, res, next);
});

// POST /api/users => creo uri per la registrazione di nuovi utenti
//Request body: username,password
//Response body: vuoto

app.post('/api/users',[
  check('email').notEmpty(),
  check('password').notEmpty(),
  check('nome').notEmpty(),
  check('cognome').notEmpty(),
  check('ruolo').notEmpty()
],
  (req, res) => {
  const error = validationResult(req);
  if(!error.isEmpty()) {
    return res.status(422).json({ error : error.array()});
  }
  const user = {
    email: req.body.email,
    password: req.body.password,
    nome : req.body.nome,
    cognome : req.body.cognome,
    ruolo : req.body.ruolo
  };
  userDb.createUser(user)
  .then((result) => res.status(201).header('Location', `/users/${result}`).end())
  .catch((err) => res.status(503).json({ error: 'Database error during the signup'}));
});

//GET /users/info per ottenere le informazioni riguardante l'utente loggato
//Request body: /
//Response body: oggetto json contenente le informazioni dell'utente (nome,cognome,email,ruolo)

app.get('/users/info', isLoggedIn,(req,res) => {
  userDb.getUsers()
  .then((users) => res.json(users))
  .catch(() => res.status(503).end());
})

app.delete('/api/sessions/current', function(req, res,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(204).end();
  });
});

//POST /api/projects, solo se l'utente è autenticato,questa chiamata crea il progetto passato
//nel body nella richiesta in formato json 
//Request body: oggetto project = {titolo,descrizione,autore,categoria,src}
//Response body: /
app.post("/api/projects",isLoggedIn,(req,res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  projectDb.createProject(req.body.project)
  .then((index) => res.status(201).header('Location',`/project/${index}`).end())
  .catch((err) => res.status(503).json({ error: 'Database error during the POST'}));
})

//GET /project/:id per restituire i dettagli riguardanti il progetto che ha come "id" quello passato come params nella richiesta
//Request body : id_progetto
//Response body : oggetto project{..} in formato json
app.get('/project/:id',(req,res) => {
  projectDb.selectProjectID(req.params.id)
  .then((row) => res.json(row))
  .catch(() => res.status(404).json({msg : "cannot select project ID"}));
})

// GET /projects per ottenere la lista dei progetti inseriti
//Request body: /
//Response body : oggetto result{..} contenente la lista di progetti
app.get('/projects',(req,res) => {
  projectDb.getProjects()
  .then((result) => res.json(result))
  .catch(() => res.status(503).end());
});

//POST /follow per seguire un progetto
//Request body : id del progetto che l'utente sta cercando di seguire,username dell'utente
//Response body : /
app.post('/follow',(req,res) => {
  projectDb.postFollowProject(req.body.idProject,req.body.username)
  .then(() => res.status(201).end())
  .catch(() => res.status(503).json({error : "Project not followed."}));
})

//GET /api/project/follow per ottenere la lista di progetti seguiti dall'utente loggato
//Request body : /
//Response body : lista di progetti 
app.get('/api/project/follow',(req,res) => {
  projectDb.getFollowProject()
  .then((result) => res.json(result))
  .catch((err) => (res.status(503).json(err)));
})

//DELETE /project/follow/:id per per eliminare dai progetti seguiti un determinato progetto
//Request body : id del progetto seguito da eliminare
//Response body : /
app.delete('/project/follow/:id',(req,res) => {
  projectDb.removeFollowProject(req.body.idProject)
  .then(() => res.send())
  .catch(() => res.status(503).json({error : "Not eliminated followed project."}))
})

//PUT /api/project/modify per applicare delle modifiche ad un determinato progetto
//Request body : il nuovo oggetto project con i nuovi campi da inserire, id del progetto da modificare
//Response body : /
app.put('/api/project/modify',(req,res) => {
  projectDb.modifyProject(req.body.project,req.body.idProject)
  .then(() => res.status(201).end())
  .catch(() => res.status(503).json({error : "Project not modified"}))
})

//DELETE /api/project/delete per eliminare un progetto
//Request body : id del progetto da eliminare
//Response body : /
app.delete('/api/project/delete',(req,res) => {
  projectDb.deleteProject(req.body.idProject)
  .then(() => res.send())
  .catch(() => res.status(503).json({error : "Not eliminated project"}));
})

//POST /api/project/donation per effettuare una donazione ad un determinato progetto
//Request body : insieme dei dati relativi alla donazione
//Response body : /
app.post('/api/project/donation',[
  check('numero')
  .isLength(16)
  .withMessage("La lunghezza deve essere di 16 cifre"),
  check('numero')
  .isNumeric()
  .withMessage("Deve contenere solo numeri."),
  check('CCV')
  .isLength(3)
  .withMessage("La lunghezza deve essere di 3 cifre"),
  check('CCV')
  .isNumeric()
  .withMessage("Deve contenere solo numeri")  
],(req,res) => {
  const error = validationResult(req);
  if(!error.isEmpty()) {
    return res.status(422).json({ error : error.array()});
  }

  const donazione = {
    id_user : req.body.user,
    id_progetto : req.body.idProject,
    tipo : req.body.tipo,
    numero : req.body.numero,
    CCV : req.body.CCV,
    importo : req.body.importo
  }

  projectDb.postDonation(donazione)
  .then(() => res.status(201).json({msg : "ok"}).end())
  .catch(() => res.status(503).json({error : 'Donation not made'}));
})

//POST /api/document/comment per inserire un commento relativo ad un documento
//Request body : commento
//Response body : restituisce l'id del commento appena creato
app.post('/api/document/comment',(req,res) => {
  documentDb.postComment(req.body.commento)
  .then((id) => res.status(201).json(id))
  .catch(() => res.status(503).end())
})

//GET /api/document/comment per restituire tutti i commenti di qualsiasi utente relativi ad un documento
//Request body : /
//Response body : lista di commenti relativi a quel documento
app.get('/api/document/comment',(req,res) => {
  documentDb.getComments()
  .then((comments) => res.send(comments))
  .catch(() => res.status(503).json({msg : "Not get comments"}).end())
})

//GET /api/project/donations per restituire le donazioni relative ad un determinato progetto
//Request body : /
//Response body : lista di donazioni
app.get('/api/project/donations',(req,res) => {
  projectDb.getDonations()
  .then((rows) => res.send(rows))
  .catch(() => res.status(503).json({error : "Error get Donations."}).end())
})

//GET /api/project/documents per ottenere la lista di documenti di un progetto
//Request body : /
//Response body : lista di documenti 
app.get('/api/project/documents',(req,res) => {
  documentDb.getDocs()
  .then((documents) => res.json(documents))
  .catch(() => res.status(503).json({msg : "Error during get documents."}));
})

//DELETE /api/comment/delete/:id_commento per eliminare un commento
//Request body : id del commento e la mail dell'utente loggato
//Response body : /
app.delete('/api/comment/delete/:id_commento',(req,res) => {
  documentDb.deleteComment(req.body.id_commento,req.body.user)
  .then(() => res.status(201).json({msg : "Comment removed."}).end())
  .catch(() => res.status(503).json({msg : "Error during the delete of comment."}));
})

//POST api/documents per inserire un nuovo commento
//Request body : documento da inserire
//Response body : l'id del documento appena creato
app.post('/api/documents',(req,res) => {
  documentDb.postDocument(req.body.doc)
  .then((id) => res.status(201).json(id))
  .catch(() => res.status(503).json({msg : "Error during Post Document"}));
})

//POST /api/document/buy/:id_documento per acquistare un documento
//Request body : id del documento e i dati relativi al pagamento
//Response body : /
app.post('/api/document/buy/:id_documento',(req,res)=> {
  documentDb.insertBuyDocument(req.body.idDocument,req.body.payment)
  .then(() => res.status(201).end())
  .catch(() => res.status(503).json({msg : "Error during the insert payment's document"}));
})

//GET /api/document/buy per ottenere la lista di documenti acquistati
//Request body : /
//Response body : lista di documenti 
app.get('/api/document/buy',(req,res)=> {
  documentDb.getPaymentDocument()
  .then((payment) => res.json(payment))
  .catch(() => res.status(503).json({msg : "Error during get payments's document"}));
})

//DELETE /api/document/delete/:id_documento per eliminare un documento
//Request body : id del documento
//Response body : /
app.delete('/api/document/delete/:id_documento',(req,res) => {
  documentDb.deleteDocumentByID(req.body.idDocument)
  .then(() => res.status(200).json({msg : "Document eliminated"}).end())
  .catch(() => res.status(503).json({msg : "Error during delete document"}))
});

//POST /api/document/follow per seguire un particolare documento
//Request body : id del documento, username dell'utente loggato
//Response body : /
app.post('/api/document/follow',(req,res) => {
  documentDb.followDoc(req.body.idDocument,req.body.username)
  .then(() => res.status(201).end())
  .catch(() => res.status(503).json({msg : "Error during follow document."}))
})

app.get('/document/follow',(req,res) => {
  documentDb.getFollowDoc()
  .then((result) => res.json(result).end())
  .catch(() => res.status(503).json({msg : "Error during get document"}))
})

//DELETE /document/remove/follow per togliere il follow da un documento
//Request body : id del documento
//Response body : /
app.delete('/document/remove/follow',(req,res) => {
  documentDb.removeFollowDoc(req.body.idDocument)
  .then(() => res.status(201).end())
  .catch(() => res.status(503).json({msg : "Error during delete the saveddocument"}))
})

//PUT /api/document/comment/update per modificare il testo di un commento
//Request body : testo del commento,id del commento
//Response body : /
app.put('/api/document/comment/update',(req,res) => {
  documentDb.updateComment(req.body.commento,req.body.id_commento)
  .then(() => res.status(201).end())
  .catch(() => res.status(503).json({msg : "Error during modify comment"}))
})

//PUT /api/document/modify per modificare un documento
//Request body : documento modificato
//Response body : /
app.put('/api/document/modify',(req,res) => {
  documentDb.updateDocument(req.body.doc)
  .then(() => res.status(201).end())
  .catch(() => res.status(503).json({msg : "Error during update document"}))
})

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// activate the server
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));