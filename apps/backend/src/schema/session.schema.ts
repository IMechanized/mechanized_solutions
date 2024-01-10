import Joi from 'joi';

export const sessionSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
})
