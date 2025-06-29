import express, { Application, Request, Response } from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
const app: Application = express();

// parser or middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
const getAController = (req: Request, res: Response) => {
  res.send("Storage Management System server is running!");
};
app.get('/', getAController);
app.use(globalErrorHandler);
app.use(notFound);


export default app;