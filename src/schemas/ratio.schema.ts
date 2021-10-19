import {Joi, Segments} from 'celebrate'

export const getRatioSchema = {
  [Segments.QUERY]: Joi.object().keys({
    completed: Joi.boolean().required(),
    expired: Joi.boolean().required(),
    get_productivity_ratio: Joi.boolean().required(),
  })
}
