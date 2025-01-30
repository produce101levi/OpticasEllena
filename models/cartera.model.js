const db = require('../util/database');

module.exports = class Contrato {

    constructor(
        mi_id_contrato,
        mi_nombre, 
        mi_apellido, 
        mi_telefono, 
        mi_fecha, 
        mi_cantidad, 
        mi_armazon, 
        mi_tipo, 
        mi_tratamiento, 
        mi_metodo, 
        mi_total, 
        mi_anticipo, 
        mi_saldo, 
        mi_observaciones,
        mi_esf_od,
        mi_esf_oi,
        mi_cil_od,
        mi_cil_oi,
        mi_eje_od,
        mi_eje_oi,
        mi_add_od,
        mi_add_oi,
        mi_dip,
    ){
        this.id_contrato = mi_id_contrato;
        this.nombre = mi_nombre;
        this.apellido = mi_apellido;
        this.telefono = mi_telefono;
        this.fecha = mi_fecha;
        this.cantidad = mi_cantidad;
        this.armazon = mi_armazon;
        this.tipo = mi_tipo;
        this.tratamiento = mi_tratamiento;
        this.metodo = mi_metodo;
        this.total = mi_total;
        this.anticipo = mi_anticipo;
        this.saldo = mi_saldo;
        this.observaciones = mi_observaciones;
        this.esf_od = mi_esf_od;
        this.esf_oi = mi_esf_oi;
        this.cil_od = mi_cil_od;
        this.cil_oi = mi_cil_oi;
        this.eje_od = mi_eje_od;
        this.eje_oi = mi_eje_oi;
        this.add_od = mi_add_od;
        this.add_oi = mi_add_oi;
        this.dip = mi_dip;
    }

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