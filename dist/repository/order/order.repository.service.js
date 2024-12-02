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
exports.OrderRepositoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OrderRepositoryService = class OrderRepositoryService {
    constructor(orderModel, usersModel) {
        this.orderModel = orderModel;
        this.usersModel = usersModel;
    }
    async createOrder(order) {
        try {
            const newOrder = new this.orderModel(order);
            return newOrder.save();
        }
        catch (error) {
            return error;
        }
    }
    async getOrderById(id) {
        try {
            const orde = await this.orderModel.aggregate([
                {
                    $match: {
                        orderId: id
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'customerId',
                        foreignField: 'userId',
                        as: 'customerId'
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'employeeId',
                        foreignField: 'userId',
                        as: 'employeeId'
                    },
                }
            ]);
            const order = this.orderModel.findOne({ orderId: id });
            return orde;
        }
        catch (error) {
            return error;
        }
    }
    async getUserOrderHistory(id) {
        const userOrder = this.orderModel.aggregate([
            {
                $match: {
                    customerId: id
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'customerId',
                    foreignField: 'userId',
                    as: 'customerId'
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'employeeId',
                    foreignField: 'userId',
                    as: 'employeeId'
                },
            }
        ]);
        return userOrder;
    }
    async placeOrder(id, updateInfo) {
        const updatedOrder = await this.orderModel.findOneAndUpdate({ orderId: id }, { $set: updateInfo }, { new: true });
        return updatedOrder;
    }
    async updateOrderStatus(orderId, updateOrder) {
        const orderStatus = updateOrder.orderStatus;
        const updatedOrder = this.orderModel.findOneAndUpdate({ orderId: orderId }, { orderStatus }, { new: true });
        return updatedOrder;
    }
};
OrderRepositoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('orders')),
    __param(1, (0, mongoose_1.InjectModel)('users')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], OrderRepositoryService);
exports.OrderRepositoryService = OrderRepositoryService;
//# sourceMappingURL=order.repository.service.js.map