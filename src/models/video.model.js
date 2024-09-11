import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
 const videoSchema = new mongoose.Schema({
    videofile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true,
    },
    //Above all 3 data came from cloudinary
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true,
        max:100
    },
    description:{
        type:String,
        required:true,
        max:500
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:false
    }
 },{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)//now we add aggregate pipline queries

 export const Video = mongoose.model("Video",videoSchema)