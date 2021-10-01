import express, {Request, Response} from 'express'
import {Task, ITask} from '../models/Task'
import {postSchema, getSchema, putSchema} from '../schemas/tasks'
import {Op} from 'sequelize'
const router = express.Router();

router.get("/", async (req : Request, res : Response) => {
  /*
  "completed": false,
  "sort_by_date": "desc",
  "page": 0,
  "filter_by_title": ""*/

  const { error } = getSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const filterQuery = req.body;

  try {
    const tasks: ITask[] = await Task.findAll({
      raw: true,
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

  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const task: ITask = await Task.create({
      title: req.body.title,
      dueDate: req.body.dueDate,
      completed: req.body.completed,
    });

    res.status(200).json(task);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req : Request, res : Response) => {
  /*
   /:id, -> in url
  "title": "zad4",
  "dueDate": "2022-05-21",
  "completed": false,
  */
 
  const { error } = putSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let task: ITask = await Task.findOne({
      raw: true,
      where: { id: req.params.id },
    })

    await Task.update(
      {
        title: req.body.title ? req.body.title : task.title,
        dueDate: req.body.dueDate
          ? req.body.dueDate
          : task.dueDate,

        //bug - if req.body.completed: false 
        completed: req.body.completed
          ? req.body.completed
          : task.completed,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )

    res.status(200).json(`Task with id ${req.params.id} is updated`);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", async (req : Request, res : Response) => {
  /*  /:id -> in url */ 

  try {
    await Task.destroy({
      where: {
        id: req.params.id,
      },
    })

    res.status(200).json(`Task with id ${req.params.id} is deleted`);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
