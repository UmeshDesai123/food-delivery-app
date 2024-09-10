import { Body, Controller, Get, Param, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { OrderService } from '../../services/order/order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../../auth/role.guard';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor (private readonly orderService: OrderService) {}

	@ApiOperation({ summary: 'Create new order' })
	@ApiBody({ type: CreateOrderDto })
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
	@Post('new-order')
	@UseGuards(AuthGuard('jwt'), RoleGuard)
	@SetMetadata('roles', ['Customer'])
  async createOrder (@Body() order: CreateOrderDto) {
    return await this.orderService.createOrder(order);
  }

	@ApiOperation({ summary: 'Place order' })
	@ApiParam({ name: 'id', description: 'Id of the order that to be placed' })
	@ApiBearerAuth()
	@ApiHeader({
	  name: 'Authorization',
	  description: 'Bearer Token',
	  example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
	})
	@ApiResponse({ status: 200, description: 'Success.' })
	@ApiUnauthorizedResponse({ description: 'Add auth bearer token.' })
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@Put('place-order/:id')
	@UseGuards(AuthGuard('jwt'), RoleGuard)
	@SetMetadata('roles', ['Customer'])
	async placeOrder (@Param('id') id: string) {
	  return await this.orderService.placeOrder(id);
	}

	@ApiOperation({ summary: 'Get order by Id' })
	@ApiParam({ name: 'id', description: 'Id of the order' })
	@ApiBearerAuth()
	@ApiHeader({
	  name: 'Authorization',
	  description: 'Bearer Token',
	  example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
	})
	@ApiResponse({ status: 200, description: 'Success.' })
	@ApiUnauthorizedResponse({ description: 'Add auth bearer token.' })
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	async getOrderById (@Param('id') id: string) {
	  return await this.orderService.getOrderById(id);
	}

	@ApiOperation({ summary: 'Get order history of user' })
	@ApiParam({ name: 'id', description: 'Id of the user' })
	@ApiBearerAuth()
	@ApiHeader({
	  name: 'Authorization',
	  description: 'Bearer Token',
	  example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
	})
	@ApiResponse({ status: 200, description: 'Success.' })
	@ApiUnauthorizedResponse({ description: 'Add auth bearer token.' })
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@Get('user/:id')
	@UseGuards(AuthGuard('jwt'), RoleGuard)
	@SetMetadata('roles', ['Customer', 'admin'])
	async getUserOrderHistory (@Param('id') id: string) {
	  return await this.orderService.getUserOrderHistory(id);
	}

	// @Put(':id')
	// @UseGuards(AuthGuard('jwt'), RoleGuard)
	// @SetMetadata('roles', ['admin'])
	// async updateOrder (@Param('id') orderId: string, @Body() updateBody: UpdateOrderDto) {
	//   return await this.orderService.updateOrder(orderId, updateBody);
	// }

	@ApiOperation({ summary: 'Place order' })
	@ApiParam({ name: 'id', description: 'Id of the order that to be placed' })
	@ApiBody({ type: UpdateOrderDto })
	@ApiBearerAuth()
	@ApiHeader({
	  name: 'Authorization',
	  description: 'Bearer Token',
	  example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
	})
	@ApiResponse({ status: 200, description: 'Success.' })
	@ApiUnauthorizedResponse({ description: 'Add auth bearer token.' })
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@Put('update-status/:id')
	@UseGuards(AuthGuard('jwt'), RoleGuard)
	@SetMetadata('roles', ['Employee'])
	async updateOrderStatus (@Param('id') orderId: string, @Body() updateBody: UpdateOrderDto) {
	  return await this.orderService.updateOrderStatus(orderId, updateBody);
	}
}