import { Body, Controller, NotFoundException, Get } from '@nestjs/common';
import { AuthenticateCustomerUseCase } from '../../../domain/usecases/authentication/authenticateCustomerUseCase';

@Controller('auth')
export class AuthenticationController {
  constructor(private usecase: AuthenticateCustomerUseCase) {}

  @Get()
  async login(
    @Body() authRequest: { login: string; password: string },
  ): Promise<string> {
    return this.usecase
      .handle(authRequest.login, authRequest.password)
      .catch((e) => {
        throw new NotFoundException(e.message);
      });
  }
}
