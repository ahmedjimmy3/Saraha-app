import { Router } from "express";
import * as messageController from './message.controller.js'
import asyncHandler from 'express-async-handler'

const router = Router()

router.post('/:sendTo' , asyncHandler(messageController.createMessage))
router.delete('/' , asyncHandler(messageController.deleteMessage))
router.put('/' , asyncHandler(messageController.markMessageAsRead))
router.get('/' , asyncHandler(messageController.listUserMessages))
export default router