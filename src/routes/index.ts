import * as express from 'express'

import {RatioController} from '../controllers/ratio.controller'
import {RatioService} from '../services/ratio.service'

import {TaskController} from '../controllers/task.controller'
import {TaskService} from '../services/task.service'

import {container} from 'tsyringe'

const ratioController = container.resolve(RatioController);
const taskController = container.resolve(TaskController);

export const router = express.Router()

router.get('/ratios', ratioController.get)
router.get('/tasks', taskController.get)
router.post('/tasks', taskController.post)
router.put('/tasks/:id', taskController.put)
router.delete('/tasks/:id', taskController.delete)

