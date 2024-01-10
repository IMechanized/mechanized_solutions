import Joi from 'joi'

export const announcementSchema = Joi.object({
    announcement: Joi.string().required(),
})
