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
  
    const {error} = await this.service.validateGet(req.query);
    if (error) return res.status(400).send(error.details[0].message);
  
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
  
    const {error} = await this.service.validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    this.service.post(req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).send(err));
  };
  
   put = async (req : Request, res : Response): Promise<any> => {
    /*
    "title":"novi",
    "dueDate":"2023-09-21",
    "completed":true
     */
   
    const {error} = await this.service.validatePut(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
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