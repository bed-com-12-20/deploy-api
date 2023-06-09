import { Controller, MiddlewareConsumer, Module, NestModule, Scope } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.modules";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./typeorm/entities/User";
import { CafeA } from "./typeorm/entities/CafeA";
import { CafeB } from "./typeorm/entities/CAfeB";
import { RequestService } from "./request.service";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AunthenticationMiddleware } from "./middleware/Authentication.middleware";
import { AuthGuard } from "./guards/auth.guards";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";
import { FreezePipe } from "./pipes/freeze.pipe";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { cafeAordersController } from "./cafeAorders /controllers/cafeAorders.controller";
import { CafeModule } from "./cafeAorders /cafeAorders.modules";
import { createcafeAOrdersServices } from "./cafeAorders /services/cafeAorders.services";
import { UsersController } from "./users/controllers/users/users.controller";
import { UsersService } from "./users/services/users.services";
import { CafeBModule } from "./CafeBorders/cafeBorders.modules";




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'mycafe',
      entities: [User, CafeA, CafeB],
      synchronize: true,
    }),
    UsersModule,
   CafeModule,
   CafeBModule,
  ],
  controllers: [],
  providers: [
    AppService,
    RequestService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AunthenticationMiddleware).forRoutes("*");
  }
}
