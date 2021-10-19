import {Request, Response} from 'express'
import { autoInjectable } from 'tsyringe'
import {TaskService} from '../services/task.service'

@autoInjectable()
export class TaskController{
  service: TaskService
  constructor(service: TaskService){
    this.service = service
  }

   get = async (req : Request, res : Response): Promise<any> => {
    /*
    localhost:3000/api/tasks?completed=false&sort_by_date=desc&page=0&filter_by_title=zadatak1
     */
  
    this.service.get(req.query)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).send(err));
  }
  
   post = async (req : Request, res : Response): Promise<any> => {
    /*
      "title":"title",
      "dueDate":"2022-05-21",
      "completed":false
     */
  
    this.service.post(req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).send(err));
  };
  
   put = async (req : Request, res : Response): Promise<any> => {
    /*
    localhost:3000/api/tasks/4

    "title":"novi",
    "dueDate":"2023-09-21",
    "completed":true
     */
  
    this.service.put(req.params.id, req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).send(err));
      
  };
  
   delete = async (req : Request, res : Response): Promise<any> => {
    /*
    localhost:3000/api/tasks/4
     */

    this.service.delete(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).send(err));
  };
  
}