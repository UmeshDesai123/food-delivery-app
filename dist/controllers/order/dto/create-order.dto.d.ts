export declare class CreateOrderDto {
    hotelId: string;
    customerId: string;
    items: OrderedItems[];
}
export declare class OrderedItems {
    itemId: string;
    quantity: number;
}
