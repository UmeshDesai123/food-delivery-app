import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { FoodOutletsController } from 'src/controllers/food-outlets/food-outlets.controller';
import { FoodItemsSchema } from 'src/entities/food-outlets/food-items.schema';
import { HotelsSchema } from 'src/entities/food-outlets/hotels.schema';
import { FoodOutletsRepositoryService } from 'src/repository/food-outlets/food-outlets.repository.service';
import { FoodOutletsService } from 'src/services/food-outlets/food-outlets.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'hotels', schema: HotelsSchema },
      { name: 'foodItems', schema: FoodItemsSchema }
    ]),
    AuthModule
  ],
  controllers: [FoodOutletsController],
  providers: [FoodOutletsService, FoodOutletsRepositoryService],
  exports: [FoodOutletsRepositoryService],
})
export class FoodOutletsModule {}