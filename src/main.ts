import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guards';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';





async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new AuthGuard);
 // Create a Swagger document options object
 const options = new DocumentBuilder()
 .setTitle('CAFE API')
 .setDescription('welcome and order your desired food here')
 .setVersion('1.0')
 .build();

// Generate the Swagger JSON document
const document = SwaggerModule.createDocument(app, options);

// Add the Swagger JSON document to the Swagger UI
SwaggerModule.setup('api', app, document);

// Start the application


  await app.listen(3000);
}
bootstrap();
