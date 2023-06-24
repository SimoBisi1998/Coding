"use strict";
const sqlite = require("sqlite3");
const db = new sqlite.Database('../../../ospedale.db',(err) => console.error(err));
const bcrypt = require("bcrypt");

exports.verifyUsername = async(username) => {
    return new Promise((resolve,reject) => {
        const sql = "SELECT * FROM medico WHERE username=?";
        db.get(sql,[username],(err,row) => {
            if(err || row == undefined) reject(err);
            console.log(row)
            resolve(row);
        })
    })
}

exports.getAllPatient = async() => {
    return new Promise((resolve,reject) => {
        const sql = "SELECT * FROM paziente";
        db.all(sql,(err,rows) => {
            if(err) reject(err);
            resolve(rows);
        })
    })
}

exports.getUserFromDB = async(username,password) => {
    return new Promise((resolve,reject) => {
        let sql = "SELECT password FROM medico WHERE username=?";
        db.get(sql,[username],function(err,hash){
            if(err) reject(err);
            let cryptedPassword = hash["password"];
                bcrypt.compare(password,cryptedPassword,(err,result) => {
                    if(err) throw err;
                    if(result) {
                        resolve();
                    }
                })
        })
    })
}