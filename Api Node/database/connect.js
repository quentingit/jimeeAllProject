const mysql = require('mysql')
const config = require('./config')

// création d'un pool de connexion MYSQL
const con = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});

module.exports = { con, mysql }