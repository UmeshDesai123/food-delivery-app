import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateOrderDto } from 'src/controllers/order/dto/update-order.dto';
import { FoodItemsDocument } from 'src/entities/food-outlets/food-items.schema';
import { HotelDocument } from 'src/entities/food-outlets/hotels.schema';
import { Orders, OrdersDocument } from 'src/entities/order/order.schema';
import { UserDocument } from 'src/entities/user/user.schema';

@Injectable()
export class OrderRepositoryService {
  constructor (
		@InjectModel('orders') private readonly orderModel: Model<OrdersDocument>,
    @InjectModel('users') private readonly usersModel: Model<UserDocument>,
  ) {}

  async createOrder (order) {
    try {
      const newOrder = new this.orderModel(order);
      return newOrder.save();
    } catch (error) {
      return error;
    }
  }

  async getOrderById (id: string) {
    try {
      const orde: any = await this.orderModel.aggregate([
        {
          $match:{
            orderId: id
          }
        },
        {
          $lookup:{
            from: 'users',
            localField: 'customerId',
            foreignField:'userId',
            as: 'customerId'
          },
        },
        {
          $lookup:{
            from: 'users',
            localField: 'employeeId',
            foreignField:'userId',
            as: 'employeeId'
          },
        }
      ]);
      //console.log('>>', orde[0].customerId[0].userName);
      const order = this.orderModel.findOne({ orderId: id });
      return orde;
    } catch (error) {
      return error;
    }
  }

  async getUserOrderHistory (id: string) {
    const userOrder = this.orderModel.aggregate([
      {
        $match:{
          customerId: id
        }
      },
      {
        $lookup:{
          from: 'users',
          localField: 'customerId',
          foreignField:'userId',
          as: 'customerId'
        },
      },
      {
        $lookup:{
          from: 'users',
          localField: 'employeeId',
          foreignField:'userId',
          as: 'employeeId'
        },
      }
    ]);
    return userOrder;
  }

  async placeOrder (id: string, updateInfo) {
    const updatedOrder = await this.orderModel.findOneAndUpdate(
      { orderId: id },
      { $set: updateInfo },
      { new: true }
    );
    return updatedOrder;
  }

  // async updateOrder (orderId: string, updateOrder: UpdateOrderDto): Promise<Orders> {
  //   const employeeId = updateOrder.employeeId;
  //   const orderStatus = updateOrder.orderStatus;
    
  //   const updatedOrder = await this.orderModel.findOneAndUpdate(
  //     { orderId: orderId },
  //     { employeeId, orderStatus },
  //     { new: true },
  //   );
  //   //console.log('..>', updatedOrder);
  //   return updatedOrder;
  // }

  async updateOrderStatus (orderId: string, updateOrder: UpdateOrderDto): Promise<Orders> {
    
    const orderStatus = updateOrder.orderStatus;
    
    const updatedOrder = this.orderModel.findOneAndUpdate(
      { orderId: orderId },
      { orderStatus },
      { new: true },
    );
  
    return updatedOrder;
  }
  
}