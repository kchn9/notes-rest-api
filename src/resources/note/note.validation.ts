import Joi from "joi";

// validation for create action
const create = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
});

export default { create };
