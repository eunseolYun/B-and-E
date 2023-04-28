import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCredentialDto } from './dto/user-credential.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //일반회원가입
  @Post('/signin')
  signUp(
    @Body(ValidationPipe) signInDto: UserCredentialDto,
  ): Promise<{ message: string; statusCode: number }> {
    return this.userService.signUp(signInDto);
  }

  //중복검사(emailcheck)
  @Post('/login')
  logIn(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<{ message: string; data: object; statusCode: number }> {
    return this.userService.logIn(loginDto);
  }

  @Get('/userinfo')
  @UseGuards(AuthGuard())
  getUserInfo(@Req() req) {
    return this.userService.userInfo(req.user);
  }
}
