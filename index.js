const bodyParser = require('body-parser');
const { establecerConexion } = require('./config/conexion');
var express = require('express')
var app = express()
app.use(bodyParser.json())    
const port = process.env.PORT || 3030
app.set('port',port) 

//-- para dar accesos desde cualquier servidor
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


//llamado al puerto
app.listen(app.get('port'),(err)=>{
    if(err){
        console.log('Error iniciando el Servidor: '+err)
    }
    else{
        console.log('Server is runing in port: http://localhost:'+port)
    }
})
  
//comprobando la conexion a la base de datos
establecerConexion();


//--- llamar a los controladores  
app.use('/',require('./controller/usuarioController'));
app.use('/',require('./controller/gameController'));
app.use('/',require('./controller/compraController'));

