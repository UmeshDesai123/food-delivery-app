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
import { Document } from 'mongoose';
export type OrdersDocument = Orders & Document;
export declare class Orders {
    orderId: string;
    hotelId: string;
    customerId: string;
    employeeId: string;
    orderStatus: string;
    items: OrderItems[];
}
export declare class OrderItems {
    itemId: string;
    quantity: number;
}
export declare const OrderSchema: import("mongoose").Schema<Orders, import("mongoose").Model<Orders, any, any, any, Document<unknown, any, Orders> & Omit<Orders & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Orders, Document<unknown, {}, import("mongoose").FlatRecord<Orders>> & Omit<import("mongoose").FlatRecord<Orders> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
