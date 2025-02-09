
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import Blog from "../Schema/Blog.js";
import User from "../Schema/User.js";
import {nanoid} from "nanoid";

const FileUpload = asyncHandler (async (req,res)=>{

    const file = req.file?.path;
    const result = await uploadOnCloudinary(file);

    if(!result){
        return res.status(400).json({"error": "error uploading on cloudinary"});
    }

    return res.status(200).json({"url": result.url});
    
});

const PublishBlog = asyncHandler (async (req,res)=>{

    let {title,banner,content,des,tags,draft}  = req.body;

    let authorId = req.user;        

    if(!title.length) return res.status(404).json({"error": "Please give a title"});
    
    if(!des.length || des.length > 200) return res.status(404).json({"error": "Please give a description with less than 200 characters"});

    if(!banner.length) return res.status(404).json({"error": "Please upload a banner"});

    if(!content.blocks.length) return res.status(404).json({"error": "Please write something to publish"});

    if(!tags.length || tags.length > 5) return res.status(404).json({"error": "Please add some tags"});

    tags = tags.map(tag=>tag.toLowerCase())

    let blog_id = title.replace(/[^a-zA-Z0-9]/g, " ").replace(/\s+/g, "-").trim() + nanoid();

    let blog = new Blog({
        title,
        des,
        banner,
        content,
        tags,
        author:authorId,
        blog_id,
        draft:Boolean(draft),
    })

    await blog.save().then((blog)=>{
        let incrementValue = draft ? 0: 1;
        
        User.findOneAndUpdate({_id:authorId},{
            $inc:{"account_info.total_posts": incrementValue},
            $push:{"blogs":blog._id}
        }).then(user=>{
            
            return res.status(200).json({id:blog.blog_id})
        }).catch(err=>res.status(400).json({"error":err}))

    }).catch(err=>res.status(400).json({"error":err}))
    
});

const LatestBlog = asyncHandler(async (req,res)=>{
    let {page}=req.body;
    // console.log(page);
    
    const maxLimit = 5;

    Blog.find({draft:false})
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname -_id")
    .sort({"publishedAt":-1})
    .select("blog_id title des banner activity tags publishedAt -_id")
    .skip((page-1)*maxLimit)
    .limit(maxLimit)
    .then(blogs=>{
        return res.status(200).json({blogs})
    })
    .catch(err=>res.status(400).json({"error":err.message}))
})

const TrendingBlog = asyncHandler(async (req,res)=>{
    Blog.find({draft:false})
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname -_id")
    .sort({"activity.total_read":-1,"activity.total_likes":-1})
    .select("blog_id title  publishedAt -_id")
    .limit(4)
    .then(blogs=>{
        return res.status(200).json({blogs})
    })
    .catch(err=>res.status(400).json({"error":err.message}))

})

const SearchBlog = asyncHandler(async (req, res) => {  
    console.log("data received");
      

    let {tags} = req.body;

    let query = {tags: tags,draft:false};
    console.log(query);
    

    Blog.find(query)
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname -_id")
    .sort({"publishedAt":-1})
    .select("blog_id title des banner activity tags publishedAt -_id")
    .limit(4)
    .then(blogs=>{        
        return res.status(200).json({blogs})
    })
    .catch(err=>res.status(400).json({"error":err.message}))
})


const AllLatestBlogCount=asyncHandler(async (req, res) =>{
    // console.log("data");
    Blog.countDocuments({draft:false})
    .then(count=>{
        return res.status(200).json({totalDocs:count})
    })
    .catch(err=>res.status(400).json({"error":err.message}))
    
})


export { FileUpload
    ,PublishBlog
    ,LatestBlog
    ,TrendingBlog
    ,SearchBlog
    ,AllLatestBlogCount
};