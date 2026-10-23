import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";

    switch (exception.code) {
      case "P2002":
        status = HttpStatus.CONFLICT;
        message = "Resource already exists";
        break;

      case "P2025":
        status = HttpStatus.NOT_FOUND;
        message = "Resource not found";
        break;

      case "P2003":
        status = HttpStatus.CONFLICT;
        message = "Resource is referenced by another record";
        break;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
