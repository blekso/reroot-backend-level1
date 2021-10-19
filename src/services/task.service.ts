import {Task} from '../models/task.model'
import {postSchema, getSchema, putSchema} from '../schemas/task.schema'
import {Op} from 'sequelize'
import { ParsedQs } from 'qs';

export class TaskService {
     validateGet = async (req: ParsedQs) => { 
        return getSchema.validate(req);
    }
    
     validatePost = async (req: any) => { 
        return postSchema.validate(req);
    }
    
     validatePut = async (req: any) => { 
        return putSchema.validate(req);
    }
    
     get = async (filterQuery: ParsedQs) => {
    
    //error filter_by_title= cant be empty string
    
        const tasks = await Task.findAll({
            raw: true,
            offset: Number(filterQuery.page) * 5,
            limit: 5,
            where: {
            title: {
                [Op.like]: "%" + filterQuery.filter_by_title + "%",
            },
            completed: filterQuery.completed,
            },
            order: [["dueDate", String(filterQuery.sort_by_date)]],
        });
    
       return tasks
    }
    
     post = async (newTask: any) => {
            try{
                const task = await Task.create({
                    title: newTask.title,
                    dueDate: newTask.dueDate,
                    completed: newTask.completed,
                });
                return task
            } catch(err) {
                throw new Error('Error on create')
            }
            
        
    }
    put = async (id: string, updatedTask: any) => {

        //error filter_by_title= cant be empty string
        
        try{
            const task = await Task.findOne({
                raw: true,
                where: { id },
              })
              

            await Task.update(
            {
                title: updatedTask.title ? updatedTask.title : task!.title,
                dueDate: updatedTask.dueDate ? updatedTask.dueDate : task!.dueDate,
                completed: updatedTask.completed ? updatedTask.completed : task!.completed,
            },
            {
                where: {
                id
                },
            }
            )
            
            return `Task with id ${id} is updated`;
        } catch (err) {
            throw new Error(`Task with id ${id} doesnt exist`)
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
            throw new Error(`Task with id ${id} doesnt exist`)
          }
    }
}
