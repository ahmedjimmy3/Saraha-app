import multer from "multer";

export function uploadFileCloud(){
    const storage = multer.diskStorage({
        filename: function(req,file,cb){
            cb(null, file.originalname)
        }
    }) //save file in system "temp"

    const multerUpload = multer({storage})
    return multerUpload
}