import { Test, TestingModule } from '@nestjs/testing';
import { FoodOutletsController } from './food-outlets.controller';
import { FoodOutletsService } from '../../services/food-outlets/food-outlets.service';
import { FoodItemsDto } from './dto/food-items.dto';
import { HotelsDto } from './dto/hotels.dto';
import { Hotels } from 'src/entities/food-outlets/hotels.schema';
import { FoodItems } from 'src/entities/food-outlets/food-items.schema';

describe('FoodOutletsController', () => {
  let foodOutletsController: FoodOutletsController;
  let foodOutletsService: FoodOutletsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FoodOutletsController],
      providers: [
        {
          provide: FoodOutletsService,
          useValue: {
            addFoodItem: jest.fn(),
            addHotel: jest.fn(),
            getHotels: jest.fn(),
            getHotelById: jest.fn(),
          }
        },
      ],
    }).compile();

    foodOutletsController = app.get<FoodOutletsController>(FoodOutletsController);
    foodOutletsService = app.get<FoodOutletsService>(FoodOutletsService);
  });

  it('should be defined', () => {
    expect(foodOutletsController).toBeDefined();
  });

  it('should add food items', async () => {
    const item: FoodItemsDto = {
      name: '',
      price: 0,
      images: [],
      category: ''
    };
    const result: FoodItems = {
      itemId: '',
      name: '',
      price: 0,
      images: [],
      category: ''
    };

    jest.spyOn(foodOutletsService, 'addFoodItem').mockResolvedValue(result);
    expect(await foodOutletsController.addFoodItem(item)).toEqual(result);
  });

  it('should add a hotel', async () => {
    const hotel: HotelsDto = {
      hotelName: '',
      address: '',
      foodItems: [],
    };
    jest.spyOn(foodOutletsService, 'addHotel').mockResolvedValue({});
    const result = await foodOutletsController.addHotel(hotel);
    expect(result).toEqual({});
  });
	
  it('should get a list of hotels', async () => {
    const hotels = [];
	
    jest.spyOn(foodOutletsService, 'getHotels').mockResolvedValue(hotels);
	
    const result = await foodOutletsController.getFood();
	
    expect(result).toEqual(hotels);
  });
	
  it('should get a hotel by ID', async () => {
    const hotelId = '123';
    const hotel: Hotels = {
      hotelId: '',
      hotelName: '',
      address: '',
      foodItems: []
    };
	
    jest.spyOn(foodOutletsService, 'getHotelById').mockResolvedValue(hotel);
    const result = await foodOutletsController.getHotelById(hotelId);
    expect(result).toEqual(hotel);
  });
});