import mongoose,{ Schema,model} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:[1,"PLease provide a valid name!"]
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    bio:{
        type:String,
        required:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    }
},{
    timestamps:true
})

schema.pre("save",async function(next){
    if(!this.isModified("password")){
       return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    return;
})

schema.methods.genToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

export const User=mongoose.models.User||model("User",schema)