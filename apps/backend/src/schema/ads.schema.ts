import Joi from 'joi';

export const adsSchema = Joi.object().keys({
    status: Joi.object().keys({
        isApproved: Joi.boolean(),
        isPublished: Joi.boolean(),
        isFeatured: Joi.boolean(),
        isActive: Joi.boolean(),
    }),
    adTitle: Joi.string().required(),
    category: Joi.string(),
    location: Joi.string(),
    tags: Joi.string().allow(''),
    itemCondition: Joi.string(),
    itemWarranty: Joi.string(),
    adType: Joi.string(),
    description: Joi.string(),
    specifications: Joi.string().allow(''),
    // priceDetails: Joi.object().keys({
    //     currency: Joi.string(),
    //     priceType: Joi.string(),
    //     price: Joi.number(),
    // }),
    priceDetails: Joi.string(),
    // personalInfo: Joi.object().keys({
    //     fullName: Joi.string(),
    //     email: Joi.string(),
    //     phone: Joi.string(),
    //     location: Joi.string(),
    // }),
    personalInfo: Joi.string(),
    specialNote: Joi.string().allow(''),
})
