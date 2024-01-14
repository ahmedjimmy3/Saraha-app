import { Router } from "express";
import * as userController from './user.controller.js'
import asyncWrapper from '../../../utils/asyncWrapper.js'
import { uploadFileCloud } from "../../../utils/multerCloud.js";

const router = Router()

router.post('/' , asyncWrapper(userController.signup))
router.post('/login' , asyncWrapper(userController.signIn))
router.put('/' , asyncWrapper(userController.updateUser))
router.delete('/' , asyncWrapper(userController.deleteUser))
router.get('/:_id' , asyncWrapper(userController.getUser))
// ====================================cloudinary=================
router.post('/upload' , uploadFileCloud().array('pp') ,asyncWrapper(userController.uploadImage))
router.delete('/deleteImages/:folderId' ,asyncWrapper(userController.deleteFolderImages))
router.patch('/update_profilePic' , uploadFileCloud().single('pp') ,asyncWrapper(userController.updateImage))
export default router