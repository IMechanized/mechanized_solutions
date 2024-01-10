import Joi from 'joi'

export const bookmarkSchema = Joi.object({
    ads: Joi.string().required(),
    //   ads: Joi.string().allow(null, ''),
    note: Joi.string().allow(null, '')
})
