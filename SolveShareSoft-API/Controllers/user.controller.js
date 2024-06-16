const bcrypt = require('bcrypt');
const userValidator = require('../Validators/user.validator');
const userService = require('../Services/user.service');
const {ValidationError} = require('yup');
const jwt = require('jsonwebtoken');
const softwareListService = require('../Services/softwareList.service');

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
                return res.status(201).json({status: 201, message: 'Created'});
            }
            else {
                return res.status(500).json({status: 500, message : `User can not be registered`});
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

    login: async (req, res, next) => {
        try {
            const validData = await userValidator.login.validate(req.body);

            const getUser = await userService.getByEmail(validData.email);

            if(getUser) {
                if(bcrypt.compareSync(validData.password, getUser.password)) {
                    const payload = {
                        user_id : getUser.users_id,
                        user_role : getUser.role,
                        user_status : getUser.status,
                    };
                    const accessToken = createJwt(payload);
                    return res.status(200).json({status : 200, data: {accessToken}});
                }
                else {
                    //password incorrect
                    return res.status(404).json({status : 404, message : `Email and/or password incorrect`});
                }
            }
            else {
                //email incorrect
                return res.status(404).json({status : 404, message : `Email and/or password incorrect`});
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

    getOwnSoftLists: async (req, res, next) => {
        const userId = req.payload.user_id;

        const dbResult = await softwareListService.getAllOwnSoftLists(userId);

        if (dbResult) {
            return res.status(200).json({ status: 200, data: dbResult });
        }

        return res.status(500).json({ status: 500, message: `Can not get software list` });
    },

    getSoftwaresFromSoftLists: async (req, res, next) => {
        const userId = req.payload.user_id;

        const dbResult = await softwareListService.getSoftsFromSoftLists(userId);

        if (dbResult) {
            return res.status(200).json({ status: 200, data: dbResult });
        }

        return res.status(500).json({ status: 500, message: `Can not get softwares from the software lists` });
    },
};

/**
 * Generate with the given payload a JSON Web Token string
 * @param {string | object | Buffer} payload Payload to sign
 * @returns {string}
 */
const createJwt = (payload) => {
    const secret = process.env.JWT_SECRET || undefined;

    const options = {
        algorithm: 'HS256',
        expiresIn: '2d',
    };

    return jwt.sign(payload, secret, options);
}

module.exports = userController;