import Joi, { any } from 'joi'

export const packageSchema = Joi.object({
    packageName: Joi.string(),
    // subtitle: Joi.string().empty(''),
    // subTitleStatus: Joi.boolean(),
    // shortDesc: Joi.string(),
    packageColor: Joi.string(),
    pricing: Joi.number(),
    currency: Joi.string(),
    frequency: Joi.string(),
    // buttonText: Joi.string(),
    validity: Joi.number(),
    totalAds: Joi.number(),
    featuredAds: Joi.number(),
    services: Joi.array().items(
        Joi.object().keys({
            id: Joi.any(),
            name: Joi.string(),
            details: Joi.string(),
            active: Joi.boolean(),
        })
    ),
})
