import { FoodOutletsRepositoryService } from '../../repository/food-outlets/food-outlets.repository.service';
import { HotelsDto } from '../../controllers/food-outlets/dto/hotels.dto';
export declare class FoodOutletsService {
    private readonly foodOutletsRepositoryService;
    constructor(foodOutletsRepositoryService: FoodOutletsRepositoryService);
    addFoodItem(item: any): Promise<any>;
    addHotel(hotel: HotelsDto): Promise<any>;
    getHotels(): Promise<any>;
    getHotelById(id: any): Promise<any>;
}
