import { Body, Controller, Get, Param, Patch, Post, Put, Query, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '../../utils/hash-password/hash.bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../auth/auth.service';
import { RoleGuard } from '../../auth/role.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateEmployeeDetailsDto } from './dto/update-emp-details.dto';
import { UpdateEmpStatus } from './dto/update-emp-status.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor (
		private readonly userService: UserService,
		private readonly authService: AuthService
  ) {}

	@ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'Success.' })
	@ApiBadRequestResponse({ description: 'Bad Request.' })
	@ApiBody({ type: CreateUserDto })
	@Post('signup')
  async createUser (@Body() userDto: CreateUserDto) {
    const password = await hashPassword(userDto.password);
    return this.userService.createUser({
      ...userDto, password
    });
  }

	@ApiOperation({ summary: 'Verify Email' })
  @ApiResponse({ status: 200, description: 'Email Verified.' })
	@ApiResponse({ status: 400, description: 'Incorrect OTP.' })
	@ApiQuery({ name: 'otp', type: Number, example: 1234 })
	@ApiParam({ name: 'id', type: String, description: '123' })
	@Get('/verify-email/:id')
	async verifyEmail (@Query('otp') otp: number, @Param('id') id: string) {
	
	  return await this.userService.verifyEmail(id, Number(otp));
	}

	@Post('login')
	@ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 201, description: 'Login Success.' })
	@ApiBadRequestResponse({ description: 'Bad Request.' })
	@ApiUnauthorizedResponse({ description: 'Incorrect login credentials.' })
	@ApiBody({ type: LoginDto })
	@UseGuards(AuthGuard('local'))
	async login (@Body() body: LoginDto, @Req() req, @Res({ passthrough: true }) res) {
	  const user = {
	    userId: req.user.userId,
	    userName: req.user.userName,
	    email: req.user.email,
	    isEmployee: req.user.isEmployee,
	    role: req.user.role,
	    address: req.user.address,
	    isEmailVerified: req.user.isEmailVerified
	  };
	  //generate jwt token
	  const token = this.authService.generateToken(user);
	  user['authorization'] = token;
	  res.setHeader('Authorization', token);
	  return user;
	}

	@ApiOperation({ summary: 'Add Employee Details' })
	@ApiBody({ type: UpdateEmployeeDetailsDto })
	@ApiBearerAuth()
	@ApiHeader({
	  name: 'Authorization',
	  description: 'Bearer Token',
	  example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
	})
	@ApiResponse({ status: 200, description: 'Success.' })
	@ApiUnauthorizedResponse({ description: 'Add auth bearer token.' })
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@Put('add-employee-details')
	@UseGuards(AuthGuard('jwt'), RoleGuard)
	@SetMetadata('roles', ['admin'])
	async addEmpDetails (@Body() updateEmpDetails: UpdateEmployeeDetailsDto) {

	  return await this.userService.addEmpDetails(updateEmpDetails);
	}

	@ApiOperation({ summary: 'Add new role' })
	@ApiBody({ type: AddRoleDto })
	@ApiBearerAuth()
	@ApiHeader({
	  name: 'Authorization',
	  description: 'Bearer Token',
	  example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
	})
	@ApiResponse({ status: 201, description: 'Success.' })
	@ApiUnauthorizedResponse({ description: 'Add auth bearer token.' })
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@Post('add-role')
	@UseGuards(AuthGuard('jwt'), RoleGuard)
	@SetMetadata('roles', ['admin'])
	async addRole (@Body() role: AddRoleDto) {

	  return await this.userService.addRole(role);
	}

	@ApiOperation({ summary: 'Get all roles' })
	@ApiBearerAuth()
	@ApiHeader({
	  name: 'Authorization',
	  description: 'Bearer Token',
	  example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
	})
	@ApiResponse({ status: 200, description: 'Success.' })
	@ApiUnauthorizedResponse({ description: 'Add auth bearer token.' })
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@Get('roles')
	@UseGuards(AuthGuard('jwt'), RoleGuard)
	@SetMetadata('roles', ['admin'])
	async getRoles () {
	  return await this.userService.getRoles();
	}

	@ApiOperation({ summary: 'Update employee status' })
	@ApiBody({ type: UpdateEmpStatus })
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
	async updateEmpStatus (@Param('id') id: string, @Body() status: UpdateEmpStatus) {
	  return await this.userService.updateEmpStatus(id, status);
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiBearerAuth()
	@ApiHeader({
	  name: 'Authorization',
	  description: 'Bearer Token',
	  example: 'Bearer eyJhbGciOiJIUzI1NiIsIn'
	})
	@ApiResponse({ status: 200, description: 'Success.' })
	@ApiUnauthorizedResponse({ description: 'Add auth bearer token.' })
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@Get()
	@UseGuards(AuthGuard('jwt'), RoleGuard)
	@SetMetadata('roles', ['admin'])
	async getAllUsers () {
	  return await this.userService.getAllUsers();
	}
}