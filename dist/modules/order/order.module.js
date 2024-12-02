"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../../auth/auth.module");
const order_controller_1 = require("../../controllers/order/order.controller");
const food_items_schema_1 = require("../../entities/food-outlets/food-items.schema");
const hotels_schema_1 = require("../../entities/food-outlets/hotels.schema");
const order_schema_1 = require("../../entities/order/order.schema");
const role_schema_1 = require("../../entities/user/role.schema");
const user_schema_1 = require("../../entities/user/user.schema");
const food_outlets_repository_service_1 = require("../../repository/food-outlets/food-outlets.repository.service");
const order_repository_service_1 = require("../../repository/order/order.repository.service");
const user_repository_service_1 = require("../../repository/user/user.repository.service");
const food_outlets_service_1 = require("../../services/food-outlets/food-outlets.service");
const order_service_1 = require("../../services/order/order.service");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'orders', schema: order_schema_1.OrderSchema },
                { name: 'hotels', schema: hotels_schema_1.HotelsSchema },
                { name: 'foodItems', schema: food_items_schema_1.FoodItemsSchema },
                { name: 'users', schema: user_schema_1.UserSchema },
                { name: 'roles', schema: role_schema_1.RoleSchema }
            ]),
            auth_module_1.AuthModule
        ],
        controllers: [order_controller_1.OrderController],
        providers: [
            order_service_1.OrderService, order_repository_service_1.OrderRepositoryService, food_outlets_repository_service_1.FoodOutletsRepositoryService, user_repository_service_1.UserRepositoryService, food_outlets_service_1.FoodOutletsService
        ],
        exports: [],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map