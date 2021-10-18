import {Request, Response} from 'express'
import {RatioService} from '../services/ratios'

export class RatioController{
  service: RatioService
  constructor(service: RatioService){
    this.service = service
  }

   get = async (req : Request, res : Response) => {
    /*
    localhost:3000/api/ratios?completed=false&expired=false&get_productivity_ratio=false
      */
    
    const {error} = await this.service.validateGet(req.query);
    if (error) return res.status(400).send(error.details[0].message);
  
    this.service.get(req.query)
    .then((result) => res
      .status(200)
      .json(
      result
      )).catch((err) => res.status(400).send(err))
    }
  
}