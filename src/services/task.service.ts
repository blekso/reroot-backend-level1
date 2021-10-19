import {Task, ITask} from '../models/task.model'
import {postSchema, getSchema, putSchema} from '../schemas/task.schema'
import {Op} from 'sequelize'
import { ParsedQs } from 'qs';

export class TaskService {
     validateGet = async (req: ParsedQs) => { 
        return getSchema.validate(req);
    }
    
     validatePost = async (req: ITask) => { 
        return postSchema.validate(req);
    }
    
     validatePut = async (req: ITask) => { 
        return putSchema.validate(req);
    }
    
     get = async (filterQuery: ParsedQs) => {
    
    //error filter_by_title= cant be empty string
    
        const tasks: ITask[] = await Task.findAll({
            raw: true,
            offset: Number(filterQuery.page) * 5,
            limit: 5,
            where: {
            title: {
                [Op.like]: "%" + filterQuery.filter_by_title + "%",
            },
            completed: filterQuery.completed,
            },
            order: [["dueDate", filterQuery.sort_by_date]],
        });
    
       return tasks
    }
    
     post = async (newTask: ITask) => {
    
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
    put = async (id: string, updatedTask: ITask) => {

        //error filter_by_title= cant be empty string
        
        try{
            const task: ITask = await Task.findOne({
                raw: true,
                where: { id: id },
              })
          
            await Task.update(
            {
                title: updatedTask.title ?? task!.title,
                dueDate: updatedTask.dueDate ?? task!.dueDate,
                completed: updatedTask.completed ?? task!.completed,
            },
            {
                where: {
                id: id,
                },
            }
            )
    
            return `Task with id ${id} is updated`;
        } catch (err) {
            return err
          }
        
    }

    delete = async (id: string) => {

        try {
            await Task.destroy({
              where: {
                id: id,
              },
            })
        
            return `Task with id ${id} is deleted`;
          } catch (err) {
            return err
          }
    }
}
