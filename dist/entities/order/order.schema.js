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
exports.OrderSchema = exports.OrderItems = exports.Orders = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Orders = class Orders {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Orders.prototype, "orderId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Orders.prototype, "hotelId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Orders.prototype, "customerId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Orders.prototype, "employeeId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Orders.prototype, "orderStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Orders.prototype, "items", void 0);
Orders = __decorate([
    (0, mongoose_1.Schema)()
], Orders);
exports.Orders = Orders;
class OrderItems {
}
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderItems.prototype, "itemId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], OrderItems.prototype, "quantity", void 0);
exports.OrderItems = OrderItems;
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Orders);
//# sourceMappingURL=order.schema.js.map