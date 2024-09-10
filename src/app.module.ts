import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { FoodOutletsModule } from './modules/food-outlets/food-outlets.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(process.env.DBURL),
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST,
        secure: false,
        auth: {
          user: process.env.HOST_EMAIL,
          pass: process.env.HOST_PASS,
        },
      },
    }),
    UserModule,
    AuthModule,
    FoodOutletsModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
