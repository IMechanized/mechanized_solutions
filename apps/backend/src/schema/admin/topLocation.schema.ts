import Joi from 'joi'

export const topLocationchema = Joi.object({
    topLocations: Joi.array().items(Joi.string()),

})
