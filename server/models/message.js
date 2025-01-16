import mongoose,{ Schema,Types,model} from "mongoose";

const schema=new Schema({
    sender:{
        type:Types.ObjectId,
        ref:"User",
        required:true,
    },
    chat:{
        type:Types.ObjectId,
        ref:"Chat",
        required:true,
    },
    content:String,
    attachments:[
        {public_id:{
            type:String,
            
        },
        url:{
            type:String,
            
        }}
    ]
},{
    timestamps:true
})

export const Message=mongoose.models.Message||model("Message",schema)