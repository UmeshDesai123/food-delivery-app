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
import { Model } from 'mongoose';
import { AddRoleDto } from 'src/controllers/user/dto/add-role.dto';
import { RoleDocument } from 'src/entities/user/role.schema';
import { User, UserDocument } from 'src/entities/user/user.schema';
export declare class UserRepositoryService {
    private readonly usersModel;
    private readonly rolesModel;
    private readonly logger;
    constructor(usersModel: Model<UserDocument>, rolesModel: Model<RoleDocument>);
    createUser(user: any): Promise<any>;
    getUserById(id: string): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
    getAllUsers(): Promise<any>;
    getAvailableEmp(add: any): Promise<(import("mongoose").Document<unknown, {}, UserDocument> & Omit<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    addEmpDetails(body: any): Promise<any>;
    updateEmpStatus(id: string, status: any): Promise<import("mongoose").Document<unknown, {}, UserDocument> & Omit<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateEmailVerificationStatus(id: string): Promise<any>;
    addRole(roleDto: AddRoleDto): Promise<import("mongoose").Document<unknown, {}, RoleDocument> & Omit<import("src/entities/user/role.schema").Roles & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getRoleById(id: string): Promise<import("mongoose").Document<unknown, {}, RoleDocument> & Omit<import("src/entities/user/role.schema").Roles & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getRoles(): Promise<(import("mongoose").Document<unknown, {}, RoleDocument> & Omit<import("src/entities/user/role.schema").Roles & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
}
