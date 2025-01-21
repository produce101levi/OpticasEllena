const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'opticasellena',
    password: 'r4Lz5c9STd3y',
    port: '3306',
});

module.exports = pool.promise();