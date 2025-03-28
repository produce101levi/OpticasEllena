const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'DB_HOST',
    user: 'DB_USER',
    database: 'DB_NAME',
    password: 'DB_PASSWORD',
    port: 'DB_PORT',
});

module.exports = pool.promise();