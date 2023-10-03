import "reflect-metadata";
import { DataSource } from "typeorm";
import { logMessage, logObject } from "../utils/logs";
import { BASE_STATUSES, ERROR } from "../utils/constants";
import {
  DB_HOST,
  DB_IS_SYNC,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  NODE_ENV,
} from "../config";
import { User } from "../entity/User";
import { Status } from "../entity/Status";
import { addStatus, getStatuses } from "../services/status.service";
import { createRandomUser } from "../utils/random";
import { addNewUserToDB } from "../services/user.service";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT as string),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User, Status],
  synchronize: DB_IS_SYNC === "true",
  logging: NODE_ENV !== "production",
});

const addBaseStatuses = async () => {
  const dbStatuses = await getStatuses();
  BASE_STATUSES.forEach((baseStatus) => {
    const statusIndexFromDB = dbStatuses.findIndex(
      (dbStatus) => dbStatus.description === baseStatus
    );
    if (statusIndexFromDB === -1) {
      addStatus(baseStatus);
    }
  });
};

const addRandomUsers = async () => {
  if (NODE_ENV !== "production") {
    for (let i = 0; i < 10; i++) {
      const user = createRandomUser();
      await addNewUserToDB(user);
    }
  }
};

export const initDB = () => {
  AppDataSource.initialize()
    .then(async () => {
      logMessage("Connected to Postgres DB");
      await addBaseStatuses();
      await addRandomUsers();
    })
    .catch((error) => logObject(error, ERROR));
};
