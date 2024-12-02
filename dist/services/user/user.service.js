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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_service_1 = require("../../repository/user/user.repository.service");
const mongoose_1 = require("mongoose");
const mailer_1 = require("@nestjs-modules/mailer");
let UserService = UserService_1 = class UserService {
    constructor(userRepositoryService, mailerService) {
        this.userRepositoryService = userRepositoryService;
        this.mailerService = mailerService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async createUser(body) {
        try {
            const checkUser = await this.userRepositoryService.getUserByEmail(body.email);
            if (checkUser) {
                throw new common_1.BadRequestException('email already exist');
            }
            const user = {
                userId: new mongoose_1.Types.ObjectId().toString(),
                userName: body.userName,
                email: body.email,
                password: body.password,
                isEmployee: body.isEmployee,
                address: body.address,
                isEmailVerified: false,
                empAvailabilityStatus: 'not-available',
                empCurrentLocation: body.address,
            };
            const verificationOTP = await this.sendVerificationEmail(user);
            user['verificationOTP'] = verificationOTP;
            this.logger.log(`createUser - Verification email sent to ${user.email}`);
            const newUser = await this.userRepositoryService.createUser(user);
            this.logger.log(`createUser - User created userid: ${newUser.userId}`);
            return {
                userId: newUser.userId,
                userName: newUser.userName,
                email: newUser.email,
                isEmployee: newUser.isEmployee,
                role: newUser.role,
                address: newUser.address,
                isEmailVerified: newUser.isEmailVerified
            };
        }
        catch (error) {
            this.logger.log(error.message);
            return error;
        }
    }
    async verifyEmail(id, otp) {
        const user = await this.userRepositoryService.getUserById(id);
        if (user.verificationOTP === Number(otp)) {
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
        }
        else {
            throw new common_1.HttpException('OTP does not match', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllUsers() {
        return await this.userRepositoryService.getAllUsers();
    }
    async addEmpDetails(updateEmpDetails) {
        const role = await this.userRepositoryService.getRoleById(updateEmpDetails.role);
        updateEmpDetails.role = role.role;
        const user = await this.userRepositoryService.addEmpDetails(updateEmpDetails);
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
    async sendVerificationEmail(user) {
        try {
            const verificationOTP = Math.floor(1000 + Math.random() * 9000);
            await this.mailerService.sendMail({
                to: user.email,
                from: 'umeshdesai1995@gmail.com',
                subject: 'Email Verification',
                text: `Please verify your email by using this code: ${verificationOTP}`
            }).then(() => {
            });
            return verificationOTP;
        }
        catch (error) {
            return error;
        }
    }
    async addRole(body) {
        return await this.userRepositoryService.addRole(Object.assign(Object.assign({}, body), { roleId: new mongoose_1.Types.ObjectId().toString() }));
    }
    async getRoles() {
        return await this.userRepositoryService.getRoles();
    }
    async updateEmpStatus(id, status) {
        const user = await this.userRepositoryService.updateEmpStatus(id, status);
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
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_service_1.UserRepositoryService,
        mailer_1.MailerService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map