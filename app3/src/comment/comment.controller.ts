import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './create-comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.create(createCommentDto)
    }

    @Get()
    get() {
        return this.commentService.findAll()
    }

    @Get('/post/:postId')
    getByPostId(@Param('postId') psotId: string,
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number

    ) {
        return this.commentService.findByPostId(psotId, page, limit)
    }

}
