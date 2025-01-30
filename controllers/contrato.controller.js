const Contrato = require('../models/cartera.model');

exports.get_contratos = async (req, res, next) => {
    try {
        const [rows] = await Contrato.buscarContrato();
        // console.log('Rows: ', rows);

        const formattedRows = rows.map(contrato => ({
            ...contrato,
            fecha_venta: new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(contrato.fecha_venta)),
            fecha_entrega: new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(contrato.fecha_entrega)),
            fecha_recibido: new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(contrato.fecha_recibido)),
        }));

        res.render('cartera', {contratos: formattedRows});
    } catch (error) {
        console.error('Error consiguiendo cartera:', error);
        res.status(500).send('Error de Servidor');
    }
}

exports.get_tratamientos = async (req, res, next) => {
    try {
        const [rows] = await Contrato.obtener_tratamientos();
        req.tratamientos = rows;
        next();
    } catch(error) {
        console.error(error);
        next(error);
    }
}

exports.get_armazones = async (req, res, next) => {
    try {
        const [rows] = await Contrato.get_armazones();
        // console.log('Armazones: ', rows);
        res.render('crear_contrato', {
            armazones: rows,
            tratamientos: req.tratamientos,
        });
    } catch(error){
        console.error(error);
    }
}

exports.post_contrato = async (req, res, next) => {
    try {
        const { 
            nombre, apellido, telefono,
            IDContrato, numero_armazones, fecha_venta, 
            total_venta, anticipo, saldo,
            fecha_entrega, fecha_recibido, metodo_pago, observaciones,
            armazon, armazon2, armazon3, tratamiento, tratamiento2, tratamiento3,
            esfera_d, esfera_i, cilindro_d, cilindro_i, eje_d, eje_i,
            add_d, add_i, dip_d, dip_i, esfera_d2, esfera_i2, cilindro_d2, 
            cilindro_i2, eje_d2, eje_i2, add_d2, add_i2, dip_d2, dip_i2,
            esfera_d3, esfera_i3, cilindro_d3, cilindro_i3, eje_d3, eje_i3,
            add_d3, add_i3, dip_d3, dip_i3
        } = req.body;
        console.log(req.body);

        // Función auxiliar para manejar campos de fecha vacíos
        const procesar_fecha = (fecha) => (fecha === "" || !fecha ? null : fecha);

        const pfecha_venta = procesar_fecha(fecha_venta);
        const pfecha_entrega = procesar_fecha(fecha_entrega);
        const pfecha_recibido = procesar_fecha(fecha_recibido);

        // Función auxiliar para manejar campos numéricos vacíos
        const procesar_enteros = (valor) => (valor === "" || !valor ? null : valor);
        const procesar_flotante = (valor) => (valor === "" || !valor ? null : valor);

        const pnumero_armazones = procesar_enteros(numero_armazones);
        const ptotal_venta = procesar_flotante(total_venta);
        const panticipo = procesar_flotante(anticipo);
        const psaldo = procesar_flotante(saldo);

        // Función auxiliar para conseguir ID de los 3 armazones
        const get_IDArmazon = async (armazon) => {
            const [marca, modelo, material, color] = armazon.split(" ");
            if(armazon == "Armazón") return null;

            // console.log("Atributos:", marca, modelo, material, color);

            return await Contrato.get_IDArmazon(
                marca, modelo, material, color
            );

        }

        // Obtener ID de Armazón
        const [IDArmazon, IDArmazon2, IDArmazon3] = await Promise.all([
            get_IDArmazon(armazon),
            get_IDArmazon(armazon2),
            get_IDArmazon(armazon3),
        ])

        // console.log(IDArmazon, IDArmazon2, IDArmazon3);

        // Obtener ID de Tratamiento
        const get_IDTratamiento = async (tratamiento) => {
            if(tratamiento == "Tratamientos"){
                return null;
            }

            return await Contrato.get_IDTratamiento(tratamiento);
        }

        const [IDTratamiento, IDTratamiento2, IDTratamiento3] = await Promise.all([
            get_IDTratamiento(tratamiento),
            get_IDTratamiento(tratamiento2),
            get_IDTratamiento(tratamiento3),
        ])

        // Agregar Graduaciones
        const [rows] = await Contrato.add_graduacion(
            esfera_d, esfera_i, cilindro_d, cilindro_i, eje_d, eje_i,
            add_d, add_i, dip_d, dip_i
        );

        const [rows2] = await Contrato.add_graduacion(
            esfera_d2, esfera_i2, cilindro_d2, cilindro_i2, eje_d2, eje_i2,
            add_d2, add_i2, dip_d2, dip_i2
        );

        const [rows3] = await Contrato.add_graduacion(
            esfera_d3, esfera_i3, cilindro_d3, cilindro_i3, eje_d3, eje_i3,
            add_d3, add_i3, dip_d3, dip_i3
        );


        res.redirect('/user/empleado/cartera');
    } catch(error){
        console.error(error);
    }
}

exports.get_buscar_contrato = async (req, res, next) => {
    try {
        // console.log('Search value:', req.params.valor_busqueda);
        const [rows] = await Contrato.buscar_contrato(req.params.valor_busqueda || '');

        const formattedRows = rows.map(contrato => ({
            ...contrato,
            fecha_venta: new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(contrato.fecha_venta)),
            fecha_entrega: new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(contrato.fecha_entrega)),
            fecha_recibido: new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(contrato.fecha_recibido)),
        }));

        return res.status(200).json({contratos: formattedRows});

    } catch(error) {
        console.log(error);
    }
}