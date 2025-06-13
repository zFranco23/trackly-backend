import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}
