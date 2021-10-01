import {Task} from '../models/Task'
import express, {Request, Response} from 'express'
import Joi from 'joi'
import {Op} from 'sequelize'
const router = express.Router();

function getDate() : string {
  let d = new Date();
  let yyyy = d.getFullYear();
  let mm = d.getMonth() + 1;
  let dd = d.getDate();

  return `${yyyy}-${mm}-${dd}`;
}

router.get("/", async (req : Request, res : Response) => {
  /*
  "completed": false,
  "expired": false,
  "get_productivity_ratio": false
   */

  const schema = Joi.object({
    completed: Joi.boolean().required(),
    expired: Joi.boolean().required(),
    get_productivity_ratio: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const filterQuery = req.body;
  if (filterQuery.get_productivity_ratio) {
    try {
      const tasks = await Task.findAll();
      let validTasks = 0;
      const date = new Date();

      tasks.forEach((el) => {
        if (
          (el.dataValues.dueDate <= date && el.dataValues.completed) ||
          el.dataValues.completed
        ) {
          validTasks++;
        }
      });

      res
        .status(200)
        .json(
          "Ratio of completed tasks in their due date is: " +
            validTasks / tasks.length
        );
    } catch (err) {
      res.send(err);
    }
  } else {
    try {
      if (filterQuery.expired) {
        const tasks = await Task.findAll({
          where: {
            completed: filterQuery.completed,
            dueDate: {
              [Op.lte]: getDate(),
            },
          },
        });
        res
          .status(200)
          .json(
            "Number of expired tasks which are set to completed: " +
              filterQuery.completed +
              " equals to: " +
              tasks.length
          );
      } else {
        const tasks = await Task.findAll({
          where: {
            completed: filterQuery.completed,
          },
        });
        res
          .status(200)
          .json(
            "Number of tasks which are set to completed: " +
              filterQuery.completed +
              " equals to: " +
              tasks.length
          );
      }
    } catch (err) {
      res.send(err);
    }
  }
});

module.exports = router;
