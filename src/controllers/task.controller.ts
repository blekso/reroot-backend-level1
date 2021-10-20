import {Request, Response} from 'express'
import { autoInjectable } from 'tsyringe'
import {TaskService} from '../services/task.service'

@autoInjectable()
export class TaskController{
  service: TaskService
  constructor(service: TaskService){
    this.service = service
  }

   get = async (req : Request, res : Response): Promise<void> => {

    this.service.get(req.query)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).send(err));
  }
  
   post = async (req : Request, res : Response): Promise<void> => {

    this.service.post(req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).send(err));
  };
  
   put = async (req : Request, res : Response): Promise<void> => {

    this.service.put(req.params.id, req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).send(err));
      
  };
  
   delete = async (req : Request, res : Response): Promise<void> => {
     
    this.service.delete(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).send(err));
  };
  
}