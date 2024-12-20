"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./modules/user/user.module");
const mailer_1 = require("@nestjs-modules/mailer");
const auth_module_1 = require("./auth/auth.module");
const food_outlets_module_1 = require("./modules/food-outlets/food-outlets.module");
const order_module_1 = require("./modules/order/order.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'
            }),
            mongoose_1.MongooseModule.forRoot(process.env.DBURL),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.HOST,
                    secure: false,
                    auth: {
                        user: process.env.HOST_EMAIL,
                        pass: process.env.HOST_PASS,
                    },
                },
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            food_outlets_module_1.FoodOutletsModule,
            order_module_1.OrderModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map