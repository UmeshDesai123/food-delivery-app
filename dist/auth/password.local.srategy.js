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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportLocalStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const user_repository_service_1 = require("../repository/user/user.repository.service");
const hash_bcrypt_1 = require("../utils/hash-password/hash.bcrypt");
let PassportLocalStrategy = class PassportLocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(userRepositoryService) {
        super();
        this.userRepositoryService = userRepositoryService;
    }
    async validate(email, password) {
        const user = await this.userRepositoryService.getUserByEmail(email);
        if (user == undefined) {
            throw new common_1.UnauthorizedException('User not found with given username');
        }
        if (!user.isEmailVerified) {
            throw new common_1.UnauthorizedException('email not verified');
        }
        if (user.isEmailVerified) {
            const matched = await (0, hash_bcrypt_1.comparePassword)(password, user.password);
            if (matched) {
                return user;
            }
            throw new common_1.UnauthorizedException('Wrong username/password');
        }
    }
};
PassportLocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_service_1.UserRepositoryService])
], PassportLocalStrategy);
exports.PassportLocalStrategy = PassportLocalStrategy;
//# sourceMappingURL=password.local.srategy.js.map