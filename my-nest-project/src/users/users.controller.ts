import { Controller, Get, HttpException, HttpStatus, Param, Query, Req, Res, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { CustomExceptionFilter } from 'src/erorrmanager/CustomExceptionFilter';

@Controller('users')
@UseFilters(CustomExceptionFilter)
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    test(@Query() query: Record<string, string>){
        throw new HttpException('Özel bir hata', HttpStatus.NOT_FOUND)
        this.userService.testConfig()
        console.log(query)
    }

    @Get(':id')
    getById(@Param('id') id:string) {
        
        console.log(id + "geldi")
    }

    @Get('deneme')
    getusers(@Req() req: Request, @Res() res: Response) {
        console.log(req)
        console.log(res)
        return res.status(200).json({message: 'deneme'})
        
    }
}
