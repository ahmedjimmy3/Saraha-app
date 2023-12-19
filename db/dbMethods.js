import bcrypt from 'bcryptjs'

export const findOneMethod = async(modelType , query)=>{
    const data = await modelType.findOne(query)
    return data
}

export const hashPassword = (password)=>{
    const hashedPassword = bcrypt.hashSync(password , +process.env.SAULT_ROUNDS)
    return hashedPassword
}

export const createMethod = async (modelType , data)=>{
    const modelCreated  =await modelType.create(data)
    return modelCreated
}

export const comparePasswordMethod = (password , passwordInDb)=>{
    const checkPassword = bcrypt.compareSync(password , passwordInDb)
    return checkPassword
}

export const updateMethod = async(modelType , query , data)=>{
    const updateDone = await modelType.findByIdAndUpdate(query , {$set:data} , {new:true})
    return updateDone
}

export const deleteMethod = async(modelType , query)=>{
    const deleteDone = await modelType.findByIdAndDelete(query)
    return deleteDone
}

export const findByIDMethod = async(modelType , query)=>{
    const data = await modelType.findById(query)
    return data
}

export const findOneAndUpdateMethod = async(modelType, query , data)=>{
    const updateDone = await modelType.findOneAndUpdate(query , data , {new:true})
    return updateDone
}

export const listUserMessagesMethod = async(modelType , query)=>{
    const data = await modelType.find(query).sort({createdAt: -1})
    return data
}