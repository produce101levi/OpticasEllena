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

    // Agregar Cliente
    static async agregar_cliente(nombre, apellido, telefono){
        const [result] = await db.execute(
            `INSERT INTO clientes (nombre, apellido, telefono)
            VALUES(?, ?, ?)`,
            [nombre, apellido, telefono]
        );
        return result.insertId // Return Client ID
    }

    // Agregar Contrato
    static async agregar_contrato(
        nombre, apellido, telefono,
        IDContrato, numero_armazones, fecha_venta, 
        total_venta, anticipo, saldo,
        fecha_entrega, fecha_recibido, metodo_pago, observaciones 
    ){
        const IDCliente = await this.agregar_cliente(nombre, apellido, telefono);

        console.log('Agregando Contrato...');

        return db.execute(
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
    }

    // Agregar Graduación
    static async agregar_graduacion(
        esfera_d, esfera_i, cilindro_d, cilindro_i, eje_d, eje_i,
        add_d, add_i, dip_d, dip_i
    ){

        console.log('Agregando Graduación...');
        
        const [result] = await db.execute(`
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


        return result.insertId;

    }

    // Agregar Encargo
    static async agregar_encargo(
        nombre, apellido, telefono,
        IDContrato, numero_armazones, fecha_venta, 
        total_venta, anticipo, saldo,
        fecha_entrega, fecha_recibido, metodo_pago, observaciones,
        marca, modelo, material, color, tratamiento,
        esfera_d, esfera_i, cilindro_d, 
        cilindro_i, eje_d, eje_i, add_d, 
        add_i, dip_d, dip_i, i, tipo_lente, paciente
    ){
        if (i == 0){
            const [result_contrato] = await this.agregar_contrato(
                nombre, apellido, telefono,
                IDContrato, numero_armazones, fecha_venta, 
                total_venta, anticipo, saldo,
                fecha_entrega, fecha_recibido, metodo_pago, observaciones 
            );
        }

        if((marca || modelo || material || color)
        && (esfera_d || esfera_i || cilindro_d || 
        cilindro_i || eje_d || eje_i || 
        add_d || add_i || dip_d || dip_i)
        && tratamiento){
            const IDGraduacion = await this.agregar_graduacion(
                esfera_d, esfera_i, cilindro_d, cilindro_i, eje_d, eje_i,
                add_d, add_i, dip_d, dip_i
            );
            const IDArmazon = await this.get_IDArmazon(marca, modelo, material, color);
            const IDTratamiento = await this.get_IDTratamiento(tratamiento);
            return db.execute(`
                INSERT INTO encargos(IDContrato, IDArmazon, IDTratamiento, IDGraduacion,
                tipo_lente, paciente)
                VALUES(?, ?, ?, ?, ?, ?)
            `, [IDContrato, IDArmazon, IDTratamiento, IDGraduacion, tipo_lente, paciente])
        } else {
            return null;
        }

    }

    static async get_IDArmazon(marca, modelo, material, color){

        console.log("GETIDARMAZON", marca, modelo, material, color)

        const [result] = await db.execute(`
            SELECT IDArmazon FROM armazones
            WHERE (marca = ? OR marca IS NULL)
            AND (modelo = ? OR modelo IS NULL)
            AND (material = ? OR material IS NULL)
            AND (color = ? OR color IS NULL)
        `, [marca, modelo, material, color]);

        console.log("ARMAZON:", marca, modelo, material, color);
        console.log("ID ARMAZON:", result[0].IDArmazon);

        // console.log(result[0].IDArmazon);

        return result[0].IDArmazon;

    }

    static async get_IDTratamiento(tratamiento){
        const [result] = await db.execute(`
            SELECT IDTratamiento FROM tratamientos
            WHERE tratamiento = ?
        `, [tratamiento]);

        // console.log(result[0].IDTratamiento, ":", tratamiento);

        return result[0].IDTratamiento;
    }





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

    static async getInfoCliente(username, IDUsuario){
        return db.execute(`
            SELECT nombre, apellido, edad, fecha_hora  
            FROM clientes cl 
            INNER JOIN citas ci ON cl.IDCliente=ci.IDCliente
        `)
    }
}