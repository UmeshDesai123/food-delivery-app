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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const order_repository_service_1 = require("../../repository/order/order.repository.service");
const food_outlets_repository_service_1 = require("../../repository/food-outlets/food-outlets.repository.service");
const user_repository_service_1 = require("../../repository/user/user.repository.service");
const mongoose_1 = require("mongoose");
const food_outlets_service_1 = require("../food-outlets/food-outlets.service");
let OrderService = class OrderService {
    constructor(orderRepositoryService, foodOutletsRepositoryService, userRepositoryService, foodOutletsService) {
        this.orderRepositoryService = orderRepositoryService;
        this.foodOutletsRepositoryService = foodOutletsRepositoryService;
        this.userRepositoryService = userRepositoryService;
        this.foodOutletsService = foodOutletsService;
    }
    async createOrder(order) {
        try {
            const newOrder = await this.orderRepositoryService.createOrder(Object.assign(Object.assign({}, order), { orderId: new mongoose_1.Types.ObjectId().toString(), orderStatus: 'Created' }));
            const hotel = await this.foodOutletsService.getHotelById(newOrder.hotelId);
            const user = await this.userRepositoryService.getUserById(newOrder.customerId);
            const response = {
                orderId: '',
                userId: '',
                userName: '',
                userAdd: '',
                userEmail: '',
                hotelId: '',
                hotelName: '',
                hotelAdd: '',
                orderItems: [],
                totalPrice: 0,
                orderStatus: '',
            };
            response.orderId = newOrder.orderId;
            response.userId = user.userId;
            response.userName = user.userName;
            response.userEmail = user.email;
            response.userAdd = user.address;
            response.hotelId = hotel[0].hotelId;
            response.hotelName = hotel[0].hotelName;
            response.hotelAdd = hotel[0].address;
            const items = newOrder.items.map((i) => {
                const item = hotel[0].foodItems.find((foodItem) => foodItem.itemId === i.itemId);
                if (!item) {
                    throw new common_1.NotFoundException(`Selected item not available, itemId: ${i.itemId}`);
                }
                const total = item.price * i.quantity;
                return {
                    itemName: item.name,
                    itemPrice: item.price,
                    quantity: i.quantity,
                    total: total
                };
            });
            response.orderItems = items;
            const totalPrice = items.reduce((acc, curr) => acc + curr.total, 0);
            response.totalPrice = totalPrice;
            response.orderStatus = newOrder.orderStatus;
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async getOrderById(id) {
        const order = await this.orderRepositoryService.getOrderById(id);
        const response = await this.getOrderResponse(order);
        return response;
    }
    async getUserOrderHistory(userId) {
        const userOrders = await this.orderRepositoryService.getUserOrderHistory(userId);
        const orderPromises = userOrders.map(async (order) => {
            const hotel = await this.foodOutletsService.getHotelById(order.hotelId);
            const response = {
                orderId: order.orderId,
                userId: order.customerId[0].userId,
                userName: order.customerId[0].userName,
                userAdd: order.customerId[0].address,
                userEmail: order.customerId[0].email,
                hotelId: hotel[0].hotelId,
                hotelName: hotel[0].hotelName,
                hotelAdd: hotel[0].address,
                orderItems: [],
                totalPrice: 0,
                orderStatus: '',
            };
            const orderItemsPromise = order.items.map(async (i) => {
                const item = await this.foodOutletsRepositoryService.getFoodItemsById(i.itemId);
                const total = item.price * i.quantity;
                return {
                    itemName: item.name,
                    itemPrice: item.price,
                    quantity: i.quantity,
                    total: total,
                };
            });
            const orderItems = await Promise.all(orderItemsPromise);
            response.orderItems = orderItems;
            const totalPrice = orderItems.reduce((acc, curr) => acc + curr.total, 0);
            response.totalPrice = totalPrice;
            response.orderStatus = order.orderStatus;
            return response;
        });
        const orderResponses = await Promise.all(orderPromises);
        return orderResponses;
    }
    async updateOrderStatus(orderId, updateBody) {
        const order = await this.orderRepositoryService.getOrderById(orderId);
        const currentStatus = order[0].orderStatus;
        const { orderStatus } = updateBody;
        if (orderStatus === 'Picked-up') {
            if (currentStatus === 'Placed') {
                await this.userRepositoryService.updateEmpStatus(order[0].employeeId[0].userId, { empAvailabilityStatus: 'busy' });
            }
            else {
                throw new common_1.BadRequestException('Cannot pick up the order before it is placed');
            }
        }
        else if (orderStatus === 'Delivered') {
            if (currentStatus !== 'Picked-up') {
                throw new common_1.BadRequestException('Cannot deliver the order before it is picked up');
            }
            await this.userRepositoryService.updateEmpStatus(order[0].employeeId[0].userId, { empAvailabilityStatus: 'available' });
        }
        else {
            if (currentStatus !== 'Picked-up') {
                throw new common_1.BadRequestException('Cannot fail the order before it is picked up');
            }
        }
        const updatedOrder = await this.orderRepositoryService.updateOrderStatus(orderId, updateBody);
        const resp = await this.setOrderResponse(updatedOrder);
        return resp;
    }
    async placeOrder(orderId) {
        var _a, _b, _c;
        const order = await this.orderRepositoryService.getOrderById(orderId);
        if (((_a = order[0]) === null || _a === void 0 ? void 0 : _a.orderStatus) != 'Created') {
            throw new common_1.BadRequestException('Order cant be placed');
        }
        const hotel = await this.foodOutletsService.getHotelById(order[0].hotelId);
        if (((_b = hotel[0]) === null || _b === void 0 ? void 0 : _b.address) != ((_c = order[0].customerId[0]) === null || _c === void 0 ? void 0 : _c.address)) {
            throw new common_1.BadRequestException('customer and hotel should be from same city');
        }
        const employees = await this.userRepositoryService.getAvailableEmp(hotel[0].address);
        if (employees.length === 0) {
            throw new common_1.HttpException('Order cannot be placed. No employees available.', common_1.HttpStatus.OK);
        }
        const randomIndex = Math.floor(Math.random() * employees.length);
        const assigned = {
            employeeId: employees[randomIndex].userId,
            orderStatus: 'Placed'
        };
        const placedOrder = await this.orderRepositoryService.placeOrder(orderId, assigned);
        await this.userRepositoryService.updateEmpStatus(employees[0].userId, { empAvailabilityStatus: 'busy' });
        const response = await this.setOrderResponse(placedOrder);
        return response;
    }
    async getOrderResponse(order) {
        const hotel = await this.foodOutletsService.getHotelById(order[0].hotelId);
        const response = {
            orderId: '',
            userId: '',
            userName: '',
            userAdd: '',
            userEmail: '',
            hotelId: '',
            hotelName: '',
            hotelAdd: '',
            orderItems: [],
            totalPrice: 0,
            employeeId: '',
            employeeName: '',
            orderStatus: ''
        };
        response.orderId = order[0].orderId;
        response.userId = order[0].customerId[0].userId;
        response.userName = order[0].customerId[0].userName;
        response.userEmail = order[0].customerId[0].email;
        response.userAdd = order[0].customerId[0].adress;
        response.hotelId = order[0].hotelId;
        response.hotelName = hotel[0].hotelName;
        response.hotelAdd = hotel[0].address;
        response.employeeId = order[0].employeeId[0].userId;
        response.employeeName = order[0].employeeId[0].userName;
        response.orderStatus = order[0].orderStatus;
        const orderItemsPromise = order[0].items.map(async (i) => {
            const item = await this.foodOutletsRepositoryService.getFoodItemsById(i.itemId);
            const total = item.price * i.quantity;
            return {
                itemName: item.name,
                itemPrice: item.price,
                quantity: i.quantity,
                total: total
            };
        });
        const orderItems = await Promise.all(orderItemsPromise);
        response.orderItems = orderItems;
        const totalPrice = orderItems.reduce((acc, curr) => acc + curr.total, 0);
        response.totalPrice = totalPrice;
        return response;
    }
    async setOrderResponse(order) {
        const hotel = await this.foodOutletsService.getHotelById(order.hotelId);
        const user = await this.userRepositoryService.getUserById(order.customerId);
        const response = {
            orderId: '',
            userId: '',
            userName: '',
            userAdd: '',
            userEmail: '',
            hotelId: '',
            hotelName: '',
            hotelAdd: '',
            orderItems: [],
            totalPrice: 0,
            employeeId: '',
            orderStatus: '',
        };
        response.orderId = order.orderId;
        response.userId = user.userId;
        response.userName = user.userName;
        response.userEmail = user.email;
        response.userAdd = user.address;
        response.hotelId = hotel[0].hotelId;
        response.hotelName = hotel[0].hotelName;
        response.hotelAdd = hotel[0].address;
        const items = order.items.map((i) => {
            const item = hotel[0].foodItems.find((foodItem) => foodItem.itemId === i.itemId);
            const total = item.price * i.quantity;
            return {
                itemName: item.name,
                itemPrice: item.price,
                quantity: i.quantity,
                total: total
            };
        });
        response.orderItems = items;
        const totalPrice = items.reduce((acc, curr) => acc + curr.total, 0);
        response.totalPrice = totalPrice;
        response.employeeId = order.employeeId;
        response.orderStatus = order.orderStatus;
        return response;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_repository_service_1.OrderRepositoryService,
        food_outlets_repository_service_1.FoodOutletsRepositoryService,
        user_repository_service_1.UserRepositoryService,
        food_outlets_service_1.FoodOutletsService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map