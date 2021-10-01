import {Task, ITask} from '../models/Task'
import express, {Request, Response} from 'express'
import {getSchema} from '../schemas/ratios'
import {Op} from 'sequelize'
import {getDate} from '../utils/utils'
const router = express.Router();

router.get("/", async (req : Request, res : Response) => {
  /*
  "completed": false,
  "expired": false,
  "get_productivity_ratio": false
   */

  const { error } = getSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const filterQuery = req.body;
  if (filterQuery.get_productivity_ratio) {
    try {
      const tasks: ITask[] = await Task.findAll({
        raw: true
      });
      let validTasks: number = 0;
      const date = new Date();

      tasks.forEach((el) => {
        if (
          (el.dueDate <= date && el.completed) ||
          el.completed
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
        const tasks: ITask[] = await Task.findAll({
          raw: true,
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
        const tasks: ITask[] = await Task.findAll({
          raw: true,
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
