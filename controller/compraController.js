const { establecerConexion } = require('../config/conexion');
const express = require('express')
const rutas = express()

//http://localhost:3030/comprar insertar compra
rutas.post('/comprar', async (req, res) => {
    try {
        const connection = await establecerConexion();
        const { id_usuario, id_gamer, fecha_compra, precio_compra } = req.body;
        console.log(req.body)
        await connection.execute(
            `BEGIN
            compra_gamer(:id_usuario, :id_gamer, TO_DATE(:fecha_compra, 'YYYY-MM-DD'), :precio_compra);
            END;`,
            { id_usuario, id_gamer, fecha_compra, precio_compra }
        );
        console.log(req.body)
        res.json({ mensaje: 'Compra insertado correctamente' });
    } catch (error) {
        console.error('Error al ejecutar la inserción:', error);
        res.status(500).json({ error: 'Error al insertar la compra' });
    }
});

module.exports = rutas;