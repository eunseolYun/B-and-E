import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdvisorRepository } from './advisor.repository';
import { AdvisorCredentialDto } from '../dto/credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AdvisorService {
  constructor(
    private advisorRepository: AdvisorRepository,
    private token: JwtService,
  ) {}

  // 중복이메일검사
  async signUp(
    signUpDto: AdvisorCredentialDto,
  ): Promise<{ message: string; statusCode: number }> {
    return this.advisorRepository.createAdvisor(signUpDto);
  }

  async logIn(
    loginDto: LoginDto,
  ): Promise<{ message: string; data: object; statusCode: number }> {
    const { email, password } = loginDto;

    const advisor = await this.advisorRepository.findOne({ where: { email } });

    if (advisor && (await bcrypt.compare(password, advisor.password))) {
      const {
        id,
        email,
        name,
        sex,
        center,
        info,
        loginMethod,
        created_at,
        updated_at,
      } = advisor; //payload
      console.log(advisor);

      const accessToken = await this.token.sign({
        id,
        email,
        name,
        sex,
        center,
        info,
        loginMethod,
        created_at,
        updated_at,
      });

      return {
        message: 'login success',
        data: {
          accessToken: accessToken,
          loginMethod: loginMethod,
        },
        statusCode: 200,
      };
    } else {
      throw new UnauthorizedException('invalid user information');
    }
  }
  async userInfo(req) {
    return {
      message: 'success to get userinfo',
      userInfo: req,
    };
  }
}
