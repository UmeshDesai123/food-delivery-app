import { OrderService } from '../../services/order/order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(order: CreateOrderDto): Promise<any>;
    placeOrder(id: string): Promise<{
        orderId: string;
        userId: string;
        userName: string;
        userAdd: string;
        userEmail: string;
        hotelId: string;
        hotelName: string;
        hotelAdd: string;
        orderItems: any[];
        totalPrice: number;
        employeeId: string;
        orderStatus: string;
    }>;
    getOrderById(id: string): Promise<{
        orderId: string;
        userId: string;
        userName: string;
        userAdd: string;
        userEmail: string;
        hotelId: string;
        hotelName: string;
        hotelAdd: string;
        orderItems: any[];
        totalPrice: number;
        employeeId: string;
        employeeName: string;
        orderStatus: string;
    }>;
    getUserOrderHistory(id: string): Promise<import("./dto/order-response.dto").OrderResponse[]>;
    updateOrderStatus(orderId: string, updateBody: UpdateOrderDto): Promise<{
        orderId: string;
        userId: string;
        userName: string;
        userAdd: string;
        userEmail: string;
        hotelId: string;
        hotelName: string;
        hotelAdd: string;
        orderItems: any[];
        totalPrice: number;
        employeeId: string;
        orderStatus: string;
    }>;
}
