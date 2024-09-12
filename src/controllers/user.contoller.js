import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{
    const {
      username,
      email,
      fullname,
      password,
    } = req.body;
    if([username,email,password,fullname].some((fields)=>fields?.trim() === "")){
        throw new ApiError(400,"All fields are required")
    }
    const checkDublicateUserName = await User.findOne(username)
    const checkDublicateEmail = await User.findOne(username)
    if(checkDublicateUserName){
        throw new ApiError(409,"User already exist with same username")
    }
    if(checkDublicateEmail){
        throw new ApiError(409,"User already exist with same Email")
    }
    const avatarLocalPath =  await req.files?.avatar[0].path
    const coverImageLocalPath =  await req.files?.coverImage[0].path
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avtar){
        throw new ApiError(400,"Avatar is must required")
    }
    const user = await User.create({
        fullname,
        username,
        email,
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"Server Error")
    }
    return res.status(201).json(new ApiResponse(200,"User Created Successfully",createdUser))
})

export {registerUser}