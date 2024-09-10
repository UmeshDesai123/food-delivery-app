import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { OrderController } from 'src/controllers/order/order.controller';
import { FoodItemsSchema } from 'src/entities/food-outlets/food-items.schema';
import { HotelsSchema } from 'src/entities/food-outlets/hotels.schema';
import { OrderSchema } from 'src/entities/order/order.schema';
import { RoleSchema } from 'src/entities/user/role.schema';
import { UserSchema } from 'src/entities/user/user.schema';
import { FoodOutletsRepositoryService } from 'src/repository/food-outlets/food-outlets.repository.service';
import { OrderRepositoryService } from 'src/repository/order/order.repository.service';
import { UserRepositoryService } from 'src/repository/user/user.repository.service';
import { FoodOutletsService } from 'src/services/food-outlets/food-outlets.service';
import { OrderService } from 'src/services/order/order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'orders', schema: OrderSchema },
      { name: 'hotels', schema: HotelsSchema },
      { name: 'foodItems', schema: FoodItemsSchema },
      { name: 'users', schema: UserSchema },
      { name: 'roles', schema: RoleSchema }
    ]),
    AuthModule
  ],
  controllers: [OrderController],
  providers: [
    OrderService, OrderRepositoryService, FoodOutletsRepositoryService, UserRepositoryService, FoodOutletsService
  ],
  exports: [],
})
export class OrderModule {}