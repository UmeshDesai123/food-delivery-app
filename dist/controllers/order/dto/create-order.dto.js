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
exports.OrderedItems = exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123', type: String, description: 'Id of the hotel' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "hotelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123', type: String, description: 'Id of the customer' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [{ itemId: '123', quantity: 1 }], type: [Object], description: 'Id of the ordered items and quantity' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
exports.CreateOrderDto = CreateOrderDto;
class OrderedItems {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123', type: String, description: 'Id of the food item' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderedItems.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, type: Number, description: 'Quantity of food item' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderedItems.prototype, "quantity", void 0);
exports.OrderedItems = OrderedItems;
//# sourceMappingURL=create-order.dto.js.map