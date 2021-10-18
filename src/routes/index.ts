import * as express from 'express'

import {RatioController} from '../controllers/ratios'
import {RatioService} from '../services/ratios'

import {TaskController} from '../controllers/tasks'
import {TaskService} from '../services/tasks'

const ratioService = new RatioService();
const ratioController = new RatioController(ratioService);

const taskService = new TaskService();
const taskController = new TaskController(taskService);

export const router = express.Router()

router.get('/ratios', ratioController.get)
router.get('/tasks', taskController.get)
router.post('/tasks', taskController.post)
router.put('/tasks/:id', taskController.put)
router.delete('/tasks/:id', taskController.delete)

