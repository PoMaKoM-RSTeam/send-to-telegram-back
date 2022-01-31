class ApiError extends Error {
  public code: number;

  public message: string;

  constructor(code: number, message: string) {
    super();
    this.code = code;
    this.message = message;
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }

  static unauthorized(message: string) {
    return new ApiError(401, message);
  }

  static forbidden(message: string) {
    return new ApiError(403, message);
  }
}
export default ApiError;
