import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




const uploadOnCloudinary = async (localFilePath)=>{
    try {

        console.log('Cloudinary Credentials:', process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);

        console.log(localFilePath);
        
        if(!localFilePath) return null;
        //uplaod the file in cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        })
        //file has been uploaded successfully
        console.log("response: " + response);
        
        fs.unlinkSync(localFilePath);
        return response
        
        
    } catch (error) {
        console.log(error.message);
        
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file
        // as the upload operation got failed
        console.log("download");
        
        return null;
        
    }

}

export {uploadOnCloudinary}