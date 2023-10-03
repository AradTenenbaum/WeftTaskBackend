import { dataSource } from "../app";
import { Status } from "../entity/Status";

export const addStatus = (description: string) => {
  const statusRepository = dataSource.getRepository(Status);
  const status = new Status();
  status.description = description;
  statusRepository.save(status);
};

export const getStatuses = () => {
  const statusRepository = dataSource.getRepository(Status);
  const statuses = statusRepository.find();
  return statuses;
};
