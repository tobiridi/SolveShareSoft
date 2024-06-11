const categoryService = require("../Services/category.service");

const categoryController = {
    getAllCategory: async (req, res, next) => {
        const dbResult = await categoryService.getAll();

        if (dbResult) {
            return res.status(200).json({status : 200, data: dbResult});
        }

        return res.sendStatus(500);
    },

    createCategory: async (req, res, next) => {
        //TODO: add security only admin can add category
        return res.sendStatus(501);
    },

    deleteCategory: async (req, res, next) => {
        //TODO: add security only admin can delete category
        return res.sendStatus(501);
    },
};


module.exports = categoryController;