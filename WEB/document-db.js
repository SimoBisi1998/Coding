"use strict";

const db = require('./db.js');

exports.postDocument = async(doc) => {
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO documento(id_progetto,titolo,descrizione,data,costo) VALUES (?,?,?,?,?)';
        db.run(sql,[doc.project,doc.titolo,doc.descrizione,doc.data,doc.costo],function (err){
            if(err) reject(err);
            resolve(this.lastID);
        })
    })
}

exports.getDocs = async() => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM documento ORDER BY data DESC';
        db.all(sql,(err,rows) => {
            if(err) reject(err);
            resolve(rows);
        })
    })
}

exports.insertBuyDocument = async(idDocument,payment) => {

    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO pagamento(id_pagamento,id_doc,nome,cognome,tipo,numero,CCV) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.run(sql,[payment.id,idDocument,payment.nome,payment.cognome,payment.tipo,payment.numero,payment.CCV],(err) => {
            if(err) reject(err);
            resolve(this.lastID);
        })
    })
}

exports.getPaymentDocument = async() => {
    return new Promise((resolve,reject) => {
        const sql = "SELECT * FROM pagamento";
        db.all(sql,(err,rows) => {
            if(err)reject(err);
            resolve(rows);
        })
    })
}

exports.deleteDocumentByID = async(idDocument) => {
    return new Promise((resolve,reject) => {
        const sql = 'DELETE FROM documento WHERE id_documento=?';
        db.run(sql,[idDocument],(err) => {
            if(err) reject(err);
            resolve();
        })
    }).then(() => {
        this.deletePaymentByDocID(idDocument);
    })
}

exports.deletePaymentByDocID = async(idDocument) => {
    console.log(idDocument);
    return new Promise((resolve,reject) => {
        const sequel = 'DELETE FROM pagamento WHERE id_doc=?';
        db.run(sequel,[idDocument],(err) => {
            if(err) reject(err);
            resolve();
        })
    })
}

exports.followDoc = async(idDocument,user) => {
    return new Promise((resolve,reject) => {
        const sql = "INSERT INTO preferiti(id_documento,user_email) VALUES (?, ?)";
        db.run(sql,[idDocument,user],function(err) {
            if(err)reject(err);
            resolve(this.lastID);
        })
    })
}

exports.getFollowDoc = async() => {
    return new Promise((resolve,reject) => {
        const sql = "SELECT * FROM preferiti";
        db.all(sql,(err,rows) => {
            if(err) reject(err);
            resolve(rows);
        })
    })
}

exports.removeFollowDoc = async(idDocument) => {
    return new Promise((resolve,reject) => {
        const sql = "DELETE FROM preferiti WHERE id_documento=?";
        db.run(sql,[idDocument],(err)=> {
            if(err) reject(err);
            resolve();
        })
    })
}

exports.postComment = async(commento) => {
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO commento(id_user,id_documento,testo) VALUES (?,?,?)';
        db.run(sql,[commento.user,commento.id_documento,commento.text],function (err) {
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