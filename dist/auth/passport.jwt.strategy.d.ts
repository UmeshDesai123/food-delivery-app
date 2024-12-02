import { Strategy } from 'passport-jwt';
declare const PassportJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class PassportJwtStrategy extends PassportJwtStrategy_base {
    constructor();
    validate(payload: any): Promise<any>;
}
export {};
