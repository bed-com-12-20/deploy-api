import { Injectable, Scope } from "@nestjs/common";

@Injectable({scope:Scope.REQUEST})
export class RequestService{
    private userid:string

    setUserID(userId:string){
        this.userid=userId

    }
    getUserID(){
        return this.userid;

    } 

}