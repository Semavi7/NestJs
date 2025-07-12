import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './create.user.dto';

@Injectable()
export class UserService {
    private users:User[]=[]
    private idCounter=1

    create(createUserDto:CreateUserDto):User{
        const newUser:User={
            id:this.idCounter,
            ...createUserDto
        }
        this.idCounter++
        this.users.push(newUser)
        return newUser
    }

    findAll():User[]{
        return this.users
    }

    findOne(id:number):User | undefined{
        return this.users.find((item)=>item.id===id)
    }

    remove(id:number):void{
        this.users=this.users.filter((item)=>item.id!==id)
    }
}
