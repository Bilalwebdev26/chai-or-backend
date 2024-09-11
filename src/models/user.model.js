import mongoose from "mongoose";
import bycrypt from "bcrypt"
 const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    coverimage:{
        type:String
    },
    refreshToken:{
        type:string
    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ]
 },{timestamps:true})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        return next()
    }
    let saltrounds = 10
    this.password = bycrypt.hash(this.password,saltrounds)
    next()
})
userSchema.methods.isPassword = async function(password){
    return await bycrypt.compare(password,this.password)
}



 export const User = mongoose.model("User",userSchema)