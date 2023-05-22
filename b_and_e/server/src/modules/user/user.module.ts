import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt.strategy';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET, // 토큰을 생성하기 위해
      signOptions: {
        expiresIn: 600 * 600,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, PassportModule],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
