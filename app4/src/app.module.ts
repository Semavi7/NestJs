import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: 'localhost',
      port: 59215,
      username: 'root',
      password: 'Burchan1151',
      database: 'nestjs_db',
      synchronize: true,
      connectTimeout: 10000,
      logger: 'simple-console',
      poolSize: 20,
      charset: 'utf8mb4',
      supportBigNumbers: true,
      entities: [__dirname + '/**/*Entity{.ts,.js}'],
      logging: true
    }), UserModule, PermissionModule, RoleModule, AuthModule, CommonModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
