import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @MaxLength(100)
  useremail: string;

  @IsString()
  @Length(6, 60)
  userpassword: string;
}
