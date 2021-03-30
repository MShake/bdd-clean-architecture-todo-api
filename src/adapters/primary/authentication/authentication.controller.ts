import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { AuthenticateCustomerUseCase as AuthenticateCustomer } from '../../../domain/usecases';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticateCustomer: AuthenticateCustomer) {}

  @Post()
  async login(
    @Body() authRequest: { login: string; password: string },
  ): Promise<string> {
    return this.authenticateCustomer
      .login(authRequest.login, authRequest.password)
      .catch((e) => {
        throw new NotFoundException(e.message);
      });
  }
}
