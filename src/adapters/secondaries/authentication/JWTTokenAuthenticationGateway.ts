import { AuthenticationGateway } from 'src/domain/gateways/authenticationGateway.interface';
import { AuthenticatedCustomer } from '../../../domain/models';

export class JWTTokenAuthenticationGateway implements AuthenticationGateway {
  isValid = (token: string): boolean => {
    throw new Error('Method not implemented.');
  };
  login = (login: string, password: string): Promise<string> => {
    throw new Error('Method not implemented.');
  };
  authenticate = (token: string): Promise<AuthenticatedCustomer> => {
    throw new Error('Method not implemented.');
  };
  getCurrentCustomer = (): Promise<any> => {
    throw new Error('Method not implemented.');
  };
}
