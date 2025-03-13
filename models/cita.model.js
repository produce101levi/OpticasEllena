const db = require('../util/database');
const Cliente = require('./cartera.model');
const Usuario = require('./usuario.model');

module.exports = class Cita {

    static async agendarCita(username, nombre, apellido, telefono, 
        edad, fecha_hora){
            const IDCliente = await Cliente.agregar_cliente(nombre, apellido, telefono);
            const IDUsuario = await Usuario.getIDUsuario(username);

            console.log("CITA CREADA: ")
            console.log("Nombre:", nombre, apellido);
            console.log("Teléfono:", telefono);
            console.log("Edad(es):", edad);
            console.log("Fecha y Hora:", fecha_hora);

            return db.execute(`
                INSERT INTO citas(IDUsuario, IDCliente, edad, fecha_hora, status)
                VALUES(?, ?, ?, ?, ?)
            `, [IDUsuario, IDCliente, edad, fecha_hora, 'STATUS']);

    }

}