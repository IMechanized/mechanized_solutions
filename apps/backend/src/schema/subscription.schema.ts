import Joi from 'joi'

export const subscriptionSchema = Joi.object({
    subscriptionEmail: Joi.string().required(),
})
