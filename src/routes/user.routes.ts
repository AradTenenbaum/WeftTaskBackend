import { Router, Request, Response } from "express";
import {
  addUser,
  getAllUsers,
  getUserByEmail,
  getUserByName,
  updateUsersStatuses,
} from "../controllers/user.controller";

const router = Router();

router.post("/", addUser);
router.get("/", getAllUsers);
router.get("/name/:name", getUserByName);
router.get("/email/:email", getUserByEmail);
router.patch("/update", updateUsersStatuses);

export { router };
