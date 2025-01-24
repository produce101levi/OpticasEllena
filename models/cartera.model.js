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
                cl.IDCliente = co.IDCliente`
        );
    }

    static obtener_tratamientos(){
        return db.execute(
            `SELECT tratamiento FROM tratamientos`
        )
    }

}