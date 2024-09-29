const Joi = require("joi");

const urlValidation = Joi.object({
    original_url: Joi.string().uri().required(),
    custom_url_path: Joi.string().optional(),
});

module.exports = {
    urlValidation
};