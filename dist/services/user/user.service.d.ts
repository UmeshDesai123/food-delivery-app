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
/// <reference types="mongoose/types/inferschematype" />
import { UserRepositoryService } from '../../repository/user/user.repository.service';
import { CreateUserDto } from '../../controllers/user/dto/create-user.dto';
import { Types } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { Roles } from '../../entities/user/role.schema';
import { UpdateEmployeeDetailsDto } from '../../controllers/user/dto/update-emp-details.dto';
import { UpdateEmpStatus } from '../../controllers/user/dto/update-emp-status.dto';
export declare class UserService {
    private readonly userRepositoryService;
    private readonly mailerService;
    private readonly logger;
    constructor(userRepositoryService: UserRepositoryService, mailerService: MailerService);
    createUser(body: CreateUserDto): Promise<any>;
    verifyEmail(id: string, otp: number): Promise<{
        userId: any;
        userName: any;
        email: any;
        isEmployee: any;
        role: any;
        address: any;
        isEmailVerified: any;
    }>;
    getAllUsers(): Promise<any>;
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
    sendVerificationEmail(user: any): Promise<any>;
    addRole(body: any): Promise<import("mongoose").Document<unknown, {}, import("../../entities/user/role.schema").RoleDocument> & Omit<Roles & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>>;
    getRoles(): Promise<(import("mongoose").Document<unknown, {}, import("../../entities/user/role.schema").RoleDocument> & Omit<Roles & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
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
}
