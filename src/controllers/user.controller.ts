import { Request, Response } from "express";
import { User } from "../entity/User";
import {
  addNewUserToDB,
  getAllUsersFromDB,
  getUserByEmailFromDB,
  getUserByNameFromDB,
  getUsersByIds,
  updateUsersInDB,
} from "../services/user.service";
import { generateError } from "../utils/errors";
import { isValidStatus } from "../validation/status";
import { Status } from "../entity/Status";

export const addUser = async (req: Request, res: Response) => {
  try {
    const user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.status = req.body.status;

    await addNewUserToDB(user);
    res.status(201).send({ message: "Success", user });
  } catch (error) {
    res.status(500).send(generateError("Something went wrong"));
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = req.query;

    // Check if limit or offset are negative to inform the user
    if (limit) {
      const limitInt = parseInt(limit as string);
      if (limitInt < 0)
        return res.status(400).send(generateError("Limit must be positive"));
    }
    if (offset) {
      const offsetInt = parseInt(offset as string);
      if (offsetInt < 0)
        return res.status(400).send(generateError("Offset must be positive"));
    }

    const users = await getAllUsersFromDB(limit as string, offset as string);
    res.status(200).send({ message: "Success", users });
  } catch (error) {
    res.status(500).send(generateError("Something went wrong"));
  }
};

export const getUserByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const users = await getUserByNameFromDB(name);
    res.status(200).send({ message: "Success", users });
  } catch (error) {
    res.status(500).send(generateError("Something went wrong"));
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const users = await getUserByEmailFromDB(email);
    res.status(200).send({ message: "Success", users });
  } catch (error) {
    res.status(500).send(generateError("Something went wrong"));
  }
};

export const updateUsersStatuses = async (req: Request, res: Response) => {
  try {
    const { updateData } = req.body;

    // Received a valid data
    if (!updateData || !Array.isArray(updateData)) {
      return res.status(400).send(generateError("No valid data to update"));
    }

    // Create a list of the ids and a map of id->new status
    const data = new Map<number, string>();
    const ids: number[] = [];

    for (let i = 0; i < updateData.length; i++) {
      const record: { id: number; status: string } = updateData[i];
      if (!record.id || !record.status) {
        return res
          .status(400)
          .send(generateError("Missing details for update"));
      }

      if (!isValidStatus(record.status)) {
        return res
          .status(400)
          .send(generateError(`'${record.status}' is not a valid status`));
      }

      ids.push(record.id);
      data.set(record.id, record.status);
    }

    // Update the received users with the received statuses
    const users = await getUsersByIds(ids);

    users.forEach((user) => {
      const newStatus: Status = new Status();
      newStatus.description = data.get(user.id) as string;
      user.status = newStatus;
    });

    await updateUsersInDB(users);

    return res.status(200).send({ message: "Success" });
  } catch (error) {
    return res.status(500).send(generateError("Something went wrong"));
  }
};
