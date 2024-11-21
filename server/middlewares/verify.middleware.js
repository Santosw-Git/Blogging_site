
import jwt from "jsonwebtoken";
const VerifyJwt = (req,res,next)=>{
    const authHeader = req.headers["authorization"];    

    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).json({err: "No access token provided"});

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){ 
            return res.status(403).json({err: "Invalid accessToken"})
        }

        req.user = user._id;
        next();
        });

    
}
export {VerifyJwt};