/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { UpdateOrderDto } from 'src/controllers/order/dto/update-order.dto';
import { Orders, OrdersDocument } from 'src/entities/order/order.schema';
import { UserDocument } from 'src/entities/user/user.schema';
export declare class OrderRepositoryService {
    private readonly orderModel;
    private readonly usersModel;
    constructor(orderModel: Model<OrdersDocument>, usersModel: Model<UserDocument>);
    createOrder(order: any): Promise<any>;
    getOrderById(id: string): Promise<any>;
    getUserOrderHistory(id: string): Promise<any[]>;
    placeOrder(id: string, updateInfo: any): Promise<import("mongoose").Document<unknown, {}, OrdersDocument> & Omit<Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateOrderStatus(orderId: string, updateOrder: UpdateOrderDto): Promise<Orders>;
}
