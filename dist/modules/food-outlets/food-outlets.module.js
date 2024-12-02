"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodOutletsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../../auth/auth.module");
const food_outlets_controller_1 = require("../../controllers/food-outlets/food-outlets.controller");
const food_items_schema_1 = require("../../entities/food-outlets/food-items.schema");
const hotels_schema_1 = require("../../entities/food-outlets/hotels.schema");
const food_outlets_repository_service_1 = require("../../repository/food-outlets/food-outlets.repository.service");
const food_outlets_service_1 = require("../../services/food-outlets/food-outlets.service");
let FoodOutletsModule = class FoodOutletsModule {
};
FoodOutletsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'hotels', schema: hotels_schema_1.HotelsSchema },
                { name: 'foodItems', schema: food_items_schema_1.FoodItemsSchema }
            ]),
            auth_module_1.AuthModule
        ],
        controllers: [food_outlets_controller_1.FoodOutletsController],
        providers: [food_outlets_service_1.FoodOutletsService, food_outlets_repository_service_1.FoodOutletsRepositoryService],
        exports: [food_outlets_repository_service_1.FoodOutletsRepositoryService],
    })
], FoodOutletsModule);
exports.FoodOutletsModule = FoodOutletsModule;
//# sourceMappingURL=food-outlets.module.js.map