import { Strategy } from 'passport-local';
import { UserRepositoryService } from '../repository/user/user.repository.service';
import { User } from 'src/entities/user/user.schema';
declare const PassportLocalStrategy_base: new (...args: any[]) => Strategy;
export declare class PassportLocalStrategy extends PassportLocalStrategy_base {
    private readonly userRepositoryService;
    constructor(userRepositoryService: UserRepositoryService);
    validate(email: string, password: string): Promise<User>;
}
export {};
