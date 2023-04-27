import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCredentialDto } from './dto/user-credential.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //일반회원가입
  @Post('/signUp')
  signUp(
    @Body(ValidationPipe) signUpDto: UserCredentialDto,
  ): Promise<{ message: string; statusCode: number }> {
    return this.userService.signUp(signUpDto);
  }

  //중복검사(emailcheck)
  @Post('/login')
  logIn(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<{ message: string; data: object; statusCode: number }> {
    return this.userService.logIn(loginDto);
  }
}
