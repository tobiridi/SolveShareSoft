const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'web-app.database.windows.net',
    port: 1433,
    connectionTimeout: 1500,
    requestTimeout: 1500,
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 30000,
    },
    options: {
        encrypt: true, //for Microsoft azure
        trustServerCertificate: true //change to true for local dev / self-signed certs
    }
};

module.exports = sqlConfig;