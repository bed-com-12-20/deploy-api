import {  Module } from "@nestjs/common";
import { UsersController } from "./controllers/users/users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";
import { UsersService } from "./services/users.services";
import { CafeA } from "src/typeorm/entities/CafeA";
import { CafeB } from "src/typeorm/entities/CAfeB";


@Module({
    imports:[TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([CafeA]),TypeOrmModule.forFeature([CafeB])],
    controllers:[UsersController],
    providers:[UsersService],


    
  

})
@Module({
    imports:[TypeOrmModule.forRoot({
        type:'postgres',
        host:'localhost',
        port:5432,
        username:'postgres',
        password:'1234',
        database:'mycafe',
        entities:[User,CafeA,CafeB],
        synchronize:true,
    })]
})

export class UsersModule{}