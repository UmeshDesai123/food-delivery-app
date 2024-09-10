import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from 'src/controllers/user/user.controller';
import { RoleSchema } from 'src/entities/user/role.schema';
import { UserSchema } from 'src/entities/user/user.schema';
import { UserRepositoryService } from 'src/repository/user/user.repository.service';
import { UserService } from 'src/services/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users', schema: UserSchema },
      { name: 'roles', schema: RoleSchema }
    ]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
  exports: [UserRepositoryService],
})
export class UserModule {}