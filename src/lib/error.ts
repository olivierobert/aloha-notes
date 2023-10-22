class BaseError extends Error {
  constructor({ message }: { message: string }) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError);
    }
  }
}

export class RequestError extends BaseError {}
export class ApiClientError extends BaseError {}
