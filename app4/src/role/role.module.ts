import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/entities/PermissionEntity';
import { Role } from 'src/entities/RoleEntity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission,Role])],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService]
})
export class RoleModule {}
