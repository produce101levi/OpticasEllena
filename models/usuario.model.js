const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {

    constructor(
        mi_username, mi_nombre, mi_apellido,
        mi_telefono, mi_correo, mi_fecha_nacimiento,
        mi_contrasena
    ){
        this.username = mi_username;
        this.nombre = mi_nombre;
        this.apellido = mi_apellido;
        this.telefono = mi_telefono;
        this.correo = mi_correo;
        this.fecha_nacimiento = mi_fecha_nacimiento;
        this.contrasena = mi_contrasena;
    }

    registrarUsuario(){
        return bcrypt.hash(this.contrasena, 12).then((contrasenaCifrada) => {
            return db.execute(
                `INSERT INTO usuarios(
                    username, contrasena, nombre, apellido, telefono, 
                    correo, fecha_nacimiento
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [this.username, contrasenaCifrada, this.nombre, this.apellido, this.telefono,
                this.correo, this.fecha_nacimiento]);
        })
        
    }


    static validarUsuario(username, contrasena){
        // console.log("MODEL Username:", username);
        return db.execute(`
            SELECT * FROM usuarios WHERE username = ? AND contrasena = ?
        `, [username, contrasena]);
    }
}