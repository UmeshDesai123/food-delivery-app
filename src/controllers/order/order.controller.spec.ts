import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../../services/order/order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: 	OrderService,
          useValue: {
            createOrder: jest.fn(),
            getOrderById: jest.fn(),
            getUserOrderHistory: jest.fn(),
            updateOrderStatus: jest.fn(),
            placeOrder: jest.fn(),
          }
        },
      ],
    }).compile();

    orderController = app.get<OrderController>(OrderController);
    orderService = app.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const order: CreateOrderDto = {
        hotelId: '',
        customerId: '',
        items: []
      };
      const expectedResult = {};
      jest.spyOn(orderService, 'createOrder').mockResolvedValue(expectedResult);
      expect(await orderController.createOrder(order)).toBe(expectedResult);
      expect(orderService.createOrder).toHaveBeenCalledWith(order);
    });
  });

  describe('placeOrder', () => {
    it('should place an order', async () => {
      const orderId = '123';
      const expectedResult: any = {};
      jest.spyOn(orderService, 'placeOrder').mockResolvedValue(expectedResult);
      expect(await orderController.placeOrder(orderId)).toBe(expectedResult);
      expect(orderService.placeOrder).toHaveBeenCalledWith(orderId);
    });
  });

  describe('getOrderById', () => {
    it('should get an order by ID', async () => {
      const orderId = '123';
      const expectedResult: any = {};
      jest.spyOn(orderService, 'getOrderById').mockResolvedValue(expectedResult);
      expect(await orderController.getOrderById(orderId)).toBe(expectedResult);
      expect(orderService.getOrderById).toHaveBeenCalledWith(orderId);
    });
  });

  describe('getUserOrderHistory', () => {
    it('should get the order history of a user', async () => {
      const userId = '123';
      const expectedResult: any = {};
      jest.spyOn(orderService, 'getUserOrderHistory').mockResolvedValue(expectedResult);
      expect(await orderController.getUserOrderHistory(userId)).toBe(expectedResult);
      expect(orderService.getUserOrderHistory).toHaveBeenCalledWith(userId);
    });
  });

  describe('updateOrderStatus', () => {
    it('should update the status of an order', async () => {
      const orderId = '123';
      const updateBody: UpdateOrderDto = {
        orderStatus: ''
      };
      const expectedResult: any= {};
      jest.spyOn(orderService, 'updateOrderStatus').mockResolvedValue(expectedResult);
      expect(await orderController.updateOrderStatus(orderId, updateBody)).toBe(expectedResult);
      expect(orderService.updateOrderStatus).toHaveBeenCalledWith(orderId, updateBody);
    });
  });

});