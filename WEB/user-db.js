'use strict';

const db = require('./db.js');
const bcrypt = require('bcrypt');

exports.createUser = function(user) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO user(email, password,nome,cognome,ruolo) VALUES (?, ?, ?, ?, ?)';
    bcrypt.hash(user.password, 10).then((hash => {
      db.run(sql, [user.email, hash,user.nome,user.cognome,user.ruolo], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    }));
  });
}

exports.getUsers = function() {
  return new Promise((resolve,reject) => {
    const sql = 'SELECT * FROM user';
    db.all(sql,(err,rows) => {
      if(err) reject(err);
      resolve(rows);
    })
  })
}

exports.getUser = function(email, password) {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE email = ?';
      db.get(sql, [email], (err, row) => {
          if (err) 
              reject(err);
          else if (row === undefined)
              resolve({error: 'User not found.'});
          else {
            const user = {id: row.id, username: row.email};
            let check = false;
            if(bcrypt.compareSync(password, row.password))
              check = true;

            resolve({user, check});
          }
      });
  });
};

exports.getUserById = function(id) {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE id = ?';
      db.get(sql, [id], (err, row) => {
          if (err) 
              reject(err);
          else if (row === undefined)
              resolve({error: 'User not found.'});
          else {
              const user = {id: row.id, username: row.email}
              resolve(user);
          }
      });
  });
};
