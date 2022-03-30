const mysql = require('mysql2');
module.exports = mysql.createConnection({
    user: "root",
    password: "ZXC123zxc.", 
    host: "127.0.0.1",
    port:3306,
    database: "store",
    insecureAuth : true,
    multipleStatements: true,
})