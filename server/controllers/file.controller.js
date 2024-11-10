
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";


const FileUpload = asyncHandler (async (req,res)=>{

    console.log("Uploading")
    const file = req.file?.path;
    console.log(file);
    

    const result = await uploadOnCloudinary(file);
    console.log("result: " + result);
    
    
    
    




});

export { FileUpload};