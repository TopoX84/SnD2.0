const config = require("../configs/dbconfig.json");
const mysql = require("mysql");

//DB connection

var conn = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    charset: config.charset,
    multipleStatements: true,
    connectionLimit: 10
});

module.exports = conn;