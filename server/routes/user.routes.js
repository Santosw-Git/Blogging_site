import {Router} from "express";
import {signupUser,signinUser,signinUserWithGoogle} from "../controllers/user.controller.js";


const router = Router();
router.post("/signup",signupUser);
router.post("/signin",signinUser);
router.post("/google-auth",signinUserWithGoogle);
export default router;