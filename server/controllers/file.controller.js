
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

const PublishBlog = asyncHandler (async (req,res)=>{

    const {title,banner,content,des,tags}  = req.body;

    let authorId = req.user;
    console.log(authorId);
    

    // if(!title.length) return res.status(404).json({"error": "Please give a title"});

    // if(!content.length) return res.status(404).json({"error": "Please write something"});

    // if(!banner.length) return res.status(404).json({"error": "Please upload a banner"});

    

    
});

export { FileUpload
    ,PublishBlog
};