import { AuthenticatedCustomer } from '../models';

export interface AuthenticationGateway {
  authenticate(token: string): Promise<AuthenticatedCustomer>;
  isValid(token: string): boolean;
  login(login: string, password: string): Promise<string>;
}
