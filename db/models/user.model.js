import { Schema , model } from "mongoose";

const userSchema = new Schema(
    {
        username:{
            type:String,
            unique:true,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        isConfirmed:{
            type:Boolean,
            default:true
        },
        profilePic:{
            type:String
        }
    },
    {timestamps:true}
)
const User = model('user', userSchema)
export default User