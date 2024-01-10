import Joi from "joi";

export const filterSchema = Joi.object({
  adType: Joi.array().items(Joi.string()),
  itemWarranty: Joi.array().items(Joi.string()),
  itemCondition: Joi.array().items(Joi.string()),
  priceType: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string()),
});
