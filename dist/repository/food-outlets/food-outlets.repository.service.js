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
exports.FoodOutletsRepositoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FoodOutletsRepositoryService = class FoodOutletsRepositoryService {
    constructor(hotelsModel, foodItemsModel) {
        this.hotelsModel = hotelsModel;
        this.foodItemsModel = foodItemsModel;
    }
    async addFoodItems(food) {
        try {
            const newFood = new this.foodItemsModel(food);
            return newFood.save();
        }
        catch (error) {
            return error;
        }
    }
    async addHotels(hotel) {
        try {
            const newHotel = new this.hotelsModel(hotel);
            return newHotel.save();
        }
        catch (error) {
            return error;
        }
    }
    async getFoodItemsById(id) {
        try {
            return await this.foodItemsModel.findOne({ itemId: id });
        }
        catch (error) {
            return error;
        }
    }
    async getHotelById(id) {
        try {
            const res = await this.hotelsModel.aggregate([
                {
                    $match: {
                        hotelId: id,
                    },
                },
                {
                    $lookup: {
                        from: 'fooditems',
                        localField: 'foodItems',
                        foreignField: 'itemId',
                        as: 'foodItems'
                    }
                }
            ]);
            return res;
        }
        catch (error) {
            return error;
        }
    }
    async getHotels() {
        try {
            const res = await this.hotelsModel.aggregate([
                {
                    $lookup: {
                        from: 'fooditems',
                        localField: 'foodItems',
                        foreignField: 'itemId',
                        as: 'foodItems'
                    }
                }
            ]);
            return res;
        }
        catch (error) {
            return error;
        }
    }
};
FoodOutletsRepositoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('hotels')),
    __param(1, (0, mongoose_1.InjectModel)('foodItems')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FoodOutletsRepositoryService);
exports.FoodOutletsRepositoryService = FoodOutletsRepositoryService;
//# sourceMappingURL=food-outlets.repository.service.js.map