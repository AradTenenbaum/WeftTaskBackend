import { BASE_STATUSES } from "../utils/constants";

export const isValidStatus = (status: string) => {
  const statusIndex = BASE_STATUSES.findIndex(
    (baseStatus) => baseStatus === status
  );
  return statusIndex !== -1;
};
