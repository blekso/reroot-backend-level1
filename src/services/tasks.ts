import {Task, ITask} from '../models/Task'
import {postSchema, getSchema, putSchema} from '../schemas/tasks'
import {Op} from 'sequelize'

export class TaskService {
     validateGet = async (req: any) => { 
        return getSchema.validate(req);
    }
    
     validatePost = async (req: any) => { 
        return postSchema.validate(req);
    }
    
     validatePut = async (req: any) => { 
        return putSchema.validate(req);
    }
    
     get = async (filterQuery: any) => {
    
    //error filter_by_title= cant be empty string
    
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
    
       return tasks
    }
    
     post = async (newTask: any) => {
    
        try {
            const task: ITask = await Task.create({
                title: newTask.title,
                dueDate: newTask.dueDate,
                completed: newTask.completed,
            });
    
        return task
        } catch (err) {
        return err
        } 
    }
    put = async (req: any) => {

        //error filter_by_title= cant be empty string
        
        try{
            const task: ITask = await Task.findOne({
                raw: true,
                where: { id: req.params.id },
              })
          
            await Task.update(
            {
                title: req.body.title ?? task.title,
                dueDate: req.body.dueDate ?? task.dueDate,
                completed: req.body.completed ?? task.completed,
            },
            {
                where: {
                id: req.params.id,
                },
            }
            )
    
            return `Task with id ${req.params.id} is updated`;
        } catch (err) {
            return err
          }
        
    }

    delete = async (req: any) => {

        try {
            await Task.destroy({
              where: {
                id: req.params.id,
              },
            })
        
            return `Task with id ${req.params.id} is deleted`;
          } catch (err) {
            return err
          }
    }
}
