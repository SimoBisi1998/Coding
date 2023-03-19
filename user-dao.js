"use strict";
const db = require('./db.js');
const bcrypt = require('bcrypt');

exports.insertUser = async(contact,id_user) => {
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO contatti(nome,cognome,numero,id_user) VALUES(?,?,?,?)';
        db.run(sql,[contact.nome,contact.cognome,contact.numero,id_user],function(err) {
            if(err) reject(err);
            resolve();
        })
    })
}


exports.getAllUser = async(id) => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM contatti WHERE id_user=?';
        db.all(sql,[id],(err,contacts) => {
            if(err) reject(err);
            resolve(contacts);
        })
    })
}

exports.deleteUser = async(id,id_user) => {
    return new Promise((resolve,reject) => {
        const sql = 'DELETE FROM contatti WHERE id=? AND id_user=?';
        db.run(sql,[id,id_user],(err) => {
            if(err) reject(err);
            resolve();
        })
    })
}

exports.modifyUser = async(contact,id,id_user) => {
    return new Promise((resolve,reject) => {
        const sql = 'UPDATE contatti SET nome=?,cognome=?,numero=? WHERE id_user=? and id=?';
        db.run(sql,[contact.nome,contact.cognome,contact.numero,id_user,id],(err) => {
            if(err) reject(err);
            resolve();
        })
    })
}

exports.insertUtente = async(username,password) => {
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO user(email,password) VALUES(?,?)';
        bcrypt.hash(password,10).then(hash => {
            db.run(sql,[username,hash],function(err) {
                if(err) reject(err);
                resolve(this.lastID);
            })
        })
    })
}

exports.getUsersAlreadyRegistered = async(username,password) => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT password FROM user WHERE email=?';
        db.get(sql,[username],(err,hash) => {
            if(err) reject(err);
            let cryptedPassword = hash['password'];
            bcrypt.compare(password,cryptedPassword,(err,result) => {
                if(err) throw(err)
                if(result==true){
                    resolve();
                }
            })
        })
    })
}

exports.getUserIdByEmail = async(username) => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT id_utente FROM user WHERE email=?';
        db.get(sql,[username],(err,row) => {
            if(err) reject(err);
            resolve(row);
        })
    })
}

exports.getContact = async(value,id_user) => {
    return new Promise((resolve,reject) => {
        const sql = `SELECT * FROM contatti WHERE nome=? AND id_user=?`;
        db.all(sql,[value,id_user],(err,rows) => {
            if(err)reject(err);
            console.log(rows)
            resolve(rows);
        })
    })
}