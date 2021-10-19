import {Request, Response} from 'express'
import { autoInjectable } from 'tsyringe'
import {RatioService} from '../services/ratio.service'

@autoInjectable()
export class RatioController{
  service: RatioService
  constructor(service: RatioService){
    this.service = service
  }

   get = async (req : Request, res : Response) => {
    /*
    localhost:3000/api/ratios?completed=false&expired=false&get_productivity_ratio=false
      */

    this.service.get(req.query)
    .then((result) => res
      .status(200)
      .json(
      result
      )).catch((err) => res.status(400).send(err))
    }
  
}