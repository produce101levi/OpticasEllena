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
                cl.IDCliente = co.IDCliente
            ORDER BY CAST(SUBSTRING_INDEX(IDContrato, '-', 1) AS UNSIGNED);`
        );
    }

    static obtener_tratamientos(){
        return db.execute(
            `SELECT tratamiento FROM tratamientos`
        )
    }

    static async agregar_cliente(nombre, apellido, telefono){
        const [result] = await db.execute(
            `INSERT INTO clientes (nombre, apellido, telefono)
            VALUES(?, ?, ?)`,
            [nombre, apellido, telefono]
        );
        return result.insertId // Return Client ID
    }

    static async agregar_contrato(
        nombre, apellido, telefono,
        IDContrato, numero_armazones, fecha_venta, 
        total_venta, anticipo, saldo,
        fecha_entrega, fecha_recibido, metodo_pago, observaciones 
    ){
        const IDCliente = await this.agregar_cliente(nombre, apellido, telefono);

        const [result] = await db.execute(
            `INSERT INTO contratos(
                IDContrato, IDCliente, numero_armazones,
                fecha_venta, total_venta, anticipo, saldo,
                fecha_entrega, fecha_recibido, metodo_pago, observaciones
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                IDContrato, IDCliente, numero_armazones, 
                fecha_venta, total_venta, anticipo, saldo,
                fecha_entrega, fecha_recibido, metodo_pago, observaciones
            ]
        );

        return result.insertId;
    }

    static async get_IDArmazon(marca, modelo, material, color){

        const [result] = await db.execute(`
            SELECT IDArmazon FROM armazones
            WHERE (marca = ? OR marca IS NULL)
            AND (modelo = ? OR modelo IS NULL)
            AND (material = ? OR material IS NULL)
            AND (color = ? OR color IS NULL)
        `, [marca, modelo, material, color]);

        // console.log(result[0].IDArmazon);

        return result[0].IDArmazon;

    }

    static async get_IDTratamiento(tratamiento){
        const [result] = await db.execute(`
            SELECT IDTratamiento FROM tratamientos
            WHERE tratamiento = ?
        `, [tratamiento]);

        console.log(result[0].IDTratamiento);

        return result[0].IDTratamiento;
    }

    static async add_graduacion(
        esfera_d, esfera_i, cilindro_d, cilindro_i, eje_d, eje_i,
        add_d, add_i, dip_d, dip_i
    ){
        return db.execute(`
        INSERT INTO graduaciones(
            esfera_i, esfera_d, cilindro_i, cilindro_d,
            eje_i, eje_d, add_i, 
            add_d, dip_i, dip_d 
        )
        VALUES(
            ?, ?, ?, ?, 
            ?, ?, ?, 
            ?, ?, ?
        )`, 
        [
            esfera_i, esfera_d, cilindro_i, cilindro_d, 
            eje_i, eje_d, add_i, 
            add_d, dip_i, dip_d
        ]);

    }

    // static async agregar_encargo(
    //     nombre, apellido, telefono,
    //     IDContrato, numero_armazones, fecha_venta, 
    //     total_venta, anticipo, saldo,
    //     fecha_entrega, fecha_recibido, metodo_pago, observaciones,
    //     IDArmazon
    // ){

    // }



    static async get_armazones(){
        return db.execute(`
            SELECT * FROM armazones
        `)
    }

    static buscar_contrato(valor_busqueda){
        return db.execute(`
            SELECT 
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
            cl.IDCliente = co.IDCliente
            AND
            (cl.nombre LIKE ? OR cl.apellido LIKE ?)
            ORDER BY CAST(SUBSTRING_INDEX(IDContrato, '-', 1) AS UNSIGNED); 
        `, ['%' + valor_busqueda + '%', '%' + valor_busqueda + '%'])
    }
}