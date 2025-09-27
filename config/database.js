const sql = require('mssql');
require('dotenv').config();

// Configuración de la base de datos
const dbConfig = {
    user: process.env.DB_USER || 'usr_DesaWebDevUMG',
    password: process.env.DB_PASSWORD || '!ngGuast@360',
    server: process.env.DB_SERVER || 'svr-sql-ctezo.southcentralus.cloudapp.azure.com',
    database: process.env.DB_DATABASE || 'db_DesaWebDevUMG',
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true' || true,
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' || false,
        enableArithAbort: true,
        requestTimeout: 30000,
        connectionTimeout: 30000
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Pool de conexiones
let poolPromise;

const getPool = () => {
    if (!poolPromise) {
        poolPromise = new sql.ConnectionPool(dbConfig)
            .connect()
            .then(pool => {
                console.log('✅ Conectado a SQL Server');
                return pool;
            })
            .catch(err => {
                console.error('❌ Error de conexión a la base de datos:', err);
                poolPromise = null;
                throw err;
            });
    }
    return poolPromise;
};

// Función para ejecutar consultas
const executeQuery = async (query, params = {}) => {
    try {
        const pool = await getPool();
        const request = pool.request();
        
        // Agregar parámetros si existen
        Object.keys(params).forEach(key => {
            request.input(key, params[key]);
        });
        
        const result = await request.query(query);
        return result;
    } catch (error) {
        console.error('Error ejecutando consulta:', error);
        throw error;
    }
};

// Función para cerrar la conexión
const closePool = async () => {
    try {
        if (poolPromise) {
            const pool = await poolPromise;
            await pool.close();
            poolPromise = null;
            console.log('🔌 Conexión a la base de datos cerrada');
        }
    } catch (error) {
        console.error('Error cerrando la conexión:', error);
    }
};

module.exports = {
    sql,
    getPool,
    executeQuery,
    closePool
};