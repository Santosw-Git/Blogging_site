import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import User from "../Schema/User.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateUsername = async (email)=>{

    let username = email.split("@")[0];

    const isUsernameNotUnique = await User.exists({"personal_info.username": username})
    .then((result)=>{
        return result

    })

    isUsernameNotUnique ? username+= nanoid().substring(0,4) : "";
    return username;
    
}

const formatDataToSend = async (user)=>{

    const accessToken =  user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.personal_info.refreshToken = refreshToken;
    await user.save();  
    console.log("refreshToken",refreshToken);
    

    return {
        accessToken,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname
    }

}

const signupUser = asyncHandler(async (req, res) => {

    const { fullname, email, password } = req.body;
    // console.log(fullname.length);
    // console.log(!email.length);
    
    
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

   if(fullname.length < 3){
        return res.status(403)
        .json({"error":"fullname must be 3 letter long"});
    }

    if(!(email.length)){
        return res.status(403)
        .json({"error":"email is required"})
    }

    // console.log(email);

    if(!emailRegex.test(email)){
        return res.status(403)
        .json({"error":"invalid email"})
        
    }

    if(!(passwordRegex.test(password))){
        return res.status(403)
        .json({"error":"password should be 6-20 characters with a numeric, lowercase and uppercase letter"})
    }

    // const username = email.split("@")[0];
    const username = await generateUsername(email);
    console.log(username);
    

    const user = new User({
        personal_info:{
            fullname,
            email,
            password,
            username
        }
    })

    user.save()
    .then(async (user)=>{
        return res.status(200).json(await formatDataToSend(user))
    })
    .catch((error)=>{
        if(error.code === 11000){
            return res.status(403).json({"error":"email already exists"})
        }
        return res.status(500).json({"error":error.message})
    })

})

export default signupUser;