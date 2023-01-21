//init
const { application } = require('express');
const express = require('express');
const morgan = require('morgan');
const sqlite = require('sqlite3');

const app = express();
const port = 3000;
const db = new sqlite.Database('exams.db',(err) => console.error(err));

//set up the middleware
app.use(morgan('tiny'));
app.use(express.json());



//GET default
app.get('/',(req,res) => res.send("bella zio"));

//routes..(resources => courses,exams)
//GET /courses
//Recuperare tutti i corsi
//Request body: vuoto
//Response body: "courses" = [
//{ "code : xxxx","name" : "Basi di dati e Sistemi informativi", "CFU" : 9 }
// {...},ecc
// ]

app.get('/courses',(req,res) => {
    //read from database
    const sql = 'SELECT * FROM course';
    db.all(sql,(err,rows) => {
        if(err) throw(err);
        res.json(rows);

        /*Esempio di come mappare una row su un nuovo oggetto e stamparlo con la console.log
        const courses = rows.map((row) => ({
            code : row.code,
            description : row.name,
            credits : row.CFU
        }));

        console.log(courses);
        res.json(courses);
        */


        /*Another example
        const courses = row.map((row) => row.code));
        */
    });
});


//GET /courses/id
//Recuperare un corso (codice come identificativo)
//Request body: vuoto
//Response: //{ "code : xxxx","name" : "Basi di dati e Sistemi informativi", "CFU" : 9 }
//Error: 404 {"error" : "il corso non esiste"}

app.get('/courses/:code',(req,res) => {
    const courseCode = req.params.code;
    const sql = 'SELECT * FROM course WHERE code=?';

    db.get(sql,[courseCode],(err,row) => {
        if(err) throw err;
        if(row)
            res.json({code: row.code, name: row.name, credtis: row.CFU});
        else
            res.status(404).json({error : "Il corso non esiste"});
    });
});


//GET /exams
//Recuperare tutti i nostri esami
app.get('/exams',(req,res) => {
    const sql = 'SELECT * FROM exam';
    db.all(sql,(err,rows) => {
        if(err) throw(err)
        if(rows) res.json(rows);
    })
})

//GET /exams/:id
//Recuperare un singolo esame

app.get('/exams/:id',(req,res) => {
    const idExam = req.params.id;
    const sql = 'SELECT * FROM exam WHERE id=?';
    db.get(sql,[idExam],(err,row) => {
        if(err) throw(err);
        if(row) res.json(row);
    })
})

//POST /exams
//Aggiungere/creare un nuovo esame
//Request body: { "code : xxxx","score" : "29", "date" : "2020-02-16"}
//Response body: vuoto

app.post('/exams',(req,res) => {
    const code = req.body.code;
    const score = req.body.score;
    const date = req.body.date;

    const sql = 'INSERT INTO exam(course_code, date, score) VALUES(?, DATE(?), ?)';

    db.run(sql,[code,date,score],(err) => {
        if(err) throw err;

        res.end();
    });
});


// DELETE /exams/:id
//Cancellare un esame
//Request body: vuoto

app.delete('/exams/:id',(req,res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM exam WHERE id=?';

    db.run(sql,[id],(err) => {
        if(err) throw(err);
        res.end();
    });
});

//PUT /exams/:id esso aggiorna un intera risorsa e non solo una parte, quindi devo per forza passare tutti gli argomenti
//Aggiornare un esame sostenuto
//Request body: { "code : xxxx","score" : "29", "date" : "2020-02-16"}
//Response body: vuoto

app.put('/exams/:id',(req,res) => {
    const code = req.body.code;
    const score = req.body.score;
    const sql = 'UPDATE exam SET score=? WHERE course_code=?';
    
    db.run(sql,[score,code],(err)=> {
        if(err) throw(err);
        res.end();
    })

})


//server listening 
app.listen(port,() => console.log(`Server listening at http://localhost:${port}`));

