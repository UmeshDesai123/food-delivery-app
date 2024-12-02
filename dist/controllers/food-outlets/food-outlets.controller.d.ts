import { FoodOutletsService } from '../../services/food-outlets/food-outlets.service';
import { HotelsDto } from './dto/hotels.dto';
import { FoodItemsDto } from './dto/food-items.dto';
export declare class FoodOutletsController {
    private readonly foodOutletsService;
    constructor(foodOutletsService: FoodOutletsService);
    addFoodItem(item: FoodItemsDto): Promise<any>;
    addHotel(hotel: HotelsDto): Promise<any>;
    getFood(): Promise<any>;
    getHotelById(id: string): Promise<any>;
}
