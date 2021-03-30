import { AuthenticationGateway } from '../../../domain/gateways/authenticationGateway.interface';
import { AuthenticatedCustomer } from '../../../domain/models/authenticatedCustomer';
import { UserRepository } from '../../../domain/repositories/userRepository.interface';

export class InMemoryAuthenticationGateway implements AuthenticationGateway {
  private currentCustomer: AuthenticatedCustomer;

  constructor(private userRepository: UserRepository) {}

  // token must have the following pattern: <id>.<login> -> 123.mike
  authenticate = (token: string): Promise<AuthenticatedCustomer> => {
    if (!token || !this.isValid(token))
      throw new Error('Access Denied: Invalid Token');

    const splitToken = token.toString().split(' ')[1].split('.');
    return new Promise((resolve, reject) =>
      this.isValid(token)
        ? resolve({
            id: splitToken[0],
            login: splitToken[1],
          })
        : reject(),
    );
  };

  isValid = (token: string): boolean =>
    token.toString().split('.').length === 2 ? true : false;

  getCurrentCustomer = (): Promise<AuthenticatedCustomer> =>
    new Promise((resolve, reject) =>
      this.currentCustomer ? resolve(this.currentCustomer) : reject(),
    );

  login = (login: string, password: string): Promise<string> => {
    return this.userRepository
      .retrieveUser(login, password)
      .then((user) => `${user.id}.${user.login}`)
      .catch(() => {
        throw Error('User Not Found');
      });
  };
}
