import {Task, ITask} from '../models/task.model'
import {getSchema} from '../schemas/ratio.schema'
import {Op} from 'sequelize'

export class RatioService {
  validateGet = async (req: any) => { 
    return getSchema.validate(req);
  }

  get = async (filterQuery: any) => {

    if (filterQuery.get_productivity_ratio) {
      const tasks: ITask[]= await Task.findAll({
        raw: true
      });
      let validTasks: number = 0;
  
      tasks.forEach((el) => {
        if (el.completed) validTasks++
      });
      return `Ratio of completed tasks in their due date is: ${validTasks / tasks.length}`
    } else {
      if (filterQuery.expired) {
        const tasks: ITask[] = await Task.findAll({
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
        const tasks: ITask[] = await Task.findAll({
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