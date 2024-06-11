const yup = require('yup');

const categoryValidator = {
    create: yup.object({
        name: yup.string().min(2).max(100).required(),
    }),

    verifId: yup.object({
        id: yup.number().integer().positive().required(),
    }),

};

module.exports = categoryValidator;