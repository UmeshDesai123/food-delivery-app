import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddRoleDto } from 'src/controllers/user/dto/add-role.dto';
import { RoleDocument } from 'src/entities/user/role.schema';
import { User, UserDocument } from 'src/entities/user/user.schema';


@Injectable()
export class UserRepositoryService {
  constructor (
		@InjectModel('users') private readonly usersModel: Model<UserDocument>,
    @InjectModel('roles') private readonly rolesModel: Model<RoleDocument>
  ) {}
	
  async createUser (user) {
    try {
      const newUser = new this.usersModel(user);
      return newUser.save();
    } catch (error) {
      return error;
    }
  }

  async getUserById (id: string) {
    try {
      const user = this.usersModel.findOne({ userId: id });
      return user;
    } catch (error) {
      return error;
    }
  }

  async getUserByEmail (email: string) {
    try {
      const user = this.usersModel.findOne({ email: email });
      return user;
    } catch (error) {
      return error;
    }
  }

  async getAllUsers () {
    try {
      const users = await this.usersModel.find().select('-password'); //await this.usersModel.find({}, '-password');

      return users;
    } catch (error) {
      return error;
    }
  }

  async getAvailableEmp (add) {
    const emp = await this.usersModel.find(
      {
        empAvailabilityStatus: 'available',
        empCurrentLocation: add
      }
    );
    return emp;
  }

  async addEmpDetails (body) {
    try {
      const user: User = await this.usersModel.findOne({ userId: body.userId });
      if(user.isEmployee) {
        const updatedUser = await this.usersModel.findOneAndUpdate(
          { userId: body.userId },
          { $set: body },
          { new: true },
        );
        return updatedUser;
      }else{
        throw new BadRequestException('user not eligible');
      }
    } catch (error) {
      return error;
    }
  }

  async updateEmpStatus (id: string, status) {
    const updatedUser = await this.usersModel.findOneAndUpdate(
      { userId: id },
      { $set: status },
      { new: true }
    );
    //console.log(updatedUser);
    return updatedUser;
  }

  async updateEmailVerificationStatus (id: string) {
    try {
      const updatedUser = await this.usersModel.findOneAndUpdate(
        { userId: id },
        { $set: { isEmailVerified: true } },
        { new: true },
      );
      return updatedUser;
    } catch (error) {
      return error;
    }
  }

  async addRole (roleDto: AddRoleDto) {
    const role = new this.rolesModel(roleDto);
    return role.save();
  }

  async getRoleById (id: string) {
    const role = this.rolesModel.findOne({ roleId: id });
    return role;
  }

  async getRoles () {
    return this.rolesModel.find();
  }
}