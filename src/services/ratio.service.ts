import {Task} from '../models/task.model'
import {Op} from 'sequelize'
import { ParsedQs } from 'qs';

export class RatioService {
  get = async (filterQuery: ParsedQs): Promise<string> => {

    if (filterQuery.get_productivity_ratio) {
      const tasks= await Task.findAll({
        raw: true
      });
      let validTasks: number = 0;
  
      tasks.forEach((el) => {
        if (el.completed) validTasks++
      });
      return `Ratio of completed tasks in their due date is: ${validTasks / tasks.length}`
    } else {
      if (filterQuery.expired) {
        const tasks = await Task.findAll({
          raw: true,
          where: {
            completed: filterQuery.completed,
            dueDate: {
              [Op.lte]: new Date(),
            },
          },
        });
      return `Number of expired tasks which are set to completed: ${filterQuery.completed} equals to: ${tasks.length}`
      } else {
        const tasks = await Task.findAll({
          raw: true,
          where: {
            completed: filterQuery.completed,
          },
        });
        return `Number of tasks which are set to completed: ${filterQuery.completed}  equals to: ${tasks.length}`
      }
    }
  }
}