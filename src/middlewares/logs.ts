import { Request, Response, NextFunction } from "express";
import { logObject } from "../utils/logs";
import { REQUEST } from "../utils/constants";

// Log middleware, sends logs at the end of every request
export const logs = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", function () {
    logObject(
      {
        method: req.method,
        path: req.originalUrl,
        data: req.body,
        cookies: req.cookies,
        status: res.statusCode,
        message: res.statusMessage,
      },
      REQUEST
    );
  });
  next();
};
