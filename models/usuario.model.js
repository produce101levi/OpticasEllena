const db = require('../util/database');

module.exports = class Usuario {
    static validarUsuario(username, contrasena){
        // console.log("MODEL Username:", username);
        return db.execute(`
            SELECT * FROM usuarios WHERE username = ? AND contrasena = ?
        `, [username, contrasena]);
    }
}