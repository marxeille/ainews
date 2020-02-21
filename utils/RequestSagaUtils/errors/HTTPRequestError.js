class HTTPRequestError extends Error {
  constructor(statusCode, response, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HTTPRequestError);
    }

    this.statusCode = statusCode;
    this.response = response;
  }
}

export default HTTPRequestError;
