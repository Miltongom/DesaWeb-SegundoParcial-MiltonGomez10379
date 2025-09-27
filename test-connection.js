require('dotenv').config();
const { executeQuery } = require('./config/database');

async function testConnection() {
    try {
        console.log('🔄 Probando conexión a la base de datos...');
        console.log('Servidor:', process.env.DB_SERVER);
        console.log('Base de datos:', process.env.DB_DATABASE);
        console.log('Usuario:', process.env.DB_USER);
        
        const result = await executeQuery('SELECT COUNT(*) as count FROM CARTELERA_10379');
        console.log('✅ Conexión exitosa!');
        console.log('📊 Registros en CARTELERA_10379:', result.recordset[0].count);
        
        // Obtener datos de ejemplo
        const peliculas = await executeQuery('SELECT TOP 3 * FROM CARTELERA_10379');
        console.log('🎬 Películas encontradas:', peliculas.recordset.length);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
        process.exit(1);
    }
}

testConnection();