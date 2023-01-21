"use strict";

//init
const express = require('express');
const morgan = require('morgan');
const db = require('./dao.js');
const {check, validationResult} = require('express-validator'); // validation middleware

//definition of app and port
const app = express();
const port = 3000;

//middleware
app.use(morgan('tiny'));
app.use(express.json());
// === REST API (course, exam) === //


//set up the 'public' component as a static website
app.use(express.static('public'));
app.get('/',(req,res) => res.redirect('/index.html'));

// GET /courses
// Get all courses
// Request body: empty
// Response body: array of objects representing all the courses

app.get('/courses',(req,res) => {
    db.getAllCourses()
    .then((courses) => res.json(courses))
    .catch(() => res.status(500).end());
});

// GET /courses/:code
// Get a course, given its code
// Request body: empty
// Example: GET /courses/MF0158
// Response body: { "code": "MF0158", "name": "Basi di dati e sistemi informativi", "CFU": 9 }
// Error: 404, {"error": "Course not found."}
app.get('/courses/:code',(req,res) => {
    const code = req.params.code;
    db.getCourseCode(code)
    .then((row) => res.json(row))
    .catch(() => res.status(500).end);
})

///GET /exams
app.get('/exams',(req,res) => {
    db.getExams()
    .then((exams) => res.json(exams))
    .catch(() => res.status(500).end());
})

//GET /exams/:id
app.get('/exams/:id',(req,res) => {
    db.getExamsId(req.params.id)
    .then((exam) => res.json(exam))
    .catch(() => res.status(404).end());
})

//POST /exams
app.post('/exams', [
    check('score').isInt({min: 18, max: 30}),
    check('code').isLength({min: 5, max: 6}),
  ], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const exam = {
      code: req.body.code,
      score: req.body.score,
      date: req.body.date,
    };
    db.createExam(exam)
    .then((result) => res.status(201).header('Location', `/exams/${result}`).end())
    .catch((err) => res.status(503).json({ error: 'Database error during the creation'}));
  });

//DELETE /exams/:code
app.delete('/exams/:code',(req,res) => {
    db.deleteExam(req.params.code)
    .then(() => res.status(200).end())
    .catch(() => res.status(503).end())
});

//PUT /exams/:code
app.put('/exams/:code',(req,res) => {
    db.putExam(req.body.code,req.body.score)
    .then(() => res.status(200).end())
    .catch(() => res.status(503).end())
});

//POST /courses
app.post('/courses', (req, res) => {
    const course = {
      code: req.body.code,
      name: req.body.name,
      CFU: req.body.CFU
    };
    db.postCourse(course)
    .then((result) => res.status(201).header('Location', `/courses/${result}`).end())
    .catch((err) => res.status(503).json({ error: 'Database error during the creation'}));
  });

//server listening
app.listen(port,() => console.log(`Server listening at https://localhost:${port}`));