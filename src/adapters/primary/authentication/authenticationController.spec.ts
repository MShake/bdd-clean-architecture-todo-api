import { NotFoundException } from '@nestjs/common';
import { AuthenticateCustomerUseCase } from '../../../domain/usecases/authentication/authenticateCustomerUseCase';
import { InMemoryAuthenticationGateway } from '../../secondaries/authentication/inMemoryAuthenticationGateway';
import { InMemoryUserRepository } from '../../secondaries/users/InMemoryUserRepository';
import { AuthenticationController } from './authentication.controller';

const userRepository = new InMemoryUserRepository();
const authenticationGateway = new InMemoryAuthenticationGateway(userRepository);
const authenticateCustomerUseCase: AuthenticateCustomerUseCase = new AuthenticateCustomerUseCase(
  authenticationGateway,
);
const authenticationController: AuthenticationController = new AuthenticationController(
  authenticateCustomerUseCase,
);

const authRequest = {
  login: 'user',
  password: 'XxVeRySecurEPassWorDxX',
};

describe('Authentication Controller', () => {
  beforeEach(() => {
    userRepository.dropAllUsers();
  });

  describe('login() method', () => {
    it('should call the authenticateCustomer usecase', async () => {
      userRepository.addUsers({
        id: '1',
        login: 'user',
        password: 'XxVeRySecurEPassWorDxX',
      });
      const handle = jest.spyOn(authenticateCustomerUseCase, 'handle');
      await authenticationController.login(authRequest),
        expect(handle).toHaveBeenCalled();
    });
  });

  it("should throw NotFoundException when we can't find user in database", async () => {
    await expect(
      authenticationController.login(authRequest),
    ).rejects.toThrowError(NotFoundException);
  });
});
