import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user_route.js";
import mongoose from "mongoose";
/**
 * Init App
 */
dotenv.config();
const app = express();
app.use(express.json());

/**
 * Users Routes
 */
app.use("/users", userRouter);

/**
 * Handle not found page
 */
app.use("/", (req, res, next) => {
  res.status(404).json("not found");
});

/**
 * Connect To DB And Listen To Server
 */
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server running...");
    });
  })
  .catch((err) => {
    res.status(400).json(err.message);
  });
