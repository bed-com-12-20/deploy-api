import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";
import { CafeA } from "src/typeorm/entities/CafeA";
import { CafeB } from "src/typeorm/entities/CafeB";
import { UsersController } from "src/users/controllers/users/users.controller";
import { UsersService } from "src/users/services/users.services";

import { cafeBordersController } from "./controllers/cafeBorders.controllers";
import { createcafeBOrdersServices } from "./services/cafeBorders.services";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, CafeA, CafeB]),
  ],
  controllers: [cafeBordersController, UsersController],
  providers: [UsersService,createcafeBOrdersServices],
})
export class CafeBModule {}
