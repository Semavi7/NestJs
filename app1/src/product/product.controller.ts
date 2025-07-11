import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductModel } from './product.model';

@Controller('product')
export class ProductController {
    constructor(private productService:ProductService){}

    @Get()
    getProduct(){
        return this.productService.getProducts()
    }

    @Post()
    createProduct(@Body() payload:ProductModel){
        return this.productService.createProduct(payload)
    }

    @Delete(':id')
    deleteProduct(@Param('id') productId:string){
        return this.productService.deleteProduct(productId)
    }

    @Put(':id')
    updateProductByStatus(@Param('id') productId:string, @Body() payload:{status:boolean}){
        return this.productService.updateProductByStatus(productId,payload.status)
    }

    @Get(':id')
    getProductById(@Param('id')productId:string){
        return this.productService.getProductById(productId)
    }
}
