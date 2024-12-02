"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserRepositoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserRepositoryService = UserRepositoryService_1 = class UserRepositoryService {
    constructor(usersModel, rolesModel) {
        this.usersModel = usersModel;
        this.rolesModel = rolesModel;
        this.logger = new common_1.Logger(UserRepositoryService_1.name);
    }
    async createUser(user) {
        try {
            const newUser = new this.usersModel(user);
            return newUser.save();
        }
        catch (error) {
            return error;
        }
    }
    async getUserById(id) {
        try {
            const user = this.usersModel.findOne({ userId: id });
            return user;
        }
        catch (error) {
            return error;
        }
    }
    async getUserByEmail(email) {
        try {
            const user = this.usersModel.findOne({ email: email });
            return user;
        }
        catch (error) {
            return error;
        }
    }
    async getAllUsers() {
        try {
            const users = await this.usersModel.find().select('-password');
            return users;
        }
        catch (error) {
            return error;
        }
    }
    async getAvailableEmp(add) {
        const emp = await this.usersModel.find({
            empAvailabilityStatus: 'available',
            empCurrentLocation: add
        });
        return emp;
    }
    async addEmpDetails(body) {
        try {
            const user = await this.usersModel.findOne({ userId: body.userId });
            if (user.isEmployee) {
                const updatedUser = await this.usersModel.findOneAndUpdate({ userId: body.userId }, { $set: body }, { new: true });
                return updatedUser;
            }
            else {
                throw new common_1.BadRequestException('user not eligible');
            }
        }
        catch (error) {
            return error;
        }
    }
    async updateEmpStatus(id, status) {
        const updatedUser = await this.usersModel.findOneAndUpdate({ userId: id }, { $set: status }, { new: true });
        return updatedUser;
    }
    async updateEmailVerificationStatus(id) {
        try {
            const updatedUser = await this.usersModel.findOneAndUpdate({ userId: id }, { $set: { isEmailVerified: true } }, { new: true });
            return updatedUser;
        }
        catch (error) {
            return error;
        }
    }
    async addRole(roleDto) {
        const role = new this.rolesModel(roleDto);
        return role.save();
    }
    async getRoleById(id) {
        const role = this.rolesModel.findOne({ roleId: id });
        return role;
    }
    async getRoles() {
        return this.rolesModel.find();
    }
};
UserRepositoryService = UserRepositoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('users')),
    __param(1, (0, mongoose_1.InjectModel)('roles')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserRepositoryService);
exports.UserRepositoryService = UserRepositoryService;
//# sourceMappingURL=user.repository.service.js.map