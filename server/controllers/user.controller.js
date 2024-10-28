import { asyncHandler } from "../utils/asyncHandler.js";
import { nanoid } from "nanoid";
import User from "../Schema/User.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {getAuth} from "firebase-admin/auth";

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

    await user.save()
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

const signinUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body;
    console.log(password, email);
    

    if(!email && !password){
        return res.status(403)
        .json({"error":"email and password are required"})
    }

    const user = await User.findOne(
        {
            $or:[{"personal_info.email":email},{"personal_info.password":password}]
        }
    )
    console.log(user);
    

    if(!user){
        return res.status(403)
        .json({"error":"email or password is incorrect"})
    }

    // console.log(password);
    

    const isPasswordValid = await user.isPasswordCorrect(password);
    console.log(isPasswordValid);
    
    if(!isPasswordValid){
        return res.status(403)
        .json({"error":"password is incorrect"})
    }

    return res.status(200).json(await formatDataToSend(user))

})

const signinUserWithGoogle = asyncHandler(async (req, res) => {

     const {accessToken} = req.body;

     const decodedToken = await getAuth().verifyIdToken(accessToken)
    //  console.log(decodedToken);

     const {email,name, picture} = decodedToken;

     let user = await User.findOne({"personal_info.email":email}).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth");

     if(!user){
         const username = await generateUsername(email);
         const newUser = new User({
             personal_info:{
                 fullname:name,
                 email,
                 username,
                 profile_img:picture
             },
             google_auth:true
         })
 
         user = await newUser.save()
        
         console.log("user",user);
         return res.status(200).json(await formatDataToSend(user))
     }

     else{
        if(!user.google_auth){
            return res.status(403).json({"error":"you are already signed in with a different account"})
        }
        return res.status(200).json(await formatDataToSend(user))
     }
})


export {
    signupUser,
    signinUser,
    signinUserWithGoogle
};