"use strict";

const sqlite = require('sqlite3');

const db = new sqlite.Database('rubrica.db',(err) => console.error(err));

module.exports = db;