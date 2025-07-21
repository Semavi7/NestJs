import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
     constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Post()
  create(@Body() body: { name: string }) {
    return this.permissionService.create(body.name);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name: string }) {
    return this.permissionService.update(id, body.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(id);
  }
}
