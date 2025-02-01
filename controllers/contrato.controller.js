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
            armazones, tipos_lentes, tratamientos, graduaciones,
            paciente_armazon, paciente_graduacion
        } = req.body;
        // console.log(req.body);
        
        // console.log(req.body.graduaciones);

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

        // Crear Encargo y Agregar Contrato
        const agregar_encargo = async (
            nombre, apellido, telefono,
            IDContrato, numero_armazones, fecha_venta, 
            total_venta, anticipo, saldo,
            fecha_entrega, fecha_recibido, metodo_pago, observaciones,
            armazones, tipos_lentes, tratamientos, graduaciones,
            paciente_armazon, paciente_graduacion
        ) => {
            for (let i = 0; i < armazones.length; i++){
                let [marca, modelo, material, color] = armazones[i].split(" ");
                if(armazones[i] == "Armazón"){
                    marca = modelo = material = color = null;
                    // console.log("null");
                } 

                // console.log('CONTROLLER:', armazones[i]);
                
                
                const tratamiento = tratamientos[i];
                const {
                    esfera_d, esfera_i, cilindro_d, 
                    cilindro_i, eje_d, eje_i, add_d, 
                    add_i, dip_d, dip_i
                } = graduaciones[i];

                console.log("[Controller] Graduaciones[i] =", graduaciones[i]);


                await Contrato.agregar_encargo(
                    nombre, apellido, telefono,
                    IDContrato, numero_armazones, fecha_venta, 
                    total_venta, anticipo, saldo,
                    fecha_entrega, fecha_recibido, metodo_pago, observaciones,
                    marca, modelo, material, color,
                    tratamiento, esfera_d, esfera_i, cilindro_d, 
                    cilindro_i, eje_d, eje_i, add_d, 
                    add_i, dip_d, dip_i, i
                )



            }

        }

        await agregar_encargo(
            nombre, apellido, telefono,
            IDContrato, pnumero_armazones, pfecha_venta, 
            ptotal_venta, panticipo, psaldo,
            pfecha_entrega, pfecha_recibido, metodo_pago, observaciones,
            armazones, tipos_lentes, tratamientos, graduaciones,
            paciente_armazon, paciente_graduacion
        )

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