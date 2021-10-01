import express, {Request, Response} from 'express'
import {Task} from '../models/Task'
import Joi from 'joi'
import {Op} from 'sequelize'
const router = express.Router();

router.get("/", async (req : Request, res : Response) => {
  /*
  "completed": false,
  "sort_by_date": "desc",
  "page": 0,
  "filter_by_title": ""*/

  const schama = Joi.object({
    completed: Joi.boolean(),
    sort_by_date: Joi.string().max(4).required(),
    page: Joi.number().required(),
    filter_by_title: Joi.string().empty("").default("default value"),
  });
  const { error } = schama.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const filterQuery = req.body;

  try {
    const tasks = await Task.findAll({
      offset: filterQuery.page * 5,
      limit: 5,
      where: {
        title: {
          [Op.like]: "%" + filterQuery.filter_by_title + "%",
        },
        completed: filterQuery.completed,
      },
      order: [["dueDate", filterQuery.sort_by_date.toUpperCase()]],
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req : Request, res : Response) => {
  /*
  title: '',
  dueDate: '2022-05-21',
  completed: false 
    */

  const schama = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    dueDate: Joi.string().max(10).required(),
    completed: Joi.boolean().required(),
  });
  const { error } = schama.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const task = await Task.create({
      title: req.body.title,
      dueDate: req.body.dueDate,
      completed: req.body.completed,
    });
    res.status(200).json(task);
  } catch (err) {
    res.send(err);
  }
});

router.put("/", async (req : Request, res : Response) => {
  /*
  "id": 4,
  "title": "zad4",
  "dueDate": "2022-05-21",
  "completed": false,
  */

  const schama = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().min(3).max(255),
    dueDate: Joi.string().max(10),
    completed: Joi.boolean(),
  });
  const { error } = schama.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    Task.findAll({
      where: { id: req.body.id },
    })
      .then((task) => {
        console.log(task[0].dataValues);
        Task.update(
          {
            title: req.body.title ? req.body.title : task[0].dataValues.title,
            dueDate: req.body.dueDate
              ? req.body.dueDate
              : task[0].dataValues.dueDate,
            completed: req.body.completed
              ? req.body.completed
              : task[0].dataValues.completed,
          },
          {
            where: {
              id: req.body.id,
            },
          }
        )
          .then((result) => {
            res.status(200).json(`Task with id ${req.body.id} is updated`);
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (err) {
    res.send(err);
  }
});

router.delete("/", async (req : Request, res : Response) => {
  /* id: 1 */

  const schama = Joi.object({
    id: Joi.number().required(),
  });
  const { error } = schama.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    Task.destroy({
      where: {
        id: req.body.id,
      },
    })
      .then((result) => {
        res.status(200).json(`Task with id ${req.body.id} is deleted`);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
