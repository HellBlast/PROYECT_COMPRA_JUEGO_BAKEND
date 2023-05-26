const { establecerConexion } = require('../config/conexion');
const express = require('express')
const rutas = express()


//http://localhost:3030/usuario lista de gamer
rutas.get('/gamer_list', async (req, res) => {
  try {
    const connection = await establecerConexion();
    const id_usuario = req.query.id_usuario;
    const can_descuento = req.query.can_descuento;
    console.log(id_usuario, can_descuento);
    const result = await connection.execute('select g.id, g.title, g.description, g.image, g.created_at, (g.precio-(precio*(:can_descuento/100))), g.precio from gamer g where not exists (select * from compra c inner join usuario u on u.id=c.id_usuario where c.id_usuario= :id_usuario and c.id_gamer = g.id )', { can_descuento, id_usuario });
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