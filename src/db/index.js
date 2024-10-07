import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const conectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`Connection : ${connectionInstance}`);
    console.log(`Connection . connect : ${connectionInstance.connect}`);
    console.log(
      `MONGODB connected successfully !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MONGODB connection failed : ${error}`);
    process.exit(1);
  }
};

export default conectDB;
