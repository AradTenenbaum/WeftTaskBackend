import { In } from "typeorm";
import { User } from "../entity/User";
import { Status } from "../entity/Status";
import { dataSource } from "../app";

export const addNewUserToDB = async (user: User) => {
  const userRepository = dataSource.getRepository(User);
  await userRepository.save(user);
};

export const getAllUsersFromDB = async (
  limit: string | undefined,
  offset: string | undefined
) => {
  const userRepository = dataSource.getRepository(User);

  let findOptions = {};
  if (limit) findOptions = { ...findOptions, take: limit };
  if (offset) findOptions = { ...findOptions, skip: offset };

  const users = await userRepository.find({
    ...findOptions,
    relations: { status: true },
  });
  return [
    users.map((user) => {
      return { ...user, status: user.status.description };
    }),
  ];
};

export const getUserByNameFromDB = async (name: string) => {
  const userRepository = dataSource.getRepository(User);
  const users = userRepository.find({ where: { name } });
  return users;
};

export const getUserByEmailFromDB = async (email: string) => {
  const userRepository = dataSource.getRepository(User);
  const users = userRepository.find({ where: { email } });
  return users;
};

export const getUsersByIds = async (ids: number[]) => {
  const userRepository = dataSource.getRepository(User);
  const users = await userRepository.findBy({ id: In(ids) });
  return users;
};

export const updateUsersInDB = async (users: User[]) => {
  const userRepository = dataSource.getRepository(User);
  userRepository.save(users);
};
