"use strict";

const db = require('./db.js');

exports.postDocument = async(doc) => {
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO documento(id_progetto,titolo,descrizione,data,costo,id_user,src) VALUES (?,?,?,?,?,?,?)';
        db.run(sql,[doc.project,doc.titolo,doc.descrizione,doc.data,doc.costo,doc.id_user,doc.src],function (err){
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

exports.insertBuyDocument = async(idDocument,payment,idProject) => {
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO pagamento(id_doc,nome,cognome,tipo,numero,CCV,id_progetto,id_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(sql,[idDocument,payment.nome,payment.cognome,payment.tipo,payment.numero,payment.CCV,idProject,payment.userID],(err) => {
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
        this.deleteAllComments(idDocument);
        this.deleteAllFavourites(idDocument);
    })
}

exports.deleteAllFavourites = async (idDocument) => {
    return new Promise((resolve,reject) => {
        const sql = "DELETE FROM preferiti WHERE id_documento = ?";
        db.run(sql,[idDocument],(err) => {
            if(err) reject(err);
            resolve();
        })
    })
}



exports.deletePaymentByDocID = async(idDocument) => {
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

exports.removeFollowDoc = async(idDocument,user) => {
    return new Promise((resolve,reject) => {
        const sql = "DELETE FROM preferiti WHERE id_documento=? AND user_email = ?";
        db.run(sql,[idDocument,user],(err)=> {
            if(err) reject(err);
            resolve();
        })
    })
}

exports.postComment = async(commento) => {
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO commento(id_user,id_documento,id_progetto,testo) VALUES (?,?,?,?)';
        db.run(sql,[commento.user,commento.id_documento,commento.id_progetto,commento.text],function (err) {
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

exports.updateComment = async(commento,id_commento) => {
    return new Promise((resolve,reject) => {
        const sql = "UPDATE commento SET testo = ? WHERE id_commento = ?";
        db.run(sql,[commento,id_commento],(err) => {
            if(err) reject(err);
            resolve();
        })
    })
}

exports.updateDocument = async(doc,docID) => {
    return new Promise((resolve,reject) => {
        const sql = "UPDATE documento SET titolo = ?, descrizione = ?, data = ?, costo = ?, id_progetto = ?, id_user = ?,src = ? WHERE id_documento = ?";
        db.run(sql,[doc.titolo,doc.descrizione,doc.data,doc.costo,doc.project,doc.id_user,doc.src,docID],(err) => {
            if(err) reject(err);
            resolve();
        })
    })
}

exports.deleteAllComments = async(idDocument) => {
    return new Promise((resolve,reject) => {
        const sql = "DELETE FROM commento WHERE id_documento = ?";
        db.run(sql,[idDocument],(err) => {
            if(err) reject(err);
            resolve();
        })
    })
}