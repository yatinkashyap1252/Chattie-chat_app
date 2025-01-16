import { body,check,param,validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

export const registerValidator=()=>[
    body("name","Please enter the name!").notEmpty(),
    body("username","Please enter the Username!").notEmpty(),
    body("bio","Please enter the Bio!").notEmpty(),
    body("password","Please enter the Password!").notEmpty(),
    // check("avatar","Please provide the Avatar!").notEmpty()
]

export const loginValidator=()=>[
    body("username","Please provide username!").notEmpty(),
    body("password","Please provide password!").notEmpty()
]

export const newGroupChatValidator=()=>[
    body("name","Please enter the Name!").notEmpty(),
    body("members")
    .notEmpty().withMessage("Please provide the Members!")
    .isArray({min:2,max:100}).withMessage("Members should be 2-100!")
]

export const addMemberValidator=()=>[
    body("chatId","Please provide the valid Chat ID").notEmpty(),
    body("members").notEmpty().withMessage("Please provide the members!").isArray({min:1,max:97}).withMessage("Members should be between 1-97!")
]

export const removeMemberValidator=()=>[
    body("chatId","Please provide the valid Chat ID").notEmpty(),
    body("userId","Please provide the valid Member ID").notEmpty(),
]

export const leaveGroupValidator=()=>[
    param("id","Please provide the chat ID").notEmpty()
]

export const sendAttachmentsValidator=()=>[
    body("chatId","Please provide the chat ID!").notEmpty(),
]

export const getMessageValidator=()=>[
    param("id","Please provide the valid ID!").notEmpty()
]

export const getChatDetailValidator=()=>[
    param("id","Please provide the valid ID!").notEmpty()
]

export const renameValidator=()=>[
    body("name","Please enter the name!").notEmpty(),
    param("id","Please provide the ID!").notEmpty(),
]

export const SendRequestValidator=()=>[
    body("userId","Please provide the valid User ID").notEmpty(),
]

export const AcceptRequestValidator=()=>[
    body("requestId","Please provide the request ID!").notEmpty(),
    body("accept").notEmpty().withMessage("Please provide accept!").isBoolean().withMessage("Please select status!")
]

export const AdminLoginValidator=()=>[
    body("secretKey","Please provide the secret key!").notEmpty()
]

export const validateHandle=(req,res,next)=>{
    const error=validationResult(req)
    const errorMessage=error.array().map((err)=>err.msg).join(',')

    // console.log(errorMessage)
    
    if(error.isEmpty()) 
        return next()
    else
        return next(new ErrorHandler(errorMessage,400))      
}