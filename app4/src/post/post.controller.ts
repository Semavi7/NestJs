import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { PermissionsGuard } from 'src/common/permission.guard';
import { RoleGuard } from 'src/common/role.guard';
import { Roles } from 'src/common/roles.decorator';
import { Permissions } from 'src/common/permission.decorator';

@Controller('post')
export class PostController {
    @Get()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'manager', 'editor')
    getAllPosts() {
        return ['p1', 'p2']
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('read:detail')
    @Get('detail')
    getDetail() {
        return 'Detay';
    }

    @Get('public')
    getPuclics() {
        return ['pp1']
    }
}
