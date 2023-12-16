import { Router } from "express";
import * as userController from './user.controller.js'
import asyncWrapper from '../../../utils/asyncWrapper.js'

const router = Router()

router.post('/' , asyncWrapper(userController.signup))
router.post('/login' , asyncWrapper(userController.signIn))
router.put('/' , asyncWrapper(userController.updateUser))
router.delete('/' , asyncWrapper(userController.deleteUser))
router.get('/:_id' , asyncWrapper(userController.getUser))

export default router