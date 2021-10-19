import {Joi, Segments} from 'celebrate'

export const postTaskSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    dueDate: Joi.string().max(10).required(),
    completed: Joi.boolean().required(),
  })
}

export const getTaskSchema = {
  [Segments.QUERY]: Joi.object({
    completed: Joi.boolean(),
    sort_by_date: Joi.string().max(4).required(),
    page: Joi.number().required(),
    filter_by_title: Joi.string().empty('').default('')
  })
}

export const putTaskSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().max(100),
    dueDate: Joi.string().max(10),
    completed: Joi.boolean(),
  }), 
  [Segments.PARAMS]: {
    id: Joi.number().required()
  }
} 

export const deleteTaskSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().required(),
  })
} 