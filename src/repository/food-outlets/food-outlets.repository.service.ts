import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodItemsDocument } from '../../entities/food-outlets/food-items.schema';
import { HotelDocument } from '../../entities/food-outlets/hotels.schema';

@Injectable()
export class FoodOutletsRepositoryService {
  constructor (
		@InjectModel('hotels') private readonly hotelsModel: Model<HotelDocument>,
		@InjectModel('foodItems') private readonly foodItemsModel: Model<FoodItemsDocument>
  ) {}
	
  async addFoodItems (food) {
    try {
      const newFood = new this.foodItemsModel(food);
      return newFood.save();
    } catch (error) {
      return error;
    }
  }

  async addHotels (hotel) {
    try {
      const newHotel = new this.hotelsModel(hotel);
      return newHotel.save();
    } catch (error) {
      return error;
    }
  }

  async getFoodItemsById (id: string) {
    try {
      return await this.foodItemsModel.findOne({ itemId: id });
    } catch (error) {
      return error;
    }
  }

  async getHotelById (id) {
    try {
      const res = await this.hotelsModel.aggregate([
        {
          $match: {
            hotelId: id,
          },
        },
        {
          $lookup:{
            from: 'fooditems',
            localField: 'foodItems',
            foreignField:'itemId',
            as: 'foodItems'
          }
        }
      ]);
      return res;
      //console.log('res>>', res);
      //return await this.hotelsModel.findOne({ hotelId: id });
    } catch (error) {
      return error;
    }
  }

  async getHotels () {
    try {
      const res = await this.hotelsModel.aggregate([
        {
          $lookup:{
            from: 'fooditems',
            localField: 'foodItems',
            foreignField:'itemId',
            as: 'foodItems'
          }
        }
      ]);
      return res;
      // console.log(res);
      // return await this.hotelsModel.find();
      
    } catch (error) {
      return error;
    }
  }
  
}