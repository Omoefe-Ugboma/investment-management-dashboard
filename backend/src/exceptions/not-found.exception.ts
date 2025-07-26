/**
 * Custom NotFoundException to be thrown when a requested resource is not found
 * Extends the native JavaScript Error class with additional HTTP-friendly properties
 */
export class NotFoundException extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  /**
   * Creates a new NotFoundException
   * @param message The error message (default: 'Resource not found')
   * @param statusCode The HTTP status code (default: 404)
   * @param isOperational Is this a operational error (default: true)
   */
  constructor(
    message: string = 'Resource not found',
    statusCode: number = 404,
    isOperational: boolean = true
  ) {
    super(message);

    // Set the prototype explicitly (needed when extending built-in classes)
    Object.setPrototypeOf(this, NotFoundException.prototype);

    // Custom properties
    this.name = 'NotFoundException';
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintain proper stack trace (only available in V8 engines like Chrome and Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundException);
    }
  }

  /**
   * Serializes error to a format suitable for API responses
   */
  public serializeErrors() {
    return {
      success: false,
      error: {
        name: this.name,
        message: this.message,
        statusCode: this.statusCode,
        isOperational: this.isOperational,
      },
    };
  }
}