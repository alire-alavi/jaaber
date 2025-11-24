import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { TokenPayload } from '../token-payload.interface';
import { AuthenticateRequest } from '@jaaber/grpc';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request | AuthenticateRequest) => {
          if ('cookies' in request && (request as Request).cookies?.Authentication) {
            return (request as Request).cookies!.Authentication;
          }
          if ('token' in request) {
            return (request as AuthenticateRequest).token;
          }
          return undefined;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  validate(payload: TokenPayload) {
    return payload;
  }
}
