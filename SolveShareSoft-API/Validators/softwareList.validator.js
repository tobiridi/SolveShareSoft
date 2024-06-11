const yup = require('yup');

const softwareListValidator = {
    create: yup.object({
        title: yup.string().min(5).max(100).required(),
        description: yup.string().min(10).max(250).optional().nullable().default(null),
        isPublic: yup.boolean().optional().default(false),
        categoryId: yup.number().integer().positive().required(),
    }),
};

module.exports = softwareListValidator;