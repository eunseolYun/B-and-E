import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
