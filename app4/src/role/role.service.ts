import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/PermissionEntity';
import { Role } from 'src/entities/RoleEntity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async findAll() {
    return await this.roleRepository.find();
  }

  async create(name: string) {
    const role = this.roleRepository.create({
      name,
    });
    return await this.roleRepository.save(role);
  }

  async update(id: string, name: string) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('Role Not Found');
    }
    role.name = name;

    return await this.roleRepository.save(role);
  }

  async find(id: string) {
    return this.roleRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    await this.roleRepository.delete(id);
    return { success: true };
  }
  async assignPermissions(roleId: string, permissionIds: string[]) {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    const permissions = await this.permissionsRepository.findBy({
      id: In(permissionIds),
    });
    role.permissions = [...role.permissions, ...permissions];
    return this.roleRepository.save(role);
  }
}
