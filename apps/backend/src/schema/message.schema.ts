import Joi from 'joi'
// create message schema
export const messageSchemaValidation = Joi.object({
    ads: Joi.string().required(),
    time: Joi.string().required(),
    members: Joi.object({
        buyer: Joi.string().required(),
        seller: Joi.string().required(),
    }),
    messages: Joi.array()
        .items(
            Joi.object().keys({
                sender: Joi.string().required(),
                reciver: Joi.string().required(),
                message: Joi.string().required(),
                timestamp: Joi.string().required(),
            })
        )
        .required(),
})
