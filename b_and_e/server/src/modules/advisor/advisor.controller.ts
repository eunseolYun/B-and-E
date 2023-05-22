import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AdvisorService } from './advisor.service';
import { AdvisorCredentialDto } from '../dto/credential.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class AdvisorController {
  constructor(private advisorService: AdvisorService) {}

  //일반회원가입
  @Post('/signUp')
  signUp(
    @Body(ValidationPipe) signUpDto: AdvisorCredentialDto,
  ): Promise<{ message: string; statusCode: number }> {
    return this.advisorService.signUp(signUpDto);
  }

  //중복검사(emailcheck)
  @Post('/login')
  logIn(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<{ message: string; data: object; statusCode: number }> {
    return this.advisorService.logIn(loginDto);
  }

  @Get('/userinfo')
  @UseGuards(AuthGuard())
  getUserInfo(@Req() req) {
    return this.advisorService.userInfo(req.user);
  }
}
