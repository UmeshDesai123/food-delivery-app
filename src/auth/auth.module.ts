import { Module } from '@nestjs/common';
import { PassportLocalStrategy } from './password.local.srategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/entities/user/user.schema';
import { UserRepositoryService } from 'src/repository/user/user.repository.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportJwtStrategy } from './passport.jwt.strategy';
import { AuthService } from './auth.service';
import { RoleSchema } from 'src/entities/user/role.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users', schema: UserSchema },
      { name: 'roles', schema: RoleSchema }
    ]),
    JwtModule.register({
      secret: process.env.KEY,
      signOptions: {
        expiresIn: '1h'
      }
    }),
  ],
  controllers: [],
  providers: [PassportLocalStrategy, UserRepositoryService, PassportJwtStrategy, AuthService],
  exports: [AuthService]
})
export class AuthModule {}