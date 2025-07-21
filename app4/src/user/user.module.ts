import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/UserEntity';
import { RoleModule } from 'src/role/role.module';
import { UserRole } from 'src/entities/UserRoleEntity';

@Module({
  imports:[TypeOrmModule.forFeature([User,UserRole]),RoleModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
