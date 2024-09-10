import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FoodOutletsRepositoryService } from '../../repository/food-outlets/food-outlets.repository.service';
import { OrderRepositoryService } from '../../repository/order/order.repository.service';
import { UserRepositoryService } from '../../repository/user/user.repository.service';
import { FoodOutletsService } from '../food-outlets/food-outlets.service';
import { CreateOrderDto } from '../../controllers/order/dto/create-order.dto';
import { OrderResponse } from '../../controllers/order/dto/order-response.dto';
import { User } from '../../entities/user/user.schema';
import { Hotels } from '../../entities/food-outlets/hotels.schema';
import { Orders } from '../../entities/order/order.schema';

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepositoryService: OrderRepositoryService;
  let foodOutletsRepositoryService: FoodOutletsRepositoryService;
  let userRepositoryService: UserRepositoryService;
  let foodOutletsService: FoodOutletsService;
	
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      	OrderService,
        {
          provide: OrderRepositoryService,
          useValue: {
            createOrder: jest.fn(),
            getOrderById: jest.fn(),
            getUserOrderHistory: jest.fn(),
            placeOrder: jest.fn(),
            updateOrderStatus: jest.fn(),
          }
        },
        {
          provide: FoodOutletsRepositoryService,
          useValue: {
            getFoodItemsById: jest.fn(),
          }
        },
        {
          provide: UserRepositoryService,
          useValue: {
            getUserById: jest.fn(),
            getAvailableEmp: jest.fn(),
          }
        },
        {
          provide: FoodOutletsService,
          useValue: {
            getHotelById: jest.fn()
          }
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderRepositoryService = module.get<OrderRepositoryService>(OrderRepositoryService);
    foodOutletsRepositoryService = module.get<FoodOutletsRepositoryService>(FoodOutletsRepositoryService);
    userRepositoryService = module.get<UserRepositoryService>(UserRepositoryService);
    foodOutletsService = module.get<FoodOutletsService>(FoodOutletsService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  it('should create order', async () => {
    const orderDto: CreateOrderDto = {
      hotelId: '123h',
      customerId: '123',
      items: []
    };
    const response: OrderResponse = {
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
      orderStatus: ''
    };
    const user: User = {
      userId: '',
      userName: '',
      email: '',
      password: '',
      isEmployee: false,
      role: '',
      address: '',
      isEmailVerified: false,
      verificationOTP: 0,
      empAvailabilityStatus: '',
      empCurrentLocation: ''
    };

    const hotel: Hotels = {
      hotelId: '',
      hotelName: '',
      address: '',
      foodItems: []
    };
    const order: Orders = {
      orderId: '',
      hotelId: '',
      customerId: '',
      employeeId: '',
      orderStatus: '',
      items: []
    };
    jest.spyOn(orderRepositoryService, 'createOrder').mockResolvedValue(order);
    jest.spyOn(userRepositoryService, 'getUserById').mockResolvedValue(user);
    jest.spyOn(foodOutletsService, 'getHotelById').mockResolvedValue([hotel]);
    jest.spyOn(foodOutletsRepositoryService, 'getFoodItemsById').mockResolvedValue([]);
    expect(await orderService.createOrder(orderDto)).toEqual(response);
  });

  it('should return order by id', async () => {
    const orderId = '';
    const order: Orders = {
      orderId: '',
      hotelId: '',
      customerId: '',
      employeeId: '',
      orderStatus: '',
      items: []
    };
    const response: any = {};
    jest.spyOn(orderRepositoryService, 'getOrderById').mockResolvedValue(order);
    jest.spyOn(orderService, 'getOrderResponse').mockResolvedValue(response);
    expect(await orderService.getOrderById(orderId)).toBe(response);
  });

  it('should return order history by userId', async () => {
    const userId = '';
    const order = [{
      orderId: '',
      hotelId: '',
      customerId: [{
        userId: '',
        userName: '',
        address: '',
        email: ''
      }],
      employeeId: '',
      orderStatus: '',
      items: []
    }];
    const hotel: Hotels[] = [{
      hotelId: '',
      hotelName: '',
      address: '',
      foodItems: []
    }];
    const response: OrderResponse[] = [{
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
      orderStatus: ''
    }];
    
    jest.spyOn(orderRepositoryService, 'getUserOrderHistory').mockResolvedValue(order);
    jest.spyOn(foodOutletsService, 'getHotelById').mockResolvedValue(hotel);
    jest.spyOn(foodOutletsRepositoryService, 'getFoodItemsById').mockResolvedValue([]);
    expect(await orderService.getUserOrderHistory(userId)).toEqual(response);
  });

  it('should place order', async () => {
    const order: any = [{
      orderId: '',
      hotelId: '',
      customerId: [{
        userId: '',
        userName: '',
        address: '',
        email: ''
      }],
      employeeId: '',
      orderStatus: 'Created',
      items: []
    }];
    const users: any = [{
      userId: '',
      userName: '',
      address: '',
      email: ''
    }];
    const response: any = {};
    try {
      jest.spyOn(userRepositoryService, 'getAvailableEmp').mockResolvedValue(users);
      jest.spyOn(orderRepositoryService, 'placeOrder').mockResolvedValue(order);
      jest.spyOn(orderService, 'setOrderResponse').mockResolvedValue(response);
      await orderService.placeOrder('id');
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should return response in required formate getOrderResponse', async () => {
    const order: any = [{
      orderId: '',
      hotelId: '',
      customerId: [{
        userId: '',
        userName: '',
        address: '',
        email: ''
      }],
      employeeId: [{
        userId: '',
        userName: '',
        address: '',
        email: ''
      }],
      orderStatus: 'Created',
      items: []
    }];
    const hotel: Hotels[] = [{
      hotelId: '',
      hotelName: '',
      address: '',
      foodItems: []
    }];

    jest.spyOn(foodOutletsService, 'getHotelById').mockResolvedValue(hotel);
    jest.spyOn(foodOutletsRepositoryService, 'getFoodItemsById').mockResolvedValue({});
    expect(await orderService.getOrderResponse(order)).toEqual({
      'employeeId': '',
      'employeeName': '',
      'hotelAdd': '',
      'hotelId': '',
      'hotelName': '',
      'orderId': '',
      'orderItems': [],
      'orderStatus': 'Created',
      'totalPrice': 0,
      'userAdd': undefined,
      'userEmail': '',
      'userId': '',
      'userName': '',
    });
  });

  it('should return response in required formate setOrderResponse', async () => {
    const order: any = {
      orderId: '',
      hotelId: '',
      customerId: '',
      employeeId: '',
      orderStatus: 'Created',
      items: [{
        itemId: '',
        quantity: 1
      }]
    };
    const hotel = [{
      hotelId: '',
      hotelName: '',
      address: '',
      foodItems: [{
        itemId: '',
        price: 1
      }]
    }];

    const user: User = {
      userId: '',
      userName: '',
      email: '',
      password: '',
      isEmployee: false,
      role: '',
      address: '',
      isEmailVerified: false,
      verificationOTP: 0,
      empAvailabilityStatus: '',
      empCurrentLocation: ''
    };

    jest.spyOn(foodOutletsService, 'getHotelById').mockResolvedValue(hotel);
    jest.spyOn(userRepositoryService, 'getUserById').mockResolvedValue(user);
    expect(await orderService.setOrderResponse(order)).toEqual({
      'employeeId': '',
      'hotelAdd': '',
      'hotelId': '',
      'hotelName': '',
      'orderId': '',
      'orderItems': [
        {
          'itemName': undefined,
          'itemPrice': 1,
          'quantity': 1,
          'total': 1,
        },
      ],
      'orderStatus': 'Created',
      'totalPrice': 1,
      'userAdd': '',
      'userEmail': '',
      'userId': '',
      'userName': '',
    });
  });
});