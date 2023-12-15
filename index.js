import express from 'express'
import { config } from 'dotenv'
import db_connection from './db/db_connection.js'
import errorHandler from './src/middlewares/errorHandler.js'
import userRouter from './src/modules/user/user.router.js'
import messageRouter from './src/modules/message/message.router.js'

const app = express()

config()
db_connection()

app.use(express.json())
app.use('/user', userRouter)
app.use('/message',messageRouter )


app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log('Server is listening in port 3000')
})