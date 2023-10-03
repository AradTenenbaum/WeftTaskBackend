import { Status } from "../entity/Status";
import { User } from "../entity/User";
import { BASE_STATUSES } from "./constants";

function generateRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  return result;
}

function generateRandomEmail() {
  const randomUsername = generateRandomString(8);
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"];
  const randomDomainIndex = Math.floor(Math.random() * domains.length);
  const randomDomain = domains[randomDomainIndex];

  return `${randomUsername}@${randomDomain}`;
}

export const createRandomUser = () => {
  const user = new User();
  user.name = generateRandomString(8);
  user.password = generateRandomString(10);
  user.email = generateRandomEmail();
  const randomBaseStatusIndex = Math.floor(
    Math.random() * BASE_STATUSES.length
  );
  const status = new Status();
  status.description = BASE_STATUSES[randomBaseStatusIndex];
  user.status = status;

  return user;
};
