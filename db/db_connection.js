import mongoose from 'mongoose'

const db_connection = async()=>{
    await mongoose.connect(process.env.DB_CONNECTION_URL)
    .then(console.log('db connected successfully'))
    .catch((err)=> console.log('db connection failed', err))
}

export default db_connection