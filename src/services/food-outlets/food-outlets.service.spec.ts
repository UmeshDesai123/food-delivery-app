import { Test, TestingModule } from '@nestjs/testing';
import { FoodOutletsService } from './food-outlets.service';
import { FoodOutletsRepositoryService } from '../../repository/food-outlets/food-outlets.repository.service';
import { FoodItemsDto } from 'src/controllers/food-outlets/dto/food-items.dto';
import { HotelsDto } from 'src/controllers/food-outlets/dto/hotels.dto';

describe('FoodOutletsService', () => {
  let foodOutletsService: FoodOutletsService;
  let foodOutletsRepositoryService: FoodOutletsRepositoryService;
	
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodOutletsService,
        {
          provide: FoodOutletsRepositoryService,
          useValue: {
            addFoodItems: jest.fn(),
            addHotels: jest.fn(),
            getFoodItemsById: jest.fn(),
            getHotelById: jest.fn(),
            getHotels: jest.fn(),
          }
        }
      ],
    }).compile();

    foodOutletsService = module.get<FoodOutletsService>(FoodOutletsService);
    foodOutletsRepositoryService = module.get<FoodOutletsRepositoryService>(FoodOutletsRepositoryService);
  });

  it('should be defined', () => {
    expect(foodOutletsService).toBeDefined();
  });

  it('should add food items', async () => {
    const item: FoodItemsDto = {
      name: '',
      price: 0,
      images: [],
      category: ''
    };
    jest.spyOn(foodOutletsRepositoryService, 'addFoodItems').mockResolvedValue({});
    expect(await foodOutletsService.addFoodItem(item)).toEqual({});
  });

  it('should add hotel', async () => {
    const hotel: HotelsDto = {
      hotelName: '',
      address: '',
      foodItems: []
    };
    const expectedResult = {};
    jest.spyOn(foodOutletsRepositoryService, 'addHotels').mockResolvedValue(expectedResult);
    expect(await foodOutletsService.addHotel(hotel)).toEqual(expectedResult);
  });

  it('should get hotels', async () => {
    const hotels = [{ name: 'Hotel ABC' }];
    jest.spyOn(foodOutletsRepositoryService, 'getHotels').mockResolvedValue(hotels);
    expect(await foodOutletsService.getHotels()).toEqual(hotels);
  });

  it('should get hotel by id', async () => {
    const hotelId = 'hotel_id';
    const hotel = { name: 'Hotel ABC' };
    jest.spyOn(foodOutletsRepositoryService, 'getHotelById').mockResolvedValue(hotel);
    expect(await foodOutletsService.getHotelById(hotelId)).toEqual(hotel);
    
  });
});