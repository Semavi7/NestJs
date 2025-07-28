import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo:Repository<User>
    ){}

    create(data:{username:string}){
        const user = this.userRepo.create({
            username:data.username
        })
        return this.userRepo.save(user)
    }

    findById(id:string){
        return this.userRepo.findOne({where:{id}})
    }
}
