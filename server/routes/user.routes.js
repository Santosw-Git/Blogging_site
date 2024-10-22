import {Router} from "express";
import {signupUser,signinUser} from "../controllers/user.controller.js";


const router = Router();
router.post("/signup",signupUser);
router.post("/signin",signinUser);
export default router;