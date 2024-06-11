const yup = require('yup');

const categoryValidator = {
    create: yup.object({
        name: yup.string().min(2).max(100).required(),
    }),

};

module.exports = categoryValidator;