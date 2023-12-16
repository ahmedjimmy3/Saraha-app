import Messages from "../../../db/models/message.model.js";
import User from "../../../db/models/user.model.js";
import * as dbMethods from '../../../db/dbMethods.js' 

export const createMessage = async(req,res)=>{
    const {content} = req.body
    const {sendTo} = req.params

    if(!content || !sendTo){
        return res.status(400).json({message:'All fields are required'})
    }

    const isUserFound = await dbMethods.findOneMethod(Messages, {sendTo:sendTo})
    if(!isUserFound){
        return res.status(404).json({message:'This user is not found'})
    }

    const send = await dbMethods.createMethod(Messages , {content , sendTo})
    if(!send){
        return res.status(400).json({message:'created failed'})
    }

    res.status(201).json({message:'message sent successfully'})
}

export const deleteMessage = async(req,res)=>{
    const {loggedInUSerId , messageId} = req.query

    const message = await dbMethods.deleteMethod(Messages , {_id:messageId , sendTo:loggedInUSerId})
    if(!message){
        return res.status(400).json({message:'deletion failed'})
    }

    res.status(200).json({message:'Message deleted successfully'})
}

export const markMessageAsRead = async(req,res,next)=>{  
    const {loggedInUserId , messageId } = req.query

    const message = await dbMethods.findOneAndUpdateMethod(
        Messages,
        {_id:messageId , sendTo:loggedInUserId , isViewed:false},
        {isViewed:true , $inc:{__v: 1}}
    )

    if(!message){
        return res.status(400).json({message:'Failed to update'})
    }

    res.status(200).json({message})
}

export const listUserMessages = async(req,res)=>{
    const {isViewed, loggedInUSerId} = req.query

    const messages = await dbMethods.listUserMessagesMethod(Messages,{sendTo: loggedInUSerId , isViewed})

    if(!messages.length){
        return res.status(404).json({message:'No messages yet'})
    }

    res.status(200).json(messages)
}