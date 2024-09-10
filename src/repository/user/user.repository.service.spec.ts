import { Test, TestingModule } from '@nestjs/testing';
import { UserRepositoryService } from './user.repository.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/controllers/user/dto/create-user.dto';
import { User } from 'src/entities/user/user.schema';

describe('UserRepositoryService', () => {
  let userRepositoryService: UserRepositoryService;

  class mockModel {
    constructor (private readonly data: any) {}

    save = jest.fn().mockResolvedValue({
      ...this.data
    });

    static find = jest.fn();

    static findOne = jest.fn();

    static findOneAndUpdate = jest.fn();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryService,
        {
          provide: getModelToken('users'), //collection name
          useValue: mockModel,
        },
        {
          provide: getModelToken('roles'), //collection name
          useValue: mockModel,
        },
      ],
    }).compile();

    userRepositoryService = module.get<UserRepositoryService>(UserRepositoryService);
  });

  it('should be defined', () => {
    expect(userRepositoryService).toBeDefined();
  });

  it('should create new user', async () => {
    const user = {
      userName: '',
      email: '',
      password: '',
      isEmployee: '',
      address: ''
    };
    
    expect(await userRepositoryService.createUser(user)).toEqual({
      userName: '',
      email: '',
      password: '',
      isEmployee: '',
      address: ''
    });
  });

  it('should return user by id', async () => {
    const userId = '';
    jest.spyOn(mockModel, 'findOne').mockResolvedValue({});
    expect(await userRepositoryService.getUserById(userId)).toEqual({});
  });

  it('should return user by email', async () => {
    const emailId = '';
    jest.spyOn(mockModel, 'findOne').mockResolvedValue({});
    expect(await userRepositoryService.getUserByEmail(emailId)).toEqual({});
  });

  it('should return available employees', async () => {
    const emp = {
      empAvailabilityStatus: 'available',
      empCurrentLocation: 'Pune'
    };
    jest.spyOn(mockModel, 'find').mockResolvedValue({});
    expect(await userRepositoryService.getAvailableEmp(emp)).toEqual({});
  });

  it('should add employee details', async () => {
    const body = {
      userId: ''
    };
    const user: User = {
      userId: '',
      userName: '',
      email: '',
      password: '',
      isEmployee: true,
      role: '',
      address: '',
      isEmailVerified: false,
      verificationOTP: 0,
      empAvailabilityStatus: '',
      empCurrentLocation: ''
    };

    jest.spyOn(mockModel, 'findOne').mockResolvedValue(user);
    jest.spyOn(mockModel, 'findOneAndUpdate').mockResolvedValue({});
    expect(await userRepositoryService.addEmpDetails(body)).toEqual({});
  });

  it('should update employee status', async () => {
    const status = {
      userId: ''
    };
    
    const id = '';
    jest.spyOn(mockModel, 'findOneAndUpdate').mockResolvedValue({});
    expect(await userRepositoryService.updateEmpStatus(id, status)).toEqual({});
  });

  it('should update email verification status', async () => {
    const id = '';
    jest.spyOn(mockModel, 'findOneAndUpdate').mockResolvedValue({});
    expect(await userRepositoryService.updateEmailVerificationStatus(id)).toEqual({});
  });

  it('should add role', async () => {
    const role = {
      roleId: '',
      role: ''
    };
    expect(await userRepositoryService.addRole(role)).toEqual(role);
  });

  it('should get role by id', async () => {
    const id = '';
    jest.spyOn(mockModel, 'findOne').mockResolvedValue({});
    expect(await userRepositoryService.getRoleById(id)).toEqual({});
  });

  it('should get all roles', async () => {
    const id = '';
    jest.spyOn(mockModel, 'find').mockResolvedValue({});
    expect(await userRepositoryService.getRoles()).toEqual({});
  });

  it('should get all users', async () => {
    //jest.spyOn(mockModel.find(), 'select').mockResolvedValue({});
    jest.spyOn(mockModel, 'find').mockReturnValue({
      select: jest.fn().mockResolvedValue({})
    });
    expect(await userRepositoryService.getAllUsers()).toEqual({});
  });

});