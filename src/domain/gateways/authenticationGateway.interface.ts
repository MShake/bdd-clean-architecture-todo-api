import { AuthenticatedCustomer } from '../models/authenticatedCustomer';

export interface AuthenticationGateway {
  authenticate(token: string): Promise<AuthenticatedCustomer>;
  isValid(token: string): boolean;
  login(login: string, password: string): Promise<string>;
}
