const mysql = require('mysql');
module.exports = mysql.createConnection({
    user: "root",
    password: "QAZ123qaz.", 
    host: "127.0.0.1",
    port:3306,
    database: "online_store",
    insecureAuth : true,
    multipleStatements: true,
})