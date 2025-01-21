const db = require('../util/database');

module.exports = class Contrato {
    static buscarContrato(){
        return db.execute(
            `SELECT 
                IDContrato, 
                fecha_venta, 
                nombre, 
                apellido, 
                total_venta, 
                anticipo, 
                saldo, 
                fecha_entrega, 
                telefono, 
                fecha_recibido 
            FROM 
                clientes cl, 
                contratos co 
            WHERE 
                cl.IDCliente = co.IDCliente`
        );
    }
}