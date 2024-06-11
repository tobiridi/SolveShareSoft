const categoryService = require("../Services/category.service");
const categoryValidator = require("../Validators/category.validator");
const {ValidationError} = require('yup');

const categoryController = {
    getAllCategory: async (req, res, next) => {
        const dbResult = await categoryService.getAll();

        if (dbResult) {
            return res.status(200).json({status : 200, data: dbResult});
        }

        return res.status(500).json({status: 500, message : `Can not get categories`});
    },

    createCategory: async (req, res, next) => {
        //TODO: add security only admin can add category
        try {
            const validData = await categoryValidator.create.validate(req.body);

            //send to database
            const DBResult = await categoryService.create(validData);

            if(DBResult) {
                return res.status(201).json({status: 201, message: 'Created'});
            }
            else {
                return res.status(500).json({status: 500, message : `Category can not be saved`});
            }

        } catch (error) {
            //yup validation
            if(error instanceof ValidationError) {
                //console.error(error);
                return res.status(400).json({status: 400, message: error.errors});
            }
            else {
                console.error(error);
                return res.status(500).json({status: 500, message: `Internal Server Error`});
            }
        }
    },

    deleteCategory: async (req, res, next) => {
        //TODO: add security only admin can delete category
        return res.sendStatus(501);
    },
};


module.exports = categoryController;