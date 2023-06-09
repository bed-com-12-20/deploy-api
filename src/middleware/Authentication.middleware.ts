
import { Injectable, Logger, NestMiddleware, NestModule } from "@nestjs/common";
import { NextFunction ,Request,Response} from "express";
import { RequestService } from "src/request.service";

@Injectable()
export class AunthenticationMiddleware implements NestMiddleware{
    private readonly logger=new Logger(AunthenticationMiddleware.name);

    constructor(private readonly requestService:RequestService){}

    use(req: Request, res: Response, next:NextFunction) {
        this.logger.log(AunthenticationMiddleware.name);
        //anthenticate the request
        const userId='1820';
        this.requestService.setUserID(userId);

        next();

        
    }
    
    
}