const bcrypt = require('bcrypt');
const userValidator = require('../Validators/user.validator');
const userService = require('../Services/user.service');
const {ValidationError} = require('yup')

const userController = {
    register: async (req, res, next) => {
        try {
            //validate user data
            const validData = await userValidator.register.validate(req.body);

            //hash password
            const hashPwd = bcrypt.hashSync(validData.password, 10);
            validData ["hashPwd"] = hashPwd;

            //send to database
            const DBResult = await userService.register(validData);

            if(DBResult) {
                return res.sendStatus(201);
            }
            else {
                return res.status(500).json({code : 500, message : `User can not be registered`});
            }

        } catch (error) {
            //yup validation
            if(error instanceof ValidationError) {
                //console.error(error);
                return res.status(400).json(error.errors);
            }
            else {
                console.error(error);
                return res.sendStatus(500);
            }
        }
    },

    
};

module.exports = userController;