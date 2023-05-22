import { Repository } from 'typeorm';
import { CustomRepository } from '../typeorm-ex.decorator';
import { Advisor } from './advisor.entity';
import { AdvisorCredentialDto } from '../dto/credential.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@CustomRepository(Advisor)
export class AdvisorRepository extends Repository<Advisor> {
  async createAdvisor(
    signUpDto: AdvisorCredentialDto,
  ): Promise<{ message: string; statusCode: number }> {
    const { email, password, name, sex, center, info, loginMethod } = signUpDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const advisor = this.create({
      email,
      password: hashedPassword,
      name,
      sex,
      center,
      info,
      loginMethod,
    });

    try {
      await this.save(advisor);
      return { message: `${email} signup success`, statusCode: 201 };
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
