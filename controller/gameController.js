const { establecerConexion } = require('../config/conexion');
const express = require('express')
const rutas = express()


//http://localhost:3030/usuario lista de gamer
rutas.get('/gamer', async (req, res) => {
  try {
    const connection = await establecerConexion();
    const result = await connection.execute('SELECT * FROM gamer ORDER BY id');
    const rows = result.rows;
    res.json(rows);
    console.log(rows);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ error: 'Error al ejecutar la consulta' });
  }
});


//http://localhost:3030/gamer traer informacion del gamer
rutas.get('/gamer/:id', async (req, res) => {
  try {
    const connection = await establecerConexion();
    const id = req.params.id;
    console.log(id);
    const result = await connection.execute('SELECT * FROM gamer where id = :id', { id });
    const rows = result.rows;
    res.json(rows);
    console.log(rows)
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ error: 'Error al ejecutar la consulta' });
  }
});


module.exports = rutas;