"use strict";

const e = require('express');
const sqlite = require('sqlite3');
const db = new sqlite.Database('exams.db',(err) => console.error(err));

exports.getAllCourses = function() {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM course';
        db.all(sql,(err,rows) => {
            if(err) return reject(err);
            if(rows)return resolve(rows);
        })
    })
}

exports.getCourseCode = function(code){
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM course WHERE code=?';
        db.get(sql,[code],(err,row) => {
            if(err) return reject(err);
            if(row) {
                const course = {
                    code : row.code,
                    description : row.name,
                    credits : row.CFU
                };
                resolve(course);
            };
        });
    });
}

exports.getExams = function() {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT course_code,score,date,name,id FROM exam,course WHERE course_code=code';
        db.all(sql,(err,rows) => {
            if(err) reject(err);
            if(rows){
                const exam = rows.map(e => ({
                    code: e.course_code,
                    score: e.score,
                    date: e.date,
                    name: e.name,
                    id: e.id,
                }));
                resolve(exam);
            }
        });
    });
};


exports.getExamsId = function(code){
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM exam WHERE id=?'
        db.get(sql,[code],(err,row) => {
            if(err) reject(err);
            if(row){
                const examId = {
                    code : row.course_code,
                    date : row.date,
                    score : row.score,
                    id : row.id
                }
                resolve(examId);
            }
        })
    })
}

exports.createExam = function(exam) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO exam(course_code, date, score) VALUES (?, DATE(?), ?)';
    db.run(sql, [exam.code, exam.date, exam.score], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

exports.postCourse = function(course) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO course(code, name, CFU) VALUES (?, (?), ?)';
      db.run(sql, [course.code, course.name, course.CFU], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };



exports.deleteExam = function(code) {
    return new Promise((resolve,reject) => {
        const sql = 'DELETE FROM exam WHERE course_code=?'
        db.run(sql,[code],(err) => {
            if(err) reject(err);
            resolve();
        })
    })
};

exports.putExam = function(code,score) {
    return new Promise((resolve,reject) => {
        const sql = 'UPDATE exam SET score=? WHERE course_code=?';
        db.run(sql,[score,code],(err) => {
            if(err) reject(err);
            resolve();
        })
    })
};
