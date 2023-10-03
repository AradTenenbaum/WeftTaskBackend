import "reflect-metadata";
import express, { Application, NextFunction, Request, Response } from "express";
import { router as userRoutes } from "./routes/user.routes";
import { logs } from "./middlewares/logs";
import cors from "cors";
import { CLIENT_URL } from "./config";
import { DataSource } from "typeorm";

const app: Application = express();

export let dataSource: DataSource;

const makeApp = (_dataSource: DataSource) => {
  // Middleware
  app.use(
    cors({
      origin: CLIENT_URL,
    })
  );
  app.use(logs);
  app.use(express.json());

  app.use("/user", userRoutes);

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send({ message: "Server is running..." });
  });

  dataSource = _dataSource;

  return app;
};

export default makeApp;
