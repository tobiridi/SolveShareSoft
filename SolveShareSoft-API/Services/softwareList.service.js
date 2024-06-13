const sql  = require('mssql');
const sqlConfig = require('../Config/sqlConfig');

const softwareListService = {
    getAllPublicList: async () => {
        try {
            await sql.connect(sqlConfig);

            const result = await sql.query`SELECT sfl.softwarelist_id, sfl.title, sfl.description, 
                    sfl.created, sfl.last_update, sfl.nbr_views, c.category_id, c.name AS [category_name], u.username AS [owner]
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

    create: async (userId, softListData) => {
        try {
            await sql.connect(sqlConfig);

            const { title, description, categoryId, isPublic } = softListData;

            const result = await sql.query`INSERT INTO Softwarelist (title, description, is_public, category_id, users_id) 
                    VALUES (${title}, ${description}, ${isPublic}, ${categoryId}, ${userId})`;

            return result.rowsAffected[0] > 0;
            
        } catch (error) {
            //sql error
            console.error(error.message);
            return false;
        }
    },

    delete: async (userId, softListId) => {
        try {
            await sql.connect(sqlConfig);

            const result = await sql.query`DELETE FROM Softwarelist 
                    WHERE softwarelist_id = ${softListId} AND users_id = ${userId}`;

            return result.rowsAffected[0] > 0;
            
        } catch (error) {
            //sql error
            console.error(error.message);
            return false;
        }
    },
}

module.exports = softwareListService;