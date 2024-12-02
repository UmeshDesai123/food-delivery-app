/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserService } from '../../services/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../../auth/auth.service';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateEmployeeDetailsDto } from './dto/update-emp-details.dto';
import { UpdateEmpStatus } from './dto/update-emp-status.dto';
import { LoginDto } from './dto/login.dto';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    private readonly logger;
    constructor(userService: UserService, authService: AuthService);
    createUser(userDto: CreateUserDto): Promise<any>;
    verifyEmail(otp: number, id: string): Promise<{
        userId: any;
        userName: any;
        email: any;
        isEmployee: any;
        role: any;
        address: any;
        isEmailVerified: any;
    }>;
    login(body: LoginDto, req: any, res: any): Promise<{
        userId: any;
        userName: any;
        email: any;
        isEmployee: any;
        role: any;
        address: any;
        isEmailVerified: any;
    }>;
    addEmpDetails(updateEmpDetails: UpdateEmployeeDetailsDto): Promise<{
        userId: string;
        userName: string;
        email: string;
        isEmployee: boolean;
        role: string;
        address: string;
        isEmailVerified: boolean;
        empAvailabilityStatus: string;
        empCurrentLocation: string;
    }>;
    addRole(role: AddRoleDto): Promise<import("mongoose").Document<unknown, {}, import("../../entities/user/role.schema").RoleDocument> & Omit<import("../../entities/user/role.schema").Roles & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getRoles(): Promise<(import("mongoose").Document<unknown, {}, import("../../entities/user/role.schema").RoleDocument> & Omit<import("../../entities/user/role.schema").Roles & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    updateEmpStatus(id: string, status: UpdateEmpStatus): Promise<{
        userId: string;
        userName: string;
        email: string;
        isEmployee: boolean;
        role: string;
        address: string;
        isEmailVerified: boolean;
        empAvailabilityStatus: string;
        empCurrentLocation: string;
    }>;
    getAllUsers(): Promise<any>;
}
