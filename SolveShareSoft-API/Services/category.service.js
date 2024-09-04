const sql  = require('mssql');
const sqlConfig = require('../Config/sqlConfig');

const categoryService = {
    getAll: async () => {
        try {
            await sql.connect(sqlConfig);

            const result = await sql.query`SELECT * FROM Category`;

            return result.recordset;
            
        } catch (error) {
            //sql error
            console.error(error.message);
            return false;
        }
    },

    create: async (data) => {
        try {
            await sql.connect(sqlConfig);

            const { name } = data;

            const result = await sql.query`INSERT INTO Category values (${name})`;

            return result.rowsAffected[0] > 0;
            
        } catch (error) {
            //sql error
            console.error(error.message);
            return false;
        }
    },

    delete: async (categoryId) => {
        try {
            await sql.connect(sqlConfig);

            const result = await sql.query`DELETE FROM Category WHERE category_id = ${categoryId}`;

            return result.rowsAffected[0] > 0;
            
        } catch (error) {
            //sql error
            console.error(error.message);
            return false;
        }
    },
}

module.exports = categoryService;