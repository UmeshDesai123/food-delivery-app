import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateEmployeeDetailsDto } from './dto/update-emp-details.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateEmpStatus } from './dto/update-emp-status.dto';


describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            verifyEmail: jest.fn(),
            getAllUsers: jest.fn(),
            addEmpDetails: jest.fn(),
            sendVerificationEmail: jest.fn(),
            addRole: jest.fn(),
            getRoles: jest.fn(),
            updateEmpStatus: jest.fn(),
          }
        },
        {
          provide: AuthService,
          useValue: {
            generateToken: jest.fn()
          }
        }
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
    authService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should create new user', async () => {
    const user: CreateUserDto = {
      userName: '',
      email: '',
      password: '',
      isEmployee: '',
      address: ''
    };

    jest.spyOn(userService, 'createUser').mockResolvedValue({});
    expect(await userController.createUser(user)).toEqual({});
  });

  it('should verify email', async () => {
    const id = '1';
    const otp = 1234;
    const result: any = {
      userName: '',
      email: '',
      password: '',
      isEmployee: '',
      address: ''
    };
    jest.spyOn(userService, 'verifyEmail').mockResolvedValue(result);
    expect(await userController.verifyEmail(otp, id)).toEqual(result);
  });

  // it('should login user', async () => {
  //   const login: LoginDto = {
  //     username: '',
  //     password: ''
  //   };
    
  //   //jest.spyOn(authService, 'generateToken').mockResolvedValue('');
  //   expect(await userController.login(login, null, null)).toEqual('');
  // });

  it('should add emp role', async () => {
    const body: UpdateEmployeeDetailsDto = {
      userId: '',
      role: ''
    };
    const result: any = {
      userName: '',
      email: '',
      password: '',
      isEmployee: '',
      address: ''
    };
    jest.spyOn(userService, 'addEmpDetails').mockResolvedValue(result);
    expect(await userController.addEmpDetails(body)).toEqual(result);
  });

  it('should add role', async () => {
    const body: AddRoleDto = {
      role: ''
    };
    const result: any = {
      roleId: '',
      role: '',
    };
    jest.spyOn(userService, 'addRole').mockResolvedValue(result);
    expect(await userController.addRole(body)).toEqual(result);
  });

  it('should get all role', async () => {
    const result: any = {
      roleId: '',
      role: '',
    };
    jest.spyOn(userService, 'getRoles').mockResolvedValue(result);
    expect(await userController.getRoles()).toEqual(result);
  });

  it('should update status', async () => {
    const body: UpdateEmpStatus = {
      empAvailabilityStatus: '',
      empCurrentLocation: ''
    };
    const result: any = {
      userName: '',
      email: '',
      password: '',
      isEmployee: '',
      address: '',
    };
    jest.spyOn(userService, 'updateEmpStatus').mockResolvedValue(result);
    expect(await userController.updateEmpStatus('id', body)).toEqual(result);
  });

  it('should get all users', async () => {
    const result = [];
    jest.spyOn(userService, 'getAllUsers').mockResolvedValue(result);
    expect(await userController.getAllUsers()).toEqual(result);
  });
});
