import app from "./app";
import mongoose from "mongoose";
import { Server } from "http";
import dotenv from "dotenv";
import config from "./app/config";
dotenv.config();
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);

    server = app.listen(config.port, () => {
      console.log(` Storage Management System App listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
