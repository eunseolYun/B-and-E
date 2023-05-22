import { Module } from '@nestjs/common';
import { AdvisorController } from './advisor.controller';
import { AdvisorService } from './advisor.service';
import { AdvisorRepository } from './advisor.repository';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt.strategy';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([AdvisorRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET, // 토큰을 생성하기 위해
      signOptions: {
        expiresIn: 600 * 600,
      },
    }),
  ],
  controllers: [AdvisorController],
  providers: [AdvisorService, JwtStrategy, PassportModule],
  exports: [JwtStrategy, PassportModule],
})
export class AdvisorModule {}
