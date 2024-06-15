const sql  = require('mssql');
const sqlConfig = require('../Config/sqlConfig');

const softwareService = {
    create: async (softData) => {
        try {
            await sql.connect(sqlConfig);

            const { name, description, version, size, sizeUnit, lang, link, softwareListId } = softData;

            const result = await sql.query`INSERT INTO Software 
                    (name, description, version, size, size_unit, lang, link, softwarelist_id) 
                    VALUES (${name}, ${description}, ${version}, ${size}, ${sizeUnit}, ${lang}, ${link}, ${softwareListId})`;

            return result.rowsAffected[0] > 0;
            
        } catch (error) {
            //sql error
            console.error(error.message);
            return false;
        }
    },

    delete: async (userId, softId) => {
        try {
            await sql.connect(sqlConfig);

            const result = await sql.query`DELETE FROM Software
                    WHERE software_id = ${softId}
                    AND softwarelist_id = ANY (SELECT softwarelist_id FROM Softwarelist WHERE users_id = ${userId})`;

            return result.rowsAffected[0] > 0;
            
        } catch (error) {
            //sql error
            console.error(error.message);
            return false;
        }
    },
}

module.exports = softwareService;