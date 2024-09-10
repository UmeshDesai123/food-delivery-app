import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepositoryService } from '../../repository/user/user.repository.service';
import { User } from '../../entities/user/user.schema';
import { CreateUserDto } from '../../controllers/user/dto/create-user.dto';
import { Types } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { error } from 'console';
import { Roles } from '../../entities/user/role.schema';
import { UpdateEmployeeDetailsDto } from '../../controllers/user/dto/update-emp-details.dto';
import { UpdateEmpStatus } from '../../controllers/user/dto/update-emp-status.dto';

@Injectable()
export class UserService {
  constructor (
		private readonly userRepositoryService: UserRepositoryService,
		private readonly mailerService: MailerService,
  ) {}

  async createUser (body: CreateUserDto) {
    try {
      const checkUser = await this.userRepositoryService.getUserByEmail(body.email);
      if(checkUser) {
        throw new BadRequestException('email already exist');
      }
      const user = {
        userId: new Types.ObjectId().toString(),
        userName: body.userName,
        email: body.email,
        password: body.password,
        isEmployee: body.isEmployee,
        address: body.address,
        isEmailVerified: false,
        empAvailabilityStatus: 'not-available',
        empCurrentLocation: body.address,
      };
      
      //send email
      const verificationOTP = await this.sendVerificationEmail(user);
      user['verificationOTP'] = verificationOTP;

      const newUser: User = await this.userRepositoryService.createUser(user);

      //console.log(newUser);

      return {
        userId: newUser.userId,
        userName: newUser.userName,
        email: newUser.email,
        isEmployee: newUser.isEmployee,
        role: newUser.role,
        address: newUser.address,
        isEmailVerified: newUser.isEmailVerified
      };
    } catch (error) {
      //console.log(error);
      return error;
    }
  }

  async verifyEmail (id: string, otp: number) {
    //console.log('id', id);
    const user: User = await this.userRepositoryService.getUserById(id);
    if(user.verificationOTP === Number(otp)) {

      const updatedUser = await this.userRepositoryService.updateEmailVerificationStatus(id);
      
      return {
        userId: updatedUser.userId,
        userName: updatedUser.userName,
        email: updatedUser.email,
        isEmployee: updatedUser.isEmployee,
        role: updatedUser.role,
        address: updatedUser.address,
        isEmailVerified: updatedUser.isEmailVerified
      };
    } else{
      throw new HttpException(
        'OTP does not match',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllUsers () {
    return await this.userRepositoryService.getAllUsers();
  }

  async addEmpDetails (updateEmpDetails: UpdateEmployeeDetailsDto) {
    const role: Roles = await this.userRepositoryService.getRoleById(updateEmpDetails.role);
    updateEmpDetails.role = role.role;
    const user: User = await this.userRepositoryService.addEmpDetails(updateEmpDetails);
    return {
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      isEmployee: user.isEmployee,
      role: user.role,
      address: user.address,
      isEmailVerified: user.isEmailVerified,
      empAvailabilityStatus: user.empAvailabilityStatus,
      empCurrentLocation: user.empCurrentLocation,
    };
  }

  async sendVerificationEmail (user) {
    try {
      // Generate a verification token
      const verificationOTP = Math.floor(1000 + Math.random() * 9000);
      //console.log('token>', verificationOTP);
      await this.mailerService.sendMail({
        to: user.email,
        from: 'umeshdesai1995@gmail.com',
        subject: 'Email Verification',
        text: `Please verify your email by using this code: ${verificationOTP}`
      }).then(() => {
        //console.log('email sent');
      });
      return verificationOTP;
    } catch (error) {
      return error;
    }
  }

  async addRole (body) {
    return await this.userRepositoryService.addRole({ ...body, roleId: new Types.ObjectId().toString() });
  }

  async getRoles () {
    return await this.userRepositoryService.getRoles();
  }

  async updateEmpStatus (id: string, status: UpdateEmpStatus) {
    const user: User = await this.userRepositoryService.updateEmpStatus(id, status);
    return {
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      isEmployee: user.isEmployee,
      role: user.role,
      address: user.address,
      isEmailVerified: user.isEmailVerified,
      empAvailabilityStatus: user.empAvailabilityStatus,
      empCurrentLocation: user.empCurrentLocation,
    };
  }
}