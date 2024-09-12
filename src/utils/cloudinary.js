import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary = async(localFilePath)=>{
        try {
            if(!localFilePath) return null;
           // if file present upload on cloudinary
           const res =  await cloudinary.uploader.upload(localFilePath,()=>{
            resource_type:"auto";
           })
           console.log("Response after file upload successfully on cloudinary : ",res);
           console.log("File uploaded successfully on Cloudinary");
           res.url;
           return res;

        } catch (error) {
            fs.unlinkSync(localFilePath)
            return null
        }
    }

    export {uploadOnCloudinary}