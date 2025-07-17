import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './cretae-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    create(createUserDto: CreateUserDto){
        const user = this.userRepository.create(createUserDto)
        return this.userRepository.save(user)
    }

    findAll(){
        return this.userRepository.find({relations: ['posts']})
    }
}
