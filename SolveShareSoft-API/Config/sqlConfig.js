const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 600000,
    },
    options: {
        //encrypt: true, //for Microsoft azure
        trustServerCertificate: true //change to true for local dev / self-signed certs
    }
};

module.exports = sqlConfig;