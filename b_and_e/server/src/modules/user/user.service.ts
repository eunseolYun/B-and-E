import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCredentialDto } from '../dto/credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private token: JwtService,
  ) {}

  // 중복이메일검사
  async signUp(
    signUpDto: UserCredentialDto,
  ): Promise<{ message: string; statusCode: number }> {
    return this.userRepository.createUser(signUpDto);
  }

  async logIn(
    loginDto: LoginDto,
  ): Promise<{ message: string; data: object; statusCode: number }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const {
        id,
        email,
        name,
        sex,
        birth,
        phone,
        loginMethod,
        created_at,
        updated_at,
      } = user; //payload
      console.log(user);

      const accessToken = await this.token.sign({
        id,
        email,
        name,
        sex,
        birth,
        phone,
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
