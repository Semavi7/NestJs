import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 64184,
      username: 'root',
      password: 'Burchan1151',
      database: 'nestjs_db',
      synchronize: true,
      connectTimeout: 10000,
      logger: 'simple-console',
      poolSize: 20,
      charset: 'utf8mb4',
      supportBigNumbers: true,
      entities: [__dirname + '/**/*.entity*{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*.ts'],
      logging: true,
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
