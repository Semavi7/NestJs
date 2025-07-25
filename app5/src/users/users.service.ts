import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async create(createUserDto: CreateUserDto) {
        const isExist = await this.userModel.findOne({
            username: createUserDto.username
        })
        if (isExist) {
            throw new ConflictException('Username exist')
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
        const newUser = new this.userModel({
            username: createUserDto.username,
            password: hashedPassword
        })
        return newUser.save()
    }

    async findOne(username: string) {
        const user = await this.userModel.findOne({ username }).exec()
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        return user
    }

    async findById(id:string){
        const user = await this.userModel.findById(id).exec()
        if(!user){
            throw new NotFoundException('User Not Found')
        }
        return user
    }

    async findAll(){
        return this.userModel.find().select('-password').exec()
    }
}
