import { Test, TestingModule } from '@nestjs/testing';
import { StubbedInstance, stubInterface } from 'ts-sinon';
import { Logger } from '@nestjs/common';

import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';
import { UserController } from '../user.controller';
import { mockSignupRequest, mockUser } from './mocks';

describe('UserController', () => {
  let userController: UserController;
  let loggerSpy: jest.SpyInstance;

  const mockUserService: StubbedInstance<UserService> =
    stubInterface<UserService>();
  const mockUserRepository: StubbedInstance<UserRepository> =
    stubInterface<UserRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    loggerSpy = jest.spyOn(Logger.prototype, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('should get user by id', async () => {
      const userId = 'test-id';
      mockUserRepository.find.resolves(mockUser);

      const result = await userController.getUser({ id: userId });

      expect(result).toEqual(mockUser);
      // expect(loggerSpy).toHaveBeenCalledWith(`Retrieving user ${userId}`);
      // expect(mockUserRepository.find).toHaveBeenCalledWith({
      //   id: userId,
      //   address: undefined,
      // });
    });

    it('should get user by address', async () => {
      const userAddress = 'test-address';
      mockUserRepository.find.resolves(mockUser);

      const result = await userController.getUser({ address: userAddress });

      expect(result).toEqual(mockUser);
      //expect(loggerSpy).toHaveBeenCalledWith(`Retrieving user ${userAddress}`);
      // expect(mockUserRepository.find).toHaveBeenCalledWith({
      //   id: undefined,
      //   address: userAddress,
      // });
    });

    it('should throw error when repository find fails', async () => {
      const error = new Error('Database error');
      mockUserRepository.find.rejects(error);

      await expect(userController.getUser({ id: 'test-id' })).rejects.toThrow(
        error,
      );
    });
  });

  describe('signup', () => {
    it('should successfully signup user', async () => {
      mockUserService.signup.resolves(mockUser);

      const result = await userController.signup(mockSignupRequest);

      expect(result).toEqual(mockUser);
      // expect(mockUserService.signup).toHaveBeenCalledWith(mockSignupRequest);
    });

    it('should throw error when service signup fails', async () => {
      const error = new Error('Service error');
      mockUserService.signup.rejects(error);

      await expect(userController.signup(mockSignupRequest)).rejects.toThrow(
        error,
      );
    });
  });
});
