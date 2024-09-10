import { Test, TestingModule } from '@nestjs/testing';
import { FoodOutletsRepositoryService } from './food-outlets.repository.service';
import { getModelToken } from '@nestjs/mongoose';
import { Hotels } from 'src/entities/food-outlets/hotels.schema';
import { FoodItemsDto } from 'src/controllers/food-outlets/dto/food-items.dto';

describe('UserRepositoryService', () => {
  let foodOutletsRepositoryService: FoodOutletsRepositoryService;

  class mockModel {
    constructor (private readonly data: any) {}

    save = jest.fn().mockResolvedValue({
      ...this.data
    });

    static aggregate = jest.fn();

    static findOne = jest.fn();

    static findOneAndUpdate = jest.fn();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodOutletsRepositoryService,
        {
          provide: getModelToken('hotels'), //collection name
          useValue: mockModel,
        },
        {
          provide: getModelToken('foodItems'), //collection name
          useValue: mockModel,
        },
      ],
    }).compile();

    foodOutletsRepositoryService = module.get<FoodOutletsRepositoryService>(FoodOutletsRepositoryService);
  });

  it('should be defined', () => {
    expect(foodOutletsRepositoryService).toBeDefined();
  });

  it('should create new user', async () => {
    const hotel = {
      hotelId: '',
      hotelName: '',
      address: '',
      foodItems: []
    };
    
    expect(await foodOutletsRepositoryService.addHotels(hotel)).toEqual({
      hotelId: '',
      hotelName: '',
      address: '',
      foodItems: []
    });
  });

  it('should create new user', async () => {
    const item: FoodItemsDto = {
      name: '',
      price: 0,
      images: [],
      category: ''
    };
    
    expect(await foodOutletsRepositoryService.addFoodItems(item)).toEqual({
      name: '',
      price: 0,
      images: [],
      category: ''
    });
  });
});