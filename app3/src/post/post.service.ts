import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(User) private userRepostory: Repository<User>
    ){}

    async create(createPostDto: CreatePostDto) {
        const user = await this.userRepostory.findOneBy({
            id: createPostDto.userId
        })
        if(!user){
            throw new NotFoundException("User Not Found")
        }
        const post = this.postRepository.create({
            title: createPostDto.title,
            content: createPostDto.content,
            user
        })
        return this.postRepository.save(post)
    }

    async findAll(page:number=1, limit:number=30){
        const [posts] = await this.postRepository.find({
            skip:(page-1)*limit,
            take:limit,
            relations:['comments']
        })
        return posts
    }

    async softDelete(id:string){
        await this.postRepository.softDelete(id)
    }

    async search(term:string,page:number=1,limit:number=10){
    const query=this.postRepository.createQueryBuilder('post')
    .where(`post.title LIKE :term OR post.content LIKE :term`,{term:`%${term}%`})
    .skip((page-1)*limit)
    .take(limit)
    return query.getMany()
  }
}
