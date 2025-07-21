import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/PermissionEntity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
     constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async findAll() {
    return await this.permissionRepository.find();
  }

  async create(name: string) {
    const permission = this.permissionRepository.create({
      name,
    });

    return await this.permissionRepository.save(permission);
  }

  async update(id: string, name: string) {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException('Permissions Not Found');
    }
    permission.name = name;

    return await this.permissionRepository.save(permission);
  }

  async remove(id: string) {
    await this.permissionRepository.delete(id);
    return { success: true };
  }
}
