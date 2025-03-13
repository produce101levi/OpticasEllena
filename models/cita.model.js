const db = require('../util/database');
const Cliente = require('./cartera.model');
const Usuario = require('./usuario.model');

module.exports = class Cita {

    static async agendarCita(username, nombre, apellido, telefono, 
        edad, fecha_hora_cita){
            const IDCliente = await Cliente.agregar_cliente(nombre, apellido, telefono);
            const IDUsuario = await Usuario.getIDUsuario(username);
            console.log('IDCliente: ', IDCliente);
            console.log('IDUsuario: ', IDUsuario);


            return db.execute(`
                INSERT INTO citas(IDUsuario, IDCliente, edad, fecha_hora, status)
                VALUES(?, ?, ?, ?, ?)
            `, [IDUsuario, IDCliente, edad, fecha_hora_cita, 'STATUS']);

    }

}