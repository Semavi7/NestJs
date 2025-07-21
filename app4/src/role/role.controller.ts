import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Post()
  create(@Body() body: { name: string }) {
    return this.roleService.create(body.name);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name: string }) {
    return this.roleService.update(id, body.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }

  @Post(':id/assign-permissions')
  async assignPermissionsToRole(
    @Param('id') id: string,
    @Body() data: { permissionIds: string[] },
  ) {
    return this.roleService.assignPermissions(id, data.permissionIds);
  }
}
