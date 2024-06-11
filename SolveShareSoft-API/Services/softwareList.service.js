const sql  = require('mssql');
const sqlConfig = require('../Config/sqlConfig');

const softwareListService = {
    getAllPublicList: async () => {
        try {
            await sql.connect(sqlConfig);

            const result = await sql.query`SELECT sfl.softwarelist_id, sfl.title, sfl.description, 
            sfl.created, sfl.last_update, sfl.nbr_views, c.name AS [category], u.username AS [owner]
            FROM Softwarelist sfl
            INNER JOIN Users u ON u.users_id = sfl.users_id
            INNER JOIN Category c ON sfl.category_id = c.category_id
            WHERE is_public = 1`;

            return result.recordset;
            
        } catch (error) {
            //sql error
            console.error(error.message);
            return false;
        }
    },

    // create: async (data) => {
    //     try {
    //         await sql.connect(sqlConfig);

    //         const { title, description, categoryId, userId } = data;

    //         const result = await sql.query`INSERT INTO Softwarelist (title, description, category_id, users_id) VALUES (${title}, ${description}, ${categoryId}, ${userId})`;

    //         return result.rowsAffected[0] > 0;
            
    //     } catch (error) {
    //         //sql error
    //         console.error(error.message);
    //         return false;
    //     }
    // },

    // delete: async (softListId) => {
    //     try {
    //         await sql.connect(sqlConfig);

    //         const result = await sql.query`DELETE FROM Softwarelist WHERE softwarelist_id = ${softListId}`;

    //         return result.rowsAffected[0] > 0;
            
    //     } catch (error) {
    //         //sql error
    //         console.error(error.message);
    //         return false;
    //     }
    // },
}

module.exports = softwareListService;