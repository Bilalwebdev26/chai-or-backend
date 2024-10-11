import conectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

conectDB()
  .then(() => {
    app.listen(process.env.PORT || 8001, () => {
      console.log(`Server Started in PORT : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error in Server : ${err}`)
  });
