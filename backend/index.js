import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { setupSocket } from "./socket/socketHandler.js";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import codeRoutes from "./routes/codeRoutes.js"
import dotenv from 'dotenv'
import connectdb from './config/index.js'
dotenv.config()
const app=express()
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(cors({
    origin: "https://jattdontcare-is7awrl6f-aritra-sharmas-projects.vercel.app", 
    credentials: true
  }));
app.use(express.json());

// ✅ Middleware to parse URL-encoded data (optional)
app.use(express.urlencoded({ extended: true }));

// ✅ Middleware for cookies
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/code", codeRoutes);
setupSocket(io);
connectdb()
const PORT =5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

