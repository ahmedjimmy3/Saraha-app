import { customAlphabet } from 'nanoid'

const generateUniqueString = (length)=>{
    const nanoid = customAlphabet('123456ahmed' , length||5)
    return nanoid()
}
export default generateUniqueString