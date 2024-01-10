import Joi from 'joi';

export const userSchema = Joi.object({
    fullName: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    },
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    isConfirmed: Joi.boolean(),
    role: Joi.object({
        isBuyer: Joi.boolean(),
        isSeller: Joi.boolean(),
        isAdmin: Joi.boolean(),
        isSuperAdmin: Joi.boolean(),
    }),
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

