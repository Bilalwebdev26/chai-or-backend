import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{
    const {
      username,
      email,
      fullName,
      password,
    } = req.body;
    if([username,email,password,fullName].some((fields)=>fields?.trim() === "")){
        throw new ApiError(400,"All fields are required")
    }
    const checkDublicateUserName = await User.findOne({username})
    const checkDublicateEmail = await User.findOne({email})
    if(checkDublicateUserName){
        throw new ApiError(409,"User already exist with same username")
    }
    if(checkDublicateEmail){
        throw new ApiError(409,"User already exist with same Email")
    }
    
    const avatarLocalPath =   req.files?.avatar[0]?.path
    // const coverImageLocalPath =  await req.files?.coverImage[0].path
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath=req.files.coverImage[0].path
    }
    console.log("before avatar local path")
    console.log('req.files:', req.files);
console.log('req.files?.avatar:', req.files?.avatar);
console.log('req.files?.avatar[0]:', req.files?.avatar[0]);
console.log('req.files?.avatar[0]?.path:', req.files?.avatar[0]?.path);
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatarlocalfile file is required")
    }
    console.log("after avatar local path")
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400,"Avatar is must required")
    }
    const user = await User.create({
        fullName,
        username,
        email,
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"Server Error while register user")
    }
    return res.status(201).json(new ApiResponse(200,"User Created Successfully",createdUser))
})

export {registerUser}