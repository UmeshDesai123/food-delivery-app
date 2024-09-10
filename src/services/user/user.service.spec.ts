import { Test, TestingModule } from '@nestjs/testing';
import { UserRepositoryService } from '../../repository/user/user.repository.service';
import { UserService } from './user.service';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from 'src/controllers/user/dto/create-user.dto';
import { User } from 'src/entities/user/user.schema';
import { UpdateEmployeeDetailsDto } from 'src/controllers/user/dto/update-emp-details.dto';
import { AddRoleDto } from 'src/controllers/user/dto/add-role.dto';
import { Roles } from 'src/entities/user/role.schema';
import { UpdateEmpStatus } from 'src/controllers/user/dto/update-emp-status.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepositoryService: UserRepositoryService;
  let mailerService: MailerService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      	UserService,
        {
          provide: UserRepositoryService,
          useValue: {
            createUser: jest.fn(),
            getUserById: jest.fn(),
            getUserByEmail: jest.fn(),
            getAvailableEmp: jest.fn(),
            getAllUsers: jest.fn(),
            addEmpDetails: jest.fn(),
            updateEmpStatus: jest.fn(),
            updateEmailVerificationStatus: jest.fn(),
            addRole: jest.fn(),
            getRoleById: jest.fn(),
            getRoles: jest.fn(),
          }
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn()
          }
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepositoryService = module.get<UserRepositoryService>(UserRepositoryService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create user', async () => {
    const user: CreateUserDto = {
      userName: '',
      email: '',
      password: '',
      isEmployee: '',
      address: ''
    };

    jest.spyOn(userRepositoryService, 'getUserByEmail').mockResolvedValue(null);
    jest.spyOn(userService, 'sendVerificationEmail').mockResolvedValue({});
    jest.spyOn(userRepositoryService, 'createUser').mockResolvedValue({});
    expect(await userService.createUser(user)).toEqual({});
  });

  it('should get all users', async () => {
    const users: User[] = [{
      userId: '',
      userName: '',
      email: '',
      password: '',
      isEmployee: false,
      role: '',
      address: '',
      isEmailVerified: false,
      verificationOTP: 0,
      empAvailabilityStatus: '',
      empCurrentLocation: ''
    }];
    jest.spyOn(userRepositoryService, 'getAllUsers').mockResolvedValue(users);
    expect(await userService.getAllUsers()).toBe(users);
  });

  it('should update employee details', async () => {
    const details: UpdateEmployeeDetailsDto = {
      userId: '',
      role: ''
    };
    const role: any = {
      role: ''
    };
    jest.spyOn(userRepositoryService, 'getRoleById').mockResolvedValue(role);
    jest.spyOn(userRepositoryService, 'addEmpDetails').mockResolvedValue({});
    expect(await userService.addEmpDetails(details)).toEqual({});
  });

  it('should add roles', async () => {
    const roleDto: AddRoleDto = {
      role: ''
    };
    const role: any = {
      roleId: '',
      role: ''
    };
    jest.spyOn(userRepositoryService, 'addRole').mockResolvedValue(role);
    expect(await userService.addRole(roleDto)).toEqual(role);
  });

  it('should get roles', async () => {
    const role: any = [{
      roleId: '',
      role: ''
    }];
    jest.spyOn(userRepositoryService, 'getRoles').mockResolvedValue(role);
    expect(await userService.getRoles()).toEqual(role);
  });

  it('should update employee status', async () => {
    const status: UpdateEmpStatus = {
      empAvailabilityStatus: '',
      empCurrentLocation: ''
    };
    const userId = '';
    const res: any = {
      userId: '',
      userName: '',
      email: '',
      isEmployee: '',
      role: '',
      address: '',
      isEmailVerified: '',
      empAvailabilityStatus: '',
      empCurrentLocation: '',
    };
    jest.spyOn(userRepositoryService, 'updateEmpStatus').mockResolvedValue(res);
    expect(await userService.updateEmpStatus(userId, status)).toEqual({
      userId: '',
      userName: '',
      email: '',
      isEmployee: '',
      role: '',
      address: '',
      isEmailVerified: '',
      empAvailabilityStatus: '',
      empCurrentLocation: '',
    });
  });

  it('should send email', async () => {
    const user = {
      email: ''
    };
    jest.spyOn(mailerService, 'sendMail').mockResolvedValue({});
    await userService.sendVerificationEmail(user);
    expect(mailerService.sendMail).toHaveBeenCalled();
  });
});