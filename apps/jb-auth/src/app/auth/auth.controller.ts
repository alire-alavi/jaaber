import { Controller, UseGuards } from '@nestjs/common';
import {
  AuthenticateRequest,
  AuthServiceController,
  User,
  AuthServiceControllerMethods,
} from '@jaaber/grpc';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './token-payload.interface';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly userSerivce: UsersService) {}
  @UseGuards(JwtAuthGuard)
  authenticate(
    request: AuthenticateRequest & { user: TokenPayload }
  ): Promise<User> | Observable<User> | User {
    return this.userSerivce.getUser({ id: request.user.userID });
  }
}
