import { Injectable } from '@nestjs/common';
import { FoodOutletsRepositoryService } from '../../repository/food-outlets/food-outlets.repository.service';
import { HotelsDto } from '../../controllers/food-outlets/dto/hotels.dto';
import { ObjectId, Types } from 'mongoose';
import { Hotels } from '../../entities/food-outlets/hotels.schema';
import { FoodItems } from '../../entities/food-outlets/food-items.schema';

@Injectable()
export class FoodOutletsService {
  constructor (private readonly foodOutletsRepositoryService: FoodOutletsRepositoryService) {}
	
  async addFoodItem (item) {
    return await this.foodOutletsRepositoryService.addFoodItems({ ...item, itemId: new Types.ObjectId().toString() });
  }

  async addHotel (hotel: HotelsDto) {
    return await this.foodOutletsRepositoryService.addHotels({ ...hotel, hotelId: new Types.ObjectId().toString() });
  }

  async getHotels () {
    try {
      const hotels = await this.foodOutletsRepositoryService.getHotels();
	
      return hotels;
    } catch (error) {
      return error;
    }
  }

  async getHotelById (id) {
    const hotel = await this.foodOutletsRepositoryService.getHotelById(id);
    return hotel;
  }
	
}