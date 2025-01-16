import express from "express";
import { acceptRequest, GetMyFriends, getMyProfile, GetNotification, login, logoutUser, newUser, searchUser, sendRequest } from "../controllers/usercontroller.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { AcceptRequestValidator, loginValidator, registerValidator, SendRequestValidator, validateHandle } from "../lib/validator.js";

const app=express.Router()

app.post("/new",singleAvatar,registerValidator(),validateHandle,newUser)    //we have use the func_name() bcz...we want to return the array
app.post("/login",loginValidator(),validateHandle,login)    //https:localhost:3000/user/login

app.get("/me",isAuthenticated,getMyProfile)
app.get("/logout",isAuthenticated,logoutUser)
app.get("/search",isAuthenticated,searchUser)
app.put("/sendrequest",isAuthenticated,SendRequestValidator(),validateHandle,sendRequest)
app.put("/acceptrequest",isAuthenticated,AcceptRequestValidator(),validateHandle,acceptRequest)
app.get("/notification",isAuthenticated,GetNotification)
app.get("/friends",isAuthenticated,GetMyFriends)

export default app