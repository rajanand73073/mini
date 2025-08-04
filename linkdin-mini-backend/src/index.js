import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { initializeSocket } from "./socket.server.js";
import http from "http";




dotenv.config({
  path: "./.env",
});
const server = http.createServer(app);
initializeSocket(server);
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error; 
    });

    server.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB Connection Failed !!!", err);
});




