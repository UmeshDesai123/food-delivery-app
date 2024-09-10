import { Body, Controller, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { FoodOutletsService } from '../../services/food-outlets/food-outlets.service';
import { HotelsDto } from './dto/hotels.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../../auth/role.guard';
import { FoodItemsDto } from './dto/food-items.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Food Outlets')
@Controller('food-outlets')
export class FoodOutletsController {
  constructor (
		private readonly foodOutletsService: FoodOutletsService,
  ) {}
	
	@ApiOperation({ summary: 'Add new food item' })
	@ApiBody({ type: FoodItemsDto })
	@ApiBearerAuth()
	@ApiHeader({
	  name: 'Authorization',
	  description: 'Bearer Token',
	  example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
	})
	@ApiResponse({ status: 201, description: 'Success.' })
	@ApiUnauthorizedResponse({ description: 'Add auth bearer token.' })
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@Post('add-food-item')
	@UseGuards(AuthGuard('jwt'), RoleGuard)
	@SetMetadata('roles', ['admin'])
  async addFoodItem (@Body() item: FoodItemsDto) {
    return this.foodOutletsService.addFoodItem(item);
  }
	
	@ApiOperation({ summary: 'Add a new hotel' })
	@ApiBody({ type: HotelsDto })
	@ApiBearerAuth()
	@ApiHeader({
	  name: 'Authorization',
	  description: 'Bearer Token',
	  example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
	})
	@ApiResponse({ status: 201, description: 'Success.' })
	@ApiUnauthorizedResponse({ description: 'Add auth bearer token.' })
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@Post('add-hotel')
	@UseGuards(AuthGuard('jwt'), RoleGuard)
	@SetMetadata('roles', ['admin'])
	async addHotel (@Body() hotel: HotelsDto) {
	  return await this.foodOutletsService.addHotel(hotel);
	}

	@ApiOperation({ summary: 'Get hotels' })
	@ApiBearerAuth()
	@ApiHeader({
	  name: 'Authorization',
	  description: 'Bearer Token',
	  example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
	})
	@ApiResponse({ status: 200, description: 'Success.' })
	@ApiUnauthorizedResponse({ description: 'Add auth bearer token.' })
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@Get('hotels')
	@UseGuards(AuthGuard('jwt'))
	async getFood () {
	  return await this.foodOutletsService.getHotels();
	}

	@ApiOperation({ summary: 'Get hotel by Id' })
	@ApiParam({ name: 'id', type: String, description: '123' })
	@ApiBearerAuth()
	@ApiHeader({
	  name: 'Authorization',
	  description: 'Bearer Token',
	  example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
	})
	@ApiResponse({ status: 200, description: 'Success.' })
	@ApiUnauthorizedResponse({ description: 'Add auth bearer token.' })
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@Get('hotels/:id')
	@UseGuards(AuthGuard('jwt'))
	async getHotelById (@Param('id') id: string) {
	  return await this.foodOutletsService.getHotelById(id);
	}
}