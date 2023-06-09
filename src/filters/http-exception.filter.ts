import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Request,Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter{
    private readonly logger=new Logger(HttpExceptionFilter.name)

    catch(exception: any, host: ArgumentsHost) {
        this.logger.log(HttpExceptionFilter.name);

        const ctx=host.switchToHttp();
        const response=ctx.getResponse<Response>();
        const request=ctx.getResponse<Request>();
        const status=exception.getStatus();

        response.status(status).json({
            statusCode:status,
            timestamp:new Date().toISOString(),
            path:request.url,
        });

    }
}