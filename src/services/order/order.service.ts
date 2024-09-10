import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepositoryService } from '../../repository/order/order.repository.service';
import { FoodOutletsRepositoryService } from '../../repository/food-outlets/food-outlets.repository.service';
import { UserRepositoryService } from '../../repository/user/user.repository.service';
import { Types } from 'mongoose';
import { Orders } from '../../entities/order/order.schema';
import { OrderResponse } from '../../controllers/order/dto/order-response.dto';
import { User } from '../../entities/user/user.schema';
import { Hotels } from '../../entities/food-outlets/hotels.schema';
import { FoodOutletsService } from '../food-outlets/food-outlets.service';
import { use } from 'passport';
import { CreateOrderDto } from '../../controllers/order/dto/create-order.dto';
import { UpdateOrderDto } from '../../controllers/order/dto/update-order.dto';
import { FoodItems } from '../../entities/food-outlets/food-items.schema';

@Injectable()
export class OrderService {
  constructor (
		private readonly orderRepositoryService: OrderRepositoryService,
    private readonly foodOutletsRepositoryService: FoodOutletsRepositoryService,
    private readonly userRepositoryService: UserRepositoryService,
		private readonly foodOutletsService: FoodOutletsService,
  ) {}

  async createOrder (order: CreateOrderDto) {
    try {
      const newOrder: Orders = await this.orderRepositoryService.createOrder({ ...order, orderId: new Types.ObjectId().toString(), orderStatus: 'Created' });
      const hotel: any = await this.foodOutletsService.getHotelById(newOrder.hotelId);
      const user: User = await this.userRepositoryService.getUserById(newOrder.customerId);
      
      //console.log('hotel', hotel);
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
      //console.log('re', response);
      const items = newOrder.items.map((i) => {
        const item = hotel[0].foodItems.find((foodItem) => foodItem.itemId === i.itemId);
        if (!item) {
          throw new NotFoundException(`Selected item not available, itemId: ${i.itemId}`);
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

      const totalPrice = items.reduce((acc, curr) => acc+curr.total, 0);

      response.totalPrice = totalPrice;
      response.orderStatus = newOrder.orderStatus;
      //console.log('res>>', response);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getOrderById (id: string) {
    const order: Orders = await this.orderRepositoryService.getOrderById(id);
    const response = await this.getOrderResponse(order);
    return response;
  }

  async getUserOrderHistory (userId: string) {
    const userOrders = await this.orderRepositoryService.getUserOrderHistory(userId);
    //console.log('ordddd', userOrders);
    const orderPromises = userOrders.map(async (order) => {
      const hotel: Hotels = await this.foodOutletsService.getHotelById(order.hotelId);
      //const user: User = await this.userRepositoryService.getUserById(order.customerId);
      //console.log('hotel..', hotel);
      const response: OrderResponse = {
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
      //console.log('res>>', response);
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
      //const neRes = this.setOrderResponse(order)
      return response;
    });
  
    const orderResponses = await Promise.all(orderPromises);
    return orderResponses;
  }

  async updateOrderStatus (orderId: string, updateBody: UpdateOrderDto) {
    const order = await this.orderRepositoryService.getOrderById(orderId);
    const currentStatus = order[0].orderStatus;
    const { orderStatus } = updateBody;

    if (orderStatus === 'Picked-up') {
      if (currentStatus === 'Placed') {
        await this.userRepositoryService.updateEmpStatus(order[0].employeeId[0].userId, { empAvailabilityStatus: 'busy' });
      } else {
        throw new BadRequestException('Cannot pick up the order before it is placed');
      }
    } else if (orderStatus === 'Delivered') {
      if (currentStatus !== 'Picked-up') {
        throw new BadRequestException('Cannot deliver the order before it is picked up');
      }
      await this.userRepositoryService.updateEmpStatus(order[0].employeeId[0].userId, { empAvailabilityStatus: 'available' });
    } else {
      if (currentStatus !== 'Picked-up') {
        throw new BadRequestException('Cannot fail the order before it is picked up');
      }
    }
  
    const updatedOrder = await this.orderRepositoryService.updateOrderStatus(orderId, updateBody);
    const resp = await this.setOrderResponse(updatedOrder);

    return resp;
  }
  

  async placeOrder (orderId) {
    const order: Orders = await this.orderRepositoryService.getOrderById(orderId);
    //console.log('or>>', order);
    
    if(order[0]?.orderStatus != 'Created') {
      throw new BadRequestException('Order cant be placed');
    }
    const hotel = await this.foodOutletsService.getHotelById(order[0].hotelId);
    //console.log('hot>>', hotel);
    if(hotel[0]?.address != order[0].customerId[0]?.address) {
      throw new BadRequestException('customer and hotel should be from same city');
    }
    const employees = await this.userRepositoryService.getAvailableEmp(hotel[0].address);
    //console.log('avai>>', employees);
    if(employees.length === 0) {
      throw new HttpException(
        'Order cannot be placed. No employees available.',
        HttpStatus.OK
      );
    }
    const randomIndex = Math.floor(Math.random() * employees.length);
    const assigned = {
      employeeId: employees[randomIndex].userId,
      orderStatus: 'Placed'
    };
    const placedOrder = await this.orderRepositoryService.placeOrder(orderId, assigned);
    //console.log('placed', placedOrder);
    await this.userRepositoryService.updateEmpStatus(employees[0].userId, { empAvailabilityStatus: 'busy' });
    const response = await this.setOrderResponse(placedOrder);
    return response;
  }

  async getOrderResponse (order: Orders) {
    const hotel: Hotels = await this.foodOutletsService.getHotelById(order[0].hotelId);
    //console.log('hotel', hotel);
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

    const totalPrice = orderItems.reduce((acc, curr) => acc+curr.total, 0);

    response.totalPrice = totalPrice;
    return response;
  }

  async setOrderResponse (order: Orders) {
    const hotel: any = await this.foodOutletsService.getHotelById(order.hotelId);
    const user: User = await this.userRepositoryService.getUserById(order.customerId);
    //const employee: USer = await this.userRepositoryService.getUserById
    //console.log('hotel', hotel);
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
      //employeeName: '',
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
    //console.log('re', response);
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

    const totalPrice = items.reduce((acc, curr) => acc+curr.total, 0);

    response.totalPrice = totalPrice;
    response.employeeId = order.employeeId;
    response.orderStatus = order.orderStatus;
    return response;
  }
}