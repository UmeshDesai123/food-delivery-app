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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../services/user/user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const hash_bcrypt_1 = require("../../utils/hash-password/hash.bcrypt");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("../../auth/auth.service");
const role_guard_1 = require("../../auth/role.guard");
const add_role_dto_1 = require("./dto/add-role.dto");
const update_emp_details_dto_1 = require("./dto/update-emp-details.dto");
const update_emp_status_dto_1 = require("./dto/update-emp-status.dto");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("./dto/login.dto");
let UserController = UserController_1 = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async createUser(userDto) {
        try {
            this.logger.log('Create user request received');
            const password = await (0, hash_bcrypt_1.hashPassword)(userDto.password);
            return this.userService.createUser(Object.assign(Object.assign({}, userDto), { password }));
        }
        catch (error) {
            this.logger.error(error.message);
        }
    }
    async verifyEmail(otp, id) {
        return await this.userService.verifyEmail(id, Number(otp));
    }
    async login(body, req, res) {
        const user = {
            userId: req.user.userId,
            userName: req.user.userName,
            email: req.user.email,
            isEmployee: req.user.isEmployee,
            role: req.user.role,
            address: req.user.address,
            isEmailVerified: req.user.isEmailVerified
        };
        const token = this.authService.generateToken(user);
        user['authorization'] = token;
        res.setHeader('Authorization', token);
        return user;
    }
    async addEmpDetails(updateEmpDetails) {
        return await this.userService.addEmpDetails(updateEmpDetails);
    }
    async addRole(role) {
        return await this.userService.addRole(role);
    }
    async getRoles() {
        return await this.userService.getRoles();
    }
    async updateEmpStatus(id, status) {
        return await this.userService.updateEmpStatus(id, status);
    }
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Success.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request.' }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Verify Email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email Verified.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Incorrect OTP.' }),
    (0, swagger_1.ApiQuery)({ name: 'otp', type: Number, example: 1234 }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: '123' }),
    (0, common_1.Get)('/verify-email/:id'),
    __param(0, (0, common_1.Query)('otp')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'User Login' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Login Success.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Incorrect login credentials.' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add Employee Details' }),
    (0, swagger_1.ApiBody)({ type: update_emp_details_dto_1.UpdateEmployeeDetailsDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Add auth bearer token.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }),
    (0, common_1.Put)('add-employee-details'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_emp_details_dto_1.UpdateEmployeeDetailsDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addEmpDetails", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add new role' }),
    (0, swagger_1.ApiBody)({ type: add_role_dto_1.AddRoleDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Success.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Add auth bearer token.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }),
    (0, common_1.Post)('add-role'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_role_dto_1.AddRoleDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all roles' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Add auth bearer token.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }),
    (0, common_1.Get)('roles'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getRoles", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update employee status' }),
    (0, swagger_1.ApiBody)({ type: update_emp_status_dto_1.UpdateEmpStatus }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Add auth bearer token.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }),
    (0, common_1.Put)('update-status/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, common_1.SetMetadata)('roles', ['Employee']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_emp_status_dto_1.UpdateEmpStatus]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateEmpStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Add auth bearer token.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
UserController = UserController_1 = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map