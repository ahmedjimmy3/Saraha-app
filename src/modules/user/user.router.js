import { Router } from "express";
import * as userController from './user.controller.js'
import asyncHandler from 'express-async-handler'

const router = Router()

router.post('/' , asyncHandler(userController.signup))
router.post('/login' , asyncHandler(userController.signIn))
router.put('/' , asyncHandler(userController.updateUser))
router.delete('/' , asyncHandler(userController.deleteUser))
router.get('/:_id' , asyncHandler(userController.getUser))

export default router