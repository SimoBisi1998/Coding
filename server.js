//INIT
const express = require('express');
const sqlite = require('sqlite3');
const userDb = require('./user-dao.js');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const app = express();
app.use(cors());

const port = 5000;

app.use(express.json());

//config env file 
dotenv.config();


//Genero jwt e lo salvo nell'environment
function generateAccessToken(username) {
    return jwt.sign((username),(process.env.TOKEN_SECRET));
}

//POST /signup per effettuare la subscription al servizio, generando e restituendo il token all'utente
app.post('/signup',(req,res) => {
    const token = generateAccessToken(req.body.username);
    userDb.insertUtente(req.body.username,req.body.password)
    .then(() => res.json(token))
    .catch(() => res.status(404).end());
})

//POST /login dove verifico se già registrato, se si restituisco il token all'utente
app.post('/login',(req,res) => {
    userDb.getUsersAlreadyRegistered(req.body.username,req.body.password)
    .then(() => {
        //Entro nel then solo se esiste l'utente con quelle credenziali
        const token = generateAccessToken(req.body.username);
        userDb.getUserIdByEmail(req.body.username)
        .then((userId) => {
            userId = userId['id_utente'];
            //Rispondo con un pacchetto formato dal token e dall'id dell'utente
            const packet = {
                token,
                userId
            }
            res.status(201).json(packet)
        })
        .catch(() => res.status(403).json({msg : "Not authenticated."}))
    })
    .catch(() => res.status(403).json({msg : "Not logged in."}).end())
})

//Funzione che mi permette di autenticare il token inviato dal client al server
function authenticateToken(req,res,next){
    const token = req.headers['authorization'];
    //Se null or undefined allora l'utente non ha il permesso
    if(token===null || token==undefined) return res.status(401).send("Permission denied.")
    jwt.verify(token,process.env.TOKEN_SECRET,(err,user) => {
        if(err) return res.status(403);
        req.user = user;
        next();
    });
}

//GET /ping per effettuare test se il server pinga o meno
app.get('/ping',(req,res) => {
    res.send("arrivederci");
})

//POST /contacts/:id per inserire l'utente nel db, dopo averlo autenticato
app.post('/contacts/:id',authenticateToken,(req,res) => {
    userDb.insertUser(req.body.contatto,req.params.id)
    .then(() => res.status(200).send("Insert OK").end())
    .catch(() => res.status(404).end());
})

//GET /alluser/:id per ritornare la lista completa dei contatti di un particolare utente
app.get('/alluser/:id',authenticateToken,(req,res) => {
    userDb.getAllUser(req.params.id)
    .then((contacts) => res.status(200).send(contacts))
    .catch((error) => res.status(404).json({msg : error}).end())
})

//DELETE di un contatto tramite l'id nel body dato un certo id_user passato nella richiesta
app.delete('/delete/:id',authenticateToken,(req,res) => {
    userDb.deleteUser(req.body.id,req.params.id)
    .then(() => res.status(200).json({msg : "delete OK"}).end())
    .catch(() => res.status(404).end())
})

//PUT /modify/:id per aggiornare i dati di un contatto preesistente
app.put('/modify/:id',authenticateToken,(req,res) => {
    userDb.modifyUser(req.body.contatto,req.body.loggedUserId,req.params.id)
    .then(() => res.status(200).end())
    .catch((error) => res.status(404).json({msg : error}))
})

//POST /searchuser/:id per restituire un contatto al client verificandone la presenza nella lista
app.post('/searchuser/:id',authenticateToken,(req,res) => {
    userDb.getContact(req.body.value,req.params.id)
    .then((result) => res.status(200).json(result))
    .catch(() => res.status(503).json({msg : "contact not found"}))
})



app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

