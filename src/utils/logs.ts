import { INFO } from "./constants";

export function logObject(details: Object, type?: string) {
  console.log({ type: type || INFO, ...details });
}

export function logMessage(message: string, type?: string) {
  console.log({ type: type || INFO, message });
}
