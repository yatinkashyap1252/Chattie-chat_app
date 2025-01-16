import express from "express";
import { AdminLogin, AdminLogout, Dashboard, getAdminData, GetAllChats, getAllMessages, GetAllUsers } from "../controllers/adminController.js";
import { AdminLoginValidator, validateHandle } from "../lib/validator.js";
import { isAdmin } from "../middlewares/auth.js";

const app=express.Router()

app.post("/verification",AdminLoginValidator(),validateHandle,AdminLogin)
app.get("/logout",AdminLogout)
app.use(isAdmin)
app.get("/",getAdminData)
app.get("/users",GetAllUsers)
app.get("/messages",getAllMessages)
app.get("/chats",GetAllChats)
app.get("/stats",Dashboard)

export default app