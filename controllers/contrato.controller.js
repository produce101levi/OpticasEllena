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

// exports.post_crear_contrato = async (req, res, next) => {
//     try {
//         res.render('crear_contrato');
//     } catch (error) {
//         console.error('Error consiguiendo cartera:', error);
//         res.status(500).send('Error de Servidor');
//     }
// }

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
            armazon, armazon2, armazon3, tratamiento, tratamiento2, tratamiento3
        } = req.body;
        console.log(req.body);

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

        // console.log(marca, modelo, material, color);


        res.redirect('/user/empleado/cartera');
        // console.log('Armazon: ', rows);
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