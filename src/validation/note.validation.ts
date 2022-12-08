import Joi from "joi";

const create = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
});

const update = Joi.object({
    title: Joi.string(),
    body: Joi.string(),
}).min(1).message("Update query should have at least {#limit} key");

export default { create, update };
