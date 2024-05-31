const sql  = require('mssql');
const sqlConfig = require('../Config/sqlConfig');

const userService = {
    register: async (data) => {
        try {
            await sql.connect(sqlConfig);

            const {biography, pays, website, username, hashPwd, email} = data;

            const result = await sql.query`INSERT INTO Users (biography, pays, website, username, password, email) 
                                VALUES (${biography}, ${pays}, ${website}, ${username}, ${hashPwd}, ${email})`;

            //true if inserted into db
            return result.rowsAffected[0] > 0;
            
        } catch (error) {
            //sql error
            console.error(error.message);
            return false;
        }
    },

    getByEmail : async (email) => {
        try {
            await sql.connect(sqlConfig);

            const result = await sql.query`SELECT * FROM Users WHERE email = ${email}`;

            return result.recordset[0];
        } catch (error) {
            //sql error
            console.error(error.message);
            return false;
        }
    }
};

module.exports = userService;