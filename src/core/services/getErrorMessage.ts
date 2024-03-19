import { ApiError } from "../entities";

export const getErrorMessage = (error: unknown) => {
  if (error instanceof ApiError || error instanceof Error) return error.message;
  if (typeof error === "object") return JSON.stringify(error);
  return String(error);
};
