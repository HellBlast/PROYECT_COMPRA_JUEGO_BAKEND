//se carga el paquete o llama a la dependencia
const oracledb = require('oracledb');//paquete oracle

const connectionConfig = {
    user: 'ADMIN',
    password: 'ADMIN',
    connectString: '192.168.10.10:1510/CPP'
};

async function establecerConexion() {
    try {
        const connection = await oracledb.getConnection(connectionConfig);
        console.log('Conexión a la base de datos Oracle establecida correctamente.');
        return connection;
    } catch (error) {
        console.error('Error al establecer la conexión a la base de datos Oracle:', error);
        throw error;
    }
}

module.exports = { establecerConexion };