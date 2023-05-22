import { Repository } from 'typeorm';
import { CustomRepository } from '../typeorm-ex.decorator';
import { User } from './user.entity';
import { UserCredentialDto } from '../dto/credential.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    signUpDto: UserCredentialDto,
  ): Promise<{ message: string; statusCode: number }> {
    const { email, password, name, sex, birth, phone, loginMethod } = signUpDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({
      email,
      password: hashedPassword,
      name,
      sex,
      birth,
      phone,
      loginMethod,
    });

    try {
      await this.save(user);
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
