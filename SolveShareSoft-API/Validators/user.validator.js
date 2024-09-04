const yup = require('yup');

const userValidator = {
    register: yup.object({
        email: yup.string().email().min(10).max(200).required(),
        password: yup.string().min(8).max(50).required(),
        username: yup.string().min(3).max(50).required(),
        website: yup.string().url().min(10).max(200).optional().nullable().default(null),
        pays: yup.string().min(3).max(100).optional().nullable().default(null),
        biography: yup.string().min(15).max(250).optional().nullable().default(null)
    }),

    login: yup.object({
        email: yup.string().email().min(10).max(200).required(),
        password: yup.string().min(8).max(50).required(),
    }),

};

module.exports = userValidator;