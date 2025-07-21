import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/UserEntity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { RoleService } from 'src/role/role.service';
import { UserRole } from 'src/entities/UserRoleEntity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private roleService: RoleService,
        @InjectRepository(UserRole) private userRoleRepo: Repository<UserRole>) { }

    async findOne(id: string) {
        return await this.userRepository.findOne({ where: { id } })
    }

    async findAll() {
        return await this.userRepository.find()
    }

    async create(username: string, password: string) {
        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(password, salt)
        const user = this.userRepository.create({
            password: hashed,
            username
        })
        return await this.userRepository.save(user)
    }

    async update(id: string, password: string) {
        const user = await this.userRepository.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        user.password = password
        return await this.userRepository.save(user)
    }

    async remove(id: string) {
        await this.userRepository.delete(id)
        return { success: true }
    }

    async assingRole(userId:string, roleId:string){
        const user = await this.userRepository.findOne({ where: { id: userId}})
        const role = await this.roleService.find(roleId)
        if(!role || !user){
            throw new BadRequestException('Role or user not found')
        }
        const userRole = this.userRoleRepo.create({
            user: user,
            role: role
        })
        return await this.userRoleRepo.save(userRole)
    }

    async findOneByUserName(username: string, relations?:Array<string>) {
        const user = await this.userRepository.findOne({
            where: {
                username
            },
            relations: relations || []
        })
        return user
    }
}
