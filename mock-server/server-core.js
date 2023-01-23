import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
app.options("*", cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export { app, io, sleep, httpServer };
