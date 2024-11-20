import {Router} from "express";
import {signupUser,signinUser,signinUserWithGoogle} from "../controllers/user.controller.js";
import {FileUpload,PublishBlog} from "../controllers/file.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyJwt } from "../middlewares/verify.middleware.js";
const router = Router();
router.post("/signup",signupUser);
router.post("/signin",signinUser);
router.post("/google-auth",signinUserWithGoogle);
router.post("/file-upload",upload.single("file") ,FileUpload);
router.post("/publish-form",VerifyJwt,PublishBlog);

export default router;