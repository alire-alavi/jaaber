import { Controller } from '@nestjs/common';
import {
  AuthenticateRequest,
  AuthServiceController,
  User,
  AuthServiceControllerMethods,
} from '@jaaber/grpc';
import { Observable } from 'rxjs';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  authenticate(
    request: AuthenticateRequest
  ): Promise<User> | Observable<User> | User {
    console.log(request);
    return {} as any;
  }
}
