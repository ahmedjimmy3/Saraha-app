import bcrypt from 'bcryptjs'
import User from '../../../db/models/user.model.js'
import * as dbMethods from '../../../db/dbMethods.js'
import cloudinary from '../../../utils/cloud.js'
import generateUniqueString from '../../../utils/generateUniqueString.js'

export const signup = async(req,res)=>{
    const {username,email,password} = req.body

    const isUserNameDuplicate = await dbMethods.findOneMethod(User,{username:username})
    if(isUserNameDuplicate){
        return res.status(409).json({message:'Username already exist'})
    }

    const isEmailDuplicate = await dbMethods.findOneMethod(User,{email:email})
    if(isEmailDuplicate){
        return res.status(409).json({message:'Email already exist'})
    }

    const hashedPassword = dbMethods.hashPassword(password)

    const createdUser = await dbMethods.createMethod(User,{username,email,password:hashedPassword})
    if(!createdUser){
        return res.status(406).json({message:'Created failed'})
    }

    res.status(201).json({message:'User created', createdUser})
}

export const signIn = async(req,res)=>{
    const {username,email,password} = req.body

    const user = await dbMethods.findOneMethod(User,{$or:[{username:username} , {email:email}]})
    if(!user){
        return res.status(404).json({message:'Invalid credentials'})
    }

    const checkPassword = dbMethods.comparePasswordMethod(password , user.password)
    if(!checkPassword){
        return res.status(404).json({message:'Invalid credentials'})
    }

    res.status(200).json({message:'You are logged successfully'})
}

export const updateUser = async(req,res)=>{
    const {username,email} = req.body
    const {_id , loggedIn} = req.query

    if(_id != loggedIn){
        return res.status(401).json({message:'You are not authorized'})
    }

    if(username){
        const isUserNameFound = await dbMethods.findOneMethod(User,{username:username})
        if(isUserNameFound){
            return res.status(409).json({message:'username used before'})
        }
    }

    if(email){
        const isEmailFound = await dbMethods.findOneMethod(User,{email:email})
        if(isEmailFound){
            return res.status(409).json({message:'email used before'})
        }
    }

    const update = await dbMethods.updateMethod(User , _id , {username,email})
    if(!update){
        return res.status(400).json({message:'Update Failed'})
    }

    res.status(200).json({message:'Updated successfully' , update})
}

export const deleteUser = async(req,res)=>{
    const {_id , loggedIn} = req.query

    if(_id !== loggedIn){
        return res.status(401).json({message:'You are not authorized'})
    }

    const user = await dbMethods.deleteMethod(User , _id)
    if(!user){
        return res.status(400).json({message:'Delete Failed'})
    }

    res.status(200).json({message:'User deleted successfully'})
}

export const getUser = async(req,res)=>{
    const {_id} = req.params

    const user = await User.findById(_id).select('username email -_id')
    if(!user){
        return res.status(400).json({message:'User not found'})
    }

    res.status(200).json({user})
}

export const uploadImage = async(req,res)=>{
    const id = req.query._id
    const folderId = generateUniqueString()
    let images = []
    for (const file of req.files) {
        const {public_id , secure_url} = await cloudinary.uploader.upload(file.path , {
            folder:`users/${id}/${folderId}`,
            use_filename:true,
            unique_filename:false
        })
        images.push({public_id , secure_url,folderId})
    }
    await User.findByIdAndUpdate(id , {profilePic: images})
    res.status(200).json({message:'Success'})
}

export const deleteFolderImages = async(req,res)=>{
    const {folderId} = req.params
    const {id} = req.query
    let arrFolderId = []
    let arrPublicId = []
    const folderPath = `users/${id}/${folderId}`
    arrFolderId.push(folderPath)
    const user = await User.findById(id)
    const images = user.profilePic
    images.forEach(img => {
        arrPublicId.push(img['public_id'])
    });
    await cloudinary.api.delete_resources(arrPublicId)
    await cloudinary.api.delete_folder(arrFolderId)
    user.profilePic = undefined
    await user.save()
    res.status(200).json({message:'Deleted done successfully'})
}

export const updateImage = async(req,res)=>{
    const id = req.query._id
    const user = await User.findById(id)
    const {public_id , secure_url} = await cloudinary.uploader.upload(req.file.path,{public_id:user.profilePic.public_id})
    user.profilePic = {public_id , secure_url}
    await user.save()
    res.status(200).json({message:'success'})
}