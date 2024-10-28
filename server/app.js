import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import admin from "firebase-admin";
import serviceAccountKey from "./blogging-102a1-firebase-adminsdk-dt30u-bd58786a82.json" assert { type: "json" };
const server = express();
server.use(cors());

server.use(express.json({limit: "16kb"}));
server.use(express.urlencoded({extended: true,limit: "16kb"}));
server.use(express.static('public'));
server.use(cookieParser());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),

})

//routes import
import router from "./routes/user.routes.js";

//routes declaration
server.use("/api/v1/users",router);


export {server};

//  when you use app.use() in an Express application, it is initialized as soon as the file in which it's defined is executed. Essentially, when the Express application is started, all middleware and routes defined with .use() are immediately set up and ready to handle incoming requests.