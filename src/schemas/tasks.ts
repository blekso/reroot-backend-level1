import Joi from 'joi'

export const postSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    dueDate: Joi.string().max(10).required(),
    completed: Joi.boolean().required(),
  });

export const getSchema = Joi.object({
    completed: Joi.boolean(),
    sort_by_date: Joi.string().max(4).required(),
    page: Joi.number().required(),
    filter_by_title: Joi.string().empty("").default("default value"),
  });

export const putSchema = Joi.object({
    title: Joi.string().max(100),
    dueDate: Joi.string().max(10),
    completed: Joi.boolean(),
 });