import Joi from 'joi'

export const getSchema = Joi.object({
    completed: Joi.boolean().required(),
    expired: Joi.boolean().required(),
    get_productivity_ratio: Joi.boolean().required(),
  });