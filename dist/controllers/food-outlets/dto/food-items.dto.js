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
exports.FoodItemsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FoodItemsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Paneer', type: String, description: 'Name of the food item' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FoodItemsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 300, type: String, description: 'Price of the food item' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FoodItemsDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Image URLs'], type: [String], description: 'Images of the food item' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], FoodItemsDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'veg', type: String, description: 'Category of the food item' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FoodItemsDto.prototype, "category", void 0);
exports.FoodItemsDto = FoodItemsDto;
//# sourceMappingURL=food-items.dto.js.map