const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'gestor_contactos'
});

//Si la base de datos esta apagada
pool.getConnection()
    .then(connection => {
        console.log('✅  Conexión a la base de datos establecida');
        connection.release();
    })
    .catch(err => {
        if (err.code === 'ECONNREFUSED') {
            console.error('⚠️  Base de datos posiblemente apagada');
        } else {
            console.error('❌  Error al conectar a la base de datos:', err);
        }
    });

module.exports = pool;
