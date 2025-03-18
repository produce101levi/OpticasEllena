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

    static async getIDUsuario(username){
        const [resultado] = await db.execute(` 
            SELECT IDUsuario FROM usuarios WHERE username = ?`, [username]
        );

        return resultado[0].IDUsuario;
    }

    static validarUsuario(username){
        // console.log("MODEL Username:", username);
        return db.execute(`
            SELECT * FROM usuarios WHERE username = ? OR correo = ?
        `, [username, username]);
    }

    static async getEdadUsuario(username){
        const [resultado] = await db.execute(`
            SELECT fecha_nacimiento, 
                FLOOR(DATEDIFF(CURDATE(), fecha_nacimiento) / 365.25) AS edad
            FROM usuarios
            WHERE username = ?;
            `, [username]);

        return resultado[0].edad;
    }

    static async getInfoUsuario(username){

        return db.execute(`
            SELECT nombre, apellido, telefono, correo, fecha_nacimiento 
            FROM usuarios WHERE username = ?
        `, [username]);
    }
}