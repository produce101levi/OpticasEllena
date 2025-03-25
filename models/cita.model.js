const db = require('../util/database');
const Cliente = require('./cartera.model');
const Usuario = require('./usuario.model');

module.exports = class Cita {

    static async agendarCita(username, nombre, apellido, telefono, 
        edad, fecha_hora){
            const IDCliente = await Cliente.agregar_cliente(nombre, apellido, telefono);
            const IDUsuario = await Usuario.getIDUsuario(username);

            return db.execute(`
                INSERT INTO citas(IDUsuario, IDCliente, edad, fecha_hora, status)
                VALUES(?, ?, ?, ?, ?)
            `, [IDUsuario, IDCliente, edad, fecha_hora, 'ACTIVA']);

    }

    static async getInfoCitasCliente(username){
        const IDUsuario = await Usuario.getIDUsuario(username);
        return db.execute(`
            SELECT IDCita, nombre, apellido, edad, fecha_hora, status  
            FROM clientes cl 
            INNER JOIN citas ci ON cl.IDCliente=ci.IDCliente
            WHERE ci.IDUsuario = ?
            AND status = 'ACTIVA'
        `, [IDUsuario])
    }

    static async getUnaCita(id){
        return db.execute(`
            SELECT IDCita, nombre, apellido, edad, fecha_hora  
            FROM clientes cl 
            INNER JOIN citas ci ON cl.IDCliente=ci.IDCliente
            WHERE ci.IDCita = ?
        `, [id])
    }

    // Función para cancelar una cita (cambiar status a cancelado)
    static async cancelarCitaCliente(id){
        return db.execute(`
            UPDATE citas
            SET status = 'INACTIVA'
            WHERE IDCita = ?
        `, [id])
    }

}