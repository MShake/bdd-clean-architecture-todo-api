import { AuthenticationGateway } from '../../gateways/authenticationGateway.interface';

export class AuthenticateCustomerUseCase {
  private authenticationGateway: AuthenticationGateway;

  constructor(authenticationGateway: AuthenticationGateway) {
    this.authenticationGateway = authenticationGateway;
  }

  login = async (login: string, password: string): Promise<string> =>
    await this.authenticationGateway.login(login, password);
}
