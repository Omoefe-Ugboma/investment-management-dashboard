// src/exceptions/bad-request.exception.ts
export class BadRequestException extends Error {
  public readonly statusCode: number = 400;
  
  constructor(message: string = 'Bad Request') {
    super(message);
    this.name = 'BadRequestException';
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestException);
    }
  }
}