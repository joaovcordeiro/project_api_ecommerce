export default class ResponseModel {
  public readonly status: string;
  public readonly statusCode: number;
  public readonly data: any;
  public readonly message: string;

  constructor(message: string, statusCode: number = 200, data: any = {}) {
    if (statusCode >= 500) {
      this.status = "INTERNAL_SERVER_ERROR";
    } else if (statusCode === 422) {
      this.status = "UNPROCESSABLE_ENTITY";
    } else if (statusCode >= 400) {
      this.status = "BAD_REQUEST";
    } else if (statusCode >= 200) {
      this.status = "OK";
    } else {
      this.status = "UNKNOWN";
    }

    this.statusCode = statusCode;
    this.message = message;
    this.data = data || {};
  }
}
