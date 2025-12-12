import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

import { Transform } from 'class-transformer';
export class LoginUserDto {
  @IsEmail()
  @MaxLength(100)
  useremail: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(6, 60)
  userpassword: string;
}
