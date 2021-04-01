import { AuthenticationGateway } from '../../gateways';

export class AuthenticateCustomerUseCase {
  private authenticationGateway: AuthenticationGateway;

  constructor(authenticationGateway: AuthenticationGateway) {
    this.authenticationGateway = authenticationGateway;
  }

  handle = async (login: string, password: string): Promise<string> =>
    await this.authenticationGateway.login(login, password);
}
