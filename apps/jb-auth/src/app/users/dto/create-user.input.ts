import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, isEmail, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;
}
