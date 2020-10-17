const Joi = require('joi');

const registerValidation = (data) => {
    const schema = {
        FullName: Joi.string().required().min(6).max(60),
        UserName: Joi.string().required().min(3).max(60),
        Email: Joi.string().required().max(60)
    };

    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;