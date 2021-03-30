import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTTokenAuthenticationGateway } from '../../secondaries/authentication/JWTTokenAuthenticationGateway';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationGateway: JWTTokenAuthenticationGateway) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      const customerToken = request.headers.authorization.split(' ')[1];
      this.authenticationGateway.authenticate(customerToken);
      return true;
    }
    return false;
  }

  getToken = (headers: Headers): string => headers.toString();
}
