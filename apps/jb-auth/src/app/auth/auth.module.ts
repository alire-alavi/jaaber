import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JWTStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn:
            parseInt(configService.getOrThrow('JWT_EXPIRATION_MS')) / 1000,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService, JWTStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
