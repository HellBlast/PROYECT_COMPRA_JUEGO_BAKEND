const { establecerConexion } = require('../config/conexion');
const express = require('express')
const rutas = express()


//http://localhost:3030/usuario lista de usuario
rutas.get('/usuario', async (req, res) => {
  try {
    const connection = await establecerConexion();
    const result = await connection.execute('SELECT * FROM usuario ORDER BY id');
    const rows = result.rows;
    res.json(rows);
    console.log(rows);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ error: 'Error al ejecutar la consulta' });
  }
});

//http://localhost:3030/usuario traer informacion del usuario
rutas.get('/usuario/:alias', async (req, res) => {
  try {
    const connection = await establecerConexion();
    const alias = req.params.alias;
    console.log(alias);
    const result = await connection.execute('SELECT * FROM usuario where alias = :alias', { alias });
    const rows = result.rows;
    res.json(rows);
    console.log(rows)
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ error: 'Error al ejecutar la consulta' });
  }
});

//http://localhost:3030/usuario insertar usuario
rutas.post('/usuario', async (req, res) => {
  try {
    const connection = await establecerConexion();
    const { nombre, alias, contrasena } = req.body;
    await connection.execute(
      `BEGIN
              insertar_usuario(:nombre, :alias, :contrasena);
          END;`,
      { nombre, alias, contrasena }
    );
    console.log(req.body)
    res.json({ mensaje: 'Usuario insertado correctamente' });
  } catch (error) {
    console.error('Error al ejecutar la inserción:', error);
    res.status(500).json({ error: 'Error al insertar el usuario' });
  }
});

module.exports = rutas;
