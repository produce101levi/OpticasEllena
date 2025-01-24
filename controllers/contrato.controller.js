const Contrato = require('../models/cartera.model');

exports.get_contratos = async (req, res, next) => {
    try {
        const [rows] = await Contrato.buscarContrato();
        console.log('Rows: ', rows);

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
        // console.log('Tratamientos: ', rows);
        res.render('crear_contrato', {tratamientos: rows});
    } catch(error) {
        console.error(error);
    }
}