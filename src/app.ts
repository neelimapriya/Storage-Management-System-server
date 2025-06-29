import express, { Application, Request, Response } from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
const app: Application = express();

// parser or middleware
app.use(express.json());
app.use(cookieParser());

// app.use("/api", router);
const getAController = (req: Request, res: Response) => {
  res.send("Storage Management System server is running!");
};
app.get('/', getAController);
export default app;