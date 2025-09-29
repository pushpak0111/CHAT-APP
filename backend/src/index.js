import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import messageRoutes from "./routes/message.route.js";

dotenv.config()
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const PORT = process.env.PORT;

app.use(express.json()); // allow to use json data in request body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(5001, () => {
    console.log("server is running on port: " + PORT);
    connectDB();
});