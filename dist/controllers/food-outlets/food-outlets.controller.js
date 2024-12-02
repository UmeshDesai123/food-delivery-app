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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodOutletsController = void 0;
const common_1 = require("@nestjs/common");
const food_outlets_service_1 = require("../../services/food-outlets/food-outlets.service");
const hotels_dto_1 = require("./dto/hotels.dto");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../../auth/role.guard");
const food_items_dto_1 = require("./dto/food-items.dto");
const swagger_1 = require("@nestjs/swagger");
let FoodOutletsController = class FoodOutletsController {
    constructor(foodOutletsService) {
        this.foodOutletsService = foodOutletsService;
    }
    async addFoodItem(item) {
        return this.foodOutletsService.addFoodItem(item);
    }
    async addHotel(hotel) {
        return await this.foodOutletsService.addHotel(hotel);
    }
    async getFood() {
        return await this.foodOutletsService.getHotels();
    }
    async getHotelById(id) {
        return await this.foodOutletsService.getHotelById(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add new food item' }),
    (0, swagger_1.ApiBody)({ type: food_items_dto_1.FoodItemsDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Success.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Add auth bearer token.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, common_1.Post)('add-food-item'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [food_items_dto_1.FoodItemsDto]),
    __metadata("design:returntype", Promise)
], FoodOutletsController.prototype, "addFoodItem", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add a new hotel' }),
    (0, swagger_1.ApiBody)({ type: hotels_dto_1.HotelsDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Success.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Add auth bearer token.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, common_1.Post)('add-hotel'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hotels_dto_1.HotelsDto]),
    __metadata("design:returntype", Promise)
], FoodOutletsController.prototype, "addHotel", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get hotels' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Add auth bearer token.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }),
    (0, common_1.Get)('hotels'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodOutletsController.prototype, "getFood", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get hotel by Id' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: '123' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Add auth bearer token.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }),
    (0, common_1.Get)('hotels/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FoodOutletsController.prototype, "getHotelById", null);
FoodOutletsController = __decorate([
    (0, swagger_1.ApiTags)('Food Outlets'),
    (0, common_1.Controller)('food-outlets'),
    __metadata("design:paramtypes", [food_outlets_service_1.FoodOutletsService])
], FoodOutletsController);
exports.FoodOutletsController = FoodOutletsController;
//# sourceMappingURL=food-outlets.controller.js.map