const softwareService = require("../Services/software.service");
const softwareListService = require("../Services/softwareList.service");
const softwareValidator = require('../Validators/software.validator')
const {ValidationError} = require('yup');

const softwareController = {
    createSoft: async (req, res, next) => {
        try {
            const validData = await softwareValidator.create.validate(req.body);
            
            //send to database
            const DBResult = await softwareService.create(validData);

            if (DBResult) {
                return res.status(201).json({ status: 201, message: 'Created' });
            }
            else {
                return res.status(500).json({ status: 500, message: `Software can not be saved` });
            }

        } catch (error) {
            //yup validation
            if (error instanceof ValidationError) {
                //console.error(error);
                return res.status(400).json({ status: 400, message: error.errors });
            }
            else {
                console.error(error);
                return res.status(500).json({ status: 500, message: `Internal Server Error` });
            }
        }
    },

    // deleteSoft: async (req, res, next) => {
    //     try {
    //         const validData = await softwareListValidator.verifId.validate(req.params);
    //         const userId = req.payload.user_id;
            
    //         //send to database
    //         //check if owner of the software list, protect from delete others
    //         const DBResult = await softwareListService.delete(userId, validData.id);

    //         if (DBResult) {
    //             return res.status(204).json({ status: 204, message: 'No content' });
    //         }
    //         else {
    //             //not existing in the database
    //             return res.status(404).json({ status: 404, message: `Software list with the id '${req.params.id}' not found` });
    //         }

    //     } catch (error) {
    //         //yup validation
    //         if (error instanceof ValidationError) {
    //             //console.error(error);
    //             return res.status(400).json({ status: 400, message: error.errors });
    //         }
    //         else {
    //             console.error(error);
    //             return res.status(500).json({ status: 500, message: `Internal Server Error` });
    //         }
    //     }
    // },

    // updateSoft: async (req, res, next) => {
    //     return res.status(501).json({msg: 'update not implemented'});
    // },
};


module.exports = softwareController;