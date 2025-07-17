import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/post/post.entity';
import { CreateCommentDto } from './create-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
        @InjectRepository(Post) private postRepository: Repository<Post>
    ){}

    async create(createCommentDto: CreateCommentDto) {
        const post = await this.postRepository.findOneBy({id: createCommentDto.postId})
        if(!post){
            throw new NotFoundException('Post bulunamadı')
        }
        const comment = this.commentRepository.create({
            comment: createCommentDto.comment,
            post
        })
        return this.commentRepository.save(comment)
    }

    findAll(){
        return this.commentRepository.find({relations:['post']})
    }

    async findByPostId(postId:string,page:number=1,limit:number=10){
    return this.commentRepository.find({
        where:{post:{id:postId}},
        skip:(page-1)*limit,
        take:limit,
        relations:['post']
    })
  }
}
