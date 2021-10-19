import * as express from 'express'
import {getRatioSchema} from '../schemas/ratio.schema'
import {postTaskSchema, getTaskSchema, putTaskSchema, deleteTaskSchema} from '../schemas/task.schema'
import { celebrate } from 'celebrate'


import {RatioController} from '../controllers/ratio.controller'
import {TaskController} from '../controllers/task.controller'

import {container} from 'tsyringe'

const ratioController = container.resolve(RatioController);
const taskController = container.resolve(TaskController);

export const router = express.Router()

router.get('/ratios', celebrate(getRatioSchema), ratioController.get)
router.get('/tasks', celebrate(getTaskSchema), taskController.get)
router.post('/tasks', celebrate(postTaskSchema), taskController.post)
router.put('/tasks/:id', celebrate(putTaskSchema), taskController.put)
router.delete('/tasks/:id', celebrate(deleteTaskSchema), taskController.delete)

