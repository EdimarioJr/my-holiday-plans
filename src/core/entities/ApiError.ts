export class ApiError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
