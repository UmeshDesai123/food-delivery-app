import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserRepositoryService } from '../repository/user/user.repository.service';
import { User } from 'src/entities/user/user.schema';
import { comparePassword } from 'src/utils/hash-password/hash.bcrypt';

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
  constructor (private readonly userRepositoryService: UserRepositoryService) {
    super();
  }

  async validate (email: string, password: string): Promise<User> {
    const user: User = await this.userRepositoryService.getUserByEmail(email);
    //user does not exist in list
    if (user == undefined) {
      throw new UnauthorizedException('User not found with given username');
    }

    //If user exist - check password
    if(!user.isEmailVerified) {
      throw new UnauthorizedException('email not verified');
    }
    if (user.isEmailVerified) {
      const matched = await comparePassword(password, user.password);
      if (matched) {
        //console.log('User validated');
        return user;
      }
      throw new UnauthorizedException('Wrong username/password');
    }
  }
}
