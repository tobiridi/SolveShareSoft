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

    getAllOwnSoftLists: async (userId) => {
        try {
            await sql.connect(sqlConfig);

            const result = await sql.query`SELECT sfl.softwarelist_id, sfl.title, sfl.description, 
                    sfl.created, sfl.last_update, sfl.nbr_views, sfl.is_public, c.category_id, c.name AS [category_name]
                    FROM Softwarelist sfl
                    INNER JOIN Category c ON sfl.category_id = c.category_id
                    WHERE sfl.users_id = ${userId} `;

            return result.recordset;
            
        } catch (error) {
            //sql error
            console.error(error.message);
            return false;
        }
    },

    getSoftsFromSoftLists: async (userId) => {
        try {
            await sql.connect(sqlConfig);

            const result = await sql.query`SELECT sfl.softwarelist_id, sfl.title, sfl.description AS [softList_desc], 
                    sfl.created, sfl.last_update AS [softList_last_upd], sfl.nbr_views, sfl.is_public,
                    c.category_id, c.name AS [category_name],
                    soft.software_id, soft.name, soft.description AS [soft_desc], soft.version, soft.size,
                    soft.size_unit, soft.last_update AS [soft_last_upd], soft.lang, soft.nbr_downloads, soft.link
                    FROM Softwarelist sfl
                    INNER JOIN Category c ON sfl.category_id = c.category_id
                    LEFT JOIN Software soft ON soft.softwarelist_id = sfl.softwarelist_id
                    WHERE sfl.users_id = ${userId}`;

            return result.recordset;
            
        } catch (error) {
            //sql error
            console.error(error.message);
            return false;
        }
    },

    getSoftwaresFromSoftList: async (userId, softListId) => {
        try {
            await sql.connect(sqlConfig);

            //TODO: optimise

            const result = await sql.query`SELECT sfl.softwarelist_id, sfl.title, sfl.description AS [softList_desc], 
                    sfl.created, sfl.last_update AS [softList_last_upd], sfl.nbr_views, sfl.is_public,
                    c.category_id, c.name AS [category_name],
                    soft.software_id, soft.name, soft.description AS [soft_desc], soft.version, soft.size,
                    soft.size_unit, soft.last_update AS [soft_last_upd], soft.lang, soft.nbr_downloads, soft.link
                    FROM Softwarelist sfl
                    INNER JOIN Category c ON sfl.category_id = c.category_id
                    LEFT JOIN Software soft ON soft.softwarelist_id = sfl.softwarelist_id
                    WHERE sfl.users_id = ${userId} AND sfl.softwarelist_id = ${softListId}`;

            return result.recordset;
            
        } catch (error) {
            //sql error
            console.error(error.message);
            return false;
        }
    },
}

module.exports = softwareListService;