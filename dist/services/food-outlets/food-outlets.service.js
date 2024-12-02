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
exports.FoodOutletsService = void 0;
const common_1 = require("@nestjs/common");
const food_outlets_repository_service_1 = require("../../repository/food-outlets/food-outlets.repository.service");
const mongoose_1 = require("mongoose");
let FoodOutletsService = class FoodOutletsService {
    constructor(foodOutletsRepositoryService) {
        this.foodOutletsRepositoryService = foodOutletsRepositoryService;
    }
    async addFoodItem(item) {
        return await this.foodOutletsRepositoryService.addFoodItems(Object.assign(Object.assign({}, item), { itemId: new mongoose_1.Types.ObjectId().toString() }));
    }
    async addHotel(hotel) {
        return await this.foodOutletsRepositoryService.addHotels(Object.assign(Object.assign({}, hotel), { hotelId: new mongoose_1.Types.ObjectId().toString() }));
    }
    async getHotels() {
        try {
            const hotels = await this.foodOutletsRepositoryService.getHotels();
            return hotels;
        }
        catch (error) {
            return error;
        }
    }
    async getHotelById(id) {
        const hotel = await this.foodOutletsRepositoryService.getHotelById(id);
        return hotel;
    }
};
FoodOutletsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [food_outlets_repository_service_1.FoodOutletsRepositoryService])
], FoodOutletsService);
exports.FoodOutletsService = FoodOutletsService;
//# sourceMappingURL=food-outlets.service.js.map