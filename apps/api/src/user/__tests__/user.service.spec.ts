import { Test, TestingModule } from '@nestjs/testing';
import { StubbedInstance, stubInterface } from 'ts-sinon';
import { Logger } from '@nestjs/common';

import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';
import { mockSignupRequest, mockUser } from './mocks';

describe('UserService', () => {
  let userService: UserService;
  let loggerSpy: jest.SpyInstance;

  const mockUserRepository: StubbedInstance<UserRepository> =
    stubInterface<UserRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        UserService,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    loggerSpy = jest.spyOn(Logger.prototype, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should successfully signup user', async () => {
      mockUserRepository.create.resolves(mockUser);

      const authResponse = await userService.signup(mockSignupRequest);

      expect(authResponse).toEqual(mockUser);
      // expect(loggerSpy).toHaveBeenCalledWith(
      //   `Registering new user with address: ${mockSignupRequest.address}`,
      // );
      // expect(mockUserRepository.create).toHaveBeenCalledWith({
      //   address: mockSignupRequest.address,
      //   userName: mockSignupRequest.userName,
      //   email: mockSignupRequest.email,
      //   profile: {
      //     create: {
      //       firstName: mockSignupRequest.firstName,
      //       lastName: mockSignupRequest.lastName,
      //     },
      //   },
      // });
    });

    it('should throw error when repository create fails', async () => {
      const error = new Error('Database error');
      mockUserRepository.create.rejects(error);

      await expect(userService.signup(mockSignupRequest)).rejects.toThrow(
        error,
      );
      // expect(loggerSpy).toHaveBeenCalledWith(
      //   `Registering new user with address: ${mockSignupRequest.address}`,
      // );
    });

    it('should handle missing optional fields', async () => {
      const minimalRequest = {
        address: mockSignupRequest.address,
        userName: mockSignupRequest.userName,
        email: mockSignupRequest.email,
      };
      mockUserRepository.create.resolves(mockUser);

      const authResponse = await userService.signup(minimalRequest as any);

      expect(authResponse).toEqual(mockUser);
      // expect(mockUserRepository.create).toHaveBeenCalledWith({
      //   address: minimalRequest.address,
      //   userName: minimalRequest.userName,
      //   email: minimalRequest.email,
      //   profile: {
      //     create: {
      //       firstName: undefined,
      //       lastName: undefined,
      //     },
      //   },
      // });
    });
  });
});
