const yup = require('yup');

const softwareValidator = {
    create: yup.object({
        name: yup.string().min(5).max(100).required(),
        description: yup.string().min(10).max(250).optional().nullable().default(null),
        version: yup.string().min(1).max(50).required(),
        size: yup.number().positive().moreThan(0).max(9999).required(),
        sizeUnit: yup.string().oneOf(['o', 'Ko', 'Mo', 'Go', 'To']).required(),
        lang: yup.string().min(2).max(50).required(),
        link: yup.string().min(30).max(500).required(),
        softwareListId: yup.number().integer().positive().required(),
    }),
    
    // verifId: yup.object({
    //     id: yup.number().integer().positive().required(),
    // }),
};

module.exports = softwareValidator;