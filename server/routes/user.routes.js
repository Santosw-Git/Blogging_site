import {Router} from "express";
import {signupUser,signinUser,signinUserWithGoogle} from "../controllers/user.controller.js";
import {FileUpload} from "../controllers/file.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.post("/signup",signupUser);
router.post("/signin",signinUser);
router.post("/google-auth",signinUserWithGoogle);
router.post("/file-upload",upload.single("file") ,FileUpload);

export default router;