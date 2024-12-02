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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("../../services/order/order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../../auth/role.guard");
const update_order_dto_1 = require("./dto/update-order.dto");
const swagger_1 = require("@nestjs/swagger");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrder(order) {
        return await this.orderService.createOrder(order);
    }
    async placeOrder(id) {
        return await this.orderService.placeOrder(id);
    }
    async getOrderById(id) {
        return await this.orderService.getOrderById(id);
    }
    async getUserOrderHistory(id) {
        return await this.orderService.getUserOrderHistory(id);
    }
    async updateOrderStatus(orderId, updateBody) {
        return await this.orderService.updateOrderStatus(orderId, updateBody);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new order' }),
    (0, swagger_1.ApiBody)({ type: create_order_dto_1.CreateOrderDto }),
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
    (0, common_1.Post)('new-order'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, common_1.SetMetadata)('roles', ['Customer']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Place order' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Id of the order that to be placed' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Add auth bearer token.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }),
    (0, common_1.Put)('place-order/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, common_1.SetMetadata)('roles', ['Customer']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "placeOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get order by Id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Id of the order' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Add auth bearer token.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }),
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get order history of user' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Id of the user' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Add auth bearer token.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }),
    (0, common_1.Get)('user/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, common_1.SetMetadata)('roles', ['Customer', 'admin']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserOrderHistory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Place order' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Id of the order that to be placed' }),
    (0, swagger_1.ApiBody)({ type: update_order_dto_1.UpdateOrderDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Add auth bearer token.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }),
    (0, common_1.Put)('update-status/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, common_1.SetMetadata)('roles', ['Employee']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderStatus", null);
OrderController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map