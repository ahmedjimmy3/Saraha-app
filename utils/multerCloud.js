import multer from "multer";

export function uploadFileCloud(){
    const storage = multer.diskStorage({}) //save file in system "temp"

    const multerUpload = multer({storage})
    return multerUpload
}