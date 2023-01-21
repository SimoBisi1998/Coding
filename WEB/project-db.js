"use strict";

const db = require('./db.js');

exports.createProject = function(project) {
    return new Promise((resolve,reject) => {
        const sql = 'INSERT or REPLACE INTO progetto(id_user,titolo,descrizione,autore,categoria) VALUES (?, ?, ?, ?, ?)';
        db.run(sql,[project.id_user,project.titolo,project.descrizione,project.autore,project.categoria],function (err) {
            if(err)reject(err);
            resolve(this.lastID);
        })
    })
}

exports.getProjects = () => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM progetto';
        db.all(sql,(err,rows) => {
            if(err) reject(err);
            resolve(rows);
        })
    })
}

exports.selectProjectID = (id) => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM progetto WHERE id=?';
        db.get(sql,[id],(err,row) => {
            if(err) reject(err);
            const project = {
                titolo : row.titolo,
                descrizione : row.descrizione,
                autore : row.autore,
                categoria : row.categoria,
                id : row.id
            };
            resolve(project);
        })
    })
}

exports.postFollowProject = (idProject,username) => {
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO follow(id_progetto,user_email) VALUES (?,?)';
        db.run(sql,[idProject,username],(err) => {
            if(err) reject(err);
            resolve();
        })
    })
}

exports.getFollowProject = () => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM follow';
        db.all(sql,(err,rows) => {
            if(err)reject(err);
            if(rows)resolve(rows);
        })
    })
}

exports.removeFollowProject = (idProject) => {
    return new Promise((resolve,reject) => {
        const sql = 'DELETE FROM follow WHERE id_progetto=?';
        db.run(sql,[idProject],(err) => {
            if(err) reject(err);
            resolve();
        })
    })
}


exports.modifyProject = (project,idProject) => {
    return new Promise((resolve,reject) => {
        const sql = 'UPDATE progetto SET titolo=?,descrizione=?,autore=?,categoria=? WHERE id=?';
        db.run(sql,[project.titolo,project.descrizione,project.autore,project.categoria,idProject],(err) => {
            if(err) reject(err);
        })
        resolve();
    })
}

exports.deleteProject = async(idProject) => {
    return new Promise((resolve,reject) => {
        const sql = 'DELETE FROM progetto WHERE id=?';
        db.run(sql,[idProject],(err) => {
            if(err)reject(err);
            resolve();
        })
    }).then(() => {
        this.deleteAllDocuments(idProject);
    }).catch();
}

exports.deleteAllDocuments = async(idProject) => {
    return new Promise((resolve,reject) => {
        const sql = "DELETE FROM documento WHERE id_progetto=?";
        db.run(sql,[idProject],(err) => {
            if(err) reject(err);
            resolve();
        })
    })
}

exports.postDonation = async(donazione) => {
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO donazione(id_user,id_progetto,tipo,CCV,numero,importo) VALUES (?,?,?,?,?,?)';
        db.run(sql,[donazione.id_user,donazione.id_progetto,donazione.tipo,donazione.CCV,donazione.numero,donazione.importo],(err) => {
            if(err) reject(err);
            resolve(this.lastID);
        })
    })
}

exports.getDonations = async() => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT id_progetto,id_user,importo FROM donazione';
        db.all(sql,(err,rows) => {
            if(err) reject(err);
            resolve(rows);
        })
    })
}

exports.postComment = async(commento) => {
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO commento(id_user,id_progetto,testo) VALUES (?,?,?)';
        db.run(sql,[commento.user,commento.project,commento.text],function (err) {
            if(err) reject(err);
            resolve(this.lastID);
        })
    })
}

exports.getComments = async() => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM commento';
        db.all(sql,(err,rows) => {
            if(err) reject(err);
            resolve(rows);
        })
    })
}

exports.deleteComment = async(id_commento,user) => {
    return new Promise((resolve,reject) => {
        const sql = 'DELETE FROM commento WHERE id_user=? AND id_commento=?';
        db.run(sql,[user,id_commento],(err) => {
            if(err) reject(err);
            resolve();
        })
    })
}