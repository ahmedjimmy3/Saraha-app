import { Router } from "express";
import * as messageController from './message.controller.js'
import asyncWrapper from '../../../utils/asyncWrapper.js'


const router = Router()

router.post('/:sendTo' , asyncWrapper(messageController.createMessage))
router.delete('/' , asyncWrapper(messageController.deleteMessage))
router.put('/' , asyncWrapper(messageController.markMessageAsRead))
router.get('/' , asyncWrapper(messageController.listUserMessages))
export default router