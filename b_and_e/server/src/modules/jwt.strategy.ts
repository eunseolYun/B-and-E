import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user/user.repository';
import { User } from './user/user.entity';
// import { AdvisorRepository } from './advisor/advisor.repository';
// import { Advisor } from './advisor/advisor.entity';

@Injectable()
//jwtStrategy를 다른 곳 어디에서도 사용할 수있게 하기 위해
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { email } = payload;
    const user: User = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const { id, name, sex, birth, phone, loginMethod, created_at, updated_at } =
      user;
    return {
      id,
      email,
      name,
      sex,
      birth,
      phone,
      loginMethod,
      created_at,
      updated_at,
    };

    // return user;
  }
}
