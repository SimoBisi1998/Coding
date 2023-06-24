//start server from de correct folder (server folder) to access the env variables
//init
const express = require("express");
const sqlite = require("sqlite3");
const cors = require("cors");
const port = 5000;
const querystring = require('querystring');
const https = require('https');
const request = require('request');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userdb = require("./userdb.js");

//config dotenv
dotenv.config({path:'.env'});

//assign the instance of a express
const app = express();

//other assignment
app.use(cors());
app.use(express.json());

function generateJsonWebToken(username) {
  return jwt.sign((username),(process.env.TOKEN_SECRET));
}


app.post('/showstatus',(req,res) => {
    res.send("Message arrived")
    let response = JSON.stringify(req.body);

    fs.writeFile("./response.txt",response,function(err) {
        if(err) return console.log(err);
    })
    
});


app.get('/readstatus/:id_paziente',(req,res) => {
  let responseJson = "";
  request.get(
    {
    url:`http://localhost:8080/getpaziente/${req.params.id_paziente}`,
    headers: {
        'Content-Type': 'application/json'
    }
    },
  function(error, response, body){
    res.send(body);
  });
    /*fs.readFile('./response.txt',{ encoding: 'utf8' },function(err,data) {
        if(data!=null){
            res.send(data).end();
        }
    });*/
});

app.post("/patient/getstatus",(req,res) => {
  res.send("ok").end();
  
})

app.post('/login',(req,res) => {
  userdb.verifyUsername(req.body.username)
  .then((row) => {
    let firstQuery = row;
    userdb.getUserFromDB(req.body.username,req.body.password)
    .then(() => {
      const token = generateJsonWebToken(req.body.username);
      const packet = {
        token : token,
        username : req.body.username,
        reparto : firstQuery["reparto"]
      }
      res.send(packet);
    })
    .catch(() => res.status(401).json({msg : "Not authenticated."}))
  })
  .catch(() => res.status(403).json({msg : "Not logged in."}).end())
});


app.post('/newpaziente',(req,res) => {
  let nome = req.body.nome;
  let cognome = req.body.cognome;
  let telefono = req.body.telefono;
  let reparto = req.body.reparto;

  let json = {
    nome : req.body.nome,
    cognome : req.body.cognome,
    telefono : req.body.telefono,
    reparto : req.body.reparto
  }

  if(req.body!=null){
    request.post({
      url : "http://localhost:8080/newpaziente",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(json)
    })
  }
})

app.get('/readnewpatient',(req,res) => {
  fs.readFile('./newpatient.txt',{ encoding: 'utf8' },function(err,data) {
    if(data!=null){
        res.send(data).end();
    }
});
})


app.get('/getpatient',(req,res) => {
  userdb.getAllPatient()
  .then((rows) => {
    if(rows!=undefined) res.send(rows).status(203).end();
  })
  .catch(() => {
    //res.sendStatus(404).json({msg : "Not found any patient"}).end()
  })
})


    /* rules for send file
    res.setHeader("Content-Disposition", "attachment; response.json");
    res.download('./response.json');
    */

app.get('/ping',(req,res) => {
    res.send("Success");
});

async function provaGet () {
  let stringa = "ciao";
  request.get(
    {
    url:'http://localhost:8080/index',
    json: {
      ciao : "value",
        },
    headers: {
        'Content-Type': 'application/json'
    }
    },
  function(error, response, body){
    // console.log(error);
    // console.log(response);
    console.log(body);
  });
}


app.post('/springboot',(req,res) => {
  console.log("weee")
  res.setHeader("Content-Type", "application/json");
  res.send("ricevutoooo");
})





/*https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(8443, () => {
    console.log(`Server listening at https://localhost:${port}`);
  });
*/



//server starting
app.listen(port,() => console.log(`Server listening at http://localhost:${port}`));