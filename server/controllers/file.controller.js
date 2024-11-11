
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";


const FileUpload = asyncHandler (async (req,res)=>{

    const file = req.file?.path;
    // console.log(file);
    const result = await uploadOnCloudinary(file);

    if(!result){
        return res.status(400).json({"error": "error uploading on cloudinary"});
    }

    return res.status(200).json({"url": result.url});
    

});

export { FileUpload};