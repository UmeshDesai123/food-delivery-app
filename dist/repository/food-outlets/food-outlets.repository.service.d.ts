import { Model } from 'mongoose';
import { FoodItemsDocument } from '../../entities/food-outlets/food-items.schema';
import { HotelDocument } from '../../entities/food-outlets/hotels.schema';
export declare class FoodOutletsRepositoryService {
    private readonly hotelsModel;
    private readonly foodItemsModel;
    constructor(hotelsModel: Model<HotelDocument>, foodItemsModel: Model<FoodItemsDocument>);
    addFoodItems(food: any): Promise<any>;
    addHotels(hotel: any): Promise<any>;
    getFoodItemsById(id: string): Promise<any>;
    getHotelById(id: any): Promise<any>;
    getHotels(): Promise<any>;
}
