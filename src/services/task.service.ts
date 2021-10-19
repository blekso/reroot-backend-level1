import {Task, TaskInput} from '../models/task.model'
import {Op} from 'sequelize'
import { ParsedQs } from 'qs';

export class TaskService {
     get = async (filterQuery: ParsedQs): Promise<Task[]> => {

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
    
     post = async (newTask: TaskInput): Promise<Task> => {
         
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
    put = async (id: string, updatedTask: TaskInput): Promise<string> => {
        
         try {
            var task = await Task.findOne({
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
            throw new Error('Error on update')
          }
        
    }

    delete = async (id: string): Promise<string> => {

        try {
            await Task.destroy({
              where: {
                id: id,
              },
            })
        
            return `Task with id ${id} is deleted`;
          } catch (err) {
            throw new Error('Error on delete')
          }
    }
}
