import { InMemoryUserRepository } from '../../../adapters/secondaries/users/InMemoryUserRepository';
import { InMemoryAuthenticationGateway } from './../../../adapters/secondaries/authentication/InMemoryAuthenticationGateway';
import { AuthenticationGateway } from './../../../domain/gateways/authenticationGateway.interface';
import { AuthenticateCustomerUseCase } from './authenticateCustomerUseCase';

const userRepository: InMemoryUserRepository = new InMemoryUserRepository();
const authenticationGateway: AuthenticationGateway = new InMemoryAuthenticationGateway(
  userRepository,
);
const usecase: AuthenticateCustomerUseCase = new AuthenticateCustomerUseCase(
  authenticationGateway,
);

describe('Authenticate Customer Usecase', () => {
  beforeEach(() => {
    userRepository.dropAllUsers();
  });

  it('should return a token if the customer is a valid customer', async () => {
    const user = { id: 'fakeId', login: 'fakeUser', password: 'fakePassword' };
    userRepository.addUsers(user);

    const token = await usecase.login(user.login, user.password);
    expect(token).toBeDefined();
  });

  it('should return a token if the customer is a valid customer', async () => {
    const user = { id: 'fakeId', login: 'fakeUser', password: 'fakePassword' };
    await expect(usecase.login(user.login, user.password)).rejects.toThrowError(
      'User Not Found',
    );
  });
});
