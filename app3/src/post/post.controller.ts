import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './create-post.dto';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() createPostDto: CreatePostDto) {
        return this.postService.create(createPostDto)
    }

    @Get()
    findAll(@Query('page', ParseIntPipe) page: number, @Query('limit', ParseIntPipe) limit: number) {
        return this.postService.findAll(page, limit)
    }

    @Delete(':id')
    async softDelete(@Param('id') id: string) {
        await this.postService.softDelete(id)
        return { success: true }
    }

    @Get('search')
    search(@Query('term') term: string,
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
    ) {
        return this.postService.search(term, page, limit)
    }

}
