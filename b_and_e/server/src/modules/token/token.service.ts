import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class TokenService extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // 토큰 검증
  async validate(payload) {
    const { email } = payload;
    try {
      const user: User = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new UnauthorizedException('유저 없음');
      }
      // console.log(user, '일반 로그인 유저');
      return user;
    } catch (error) {
      if (error.response.status === 401) {
        return { message: '토큰 만료', data: error.response.status };
      }
      console.log(error.response.status);
    }
  }

  async userInfo(
    req,
  ): Promise<{ message: string; data: object; statusCode: number }> {
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
    } = await req.user;
    return {
      message: 'login success',
      data: {
        userInfo: {
          id,
          email,
          name,
          sex,
          birth,
          phone,
          loginMethod,
          created_at,
          updated_at,
        },
      },
      statusCode: 200,
    };
  }
}
