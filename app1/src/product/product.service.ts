import { Injectable } from '@nestjs/common';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
    private productData:Array<ProductModel>=[]

    createProduct(product:ProductModel){
        const newproduct:ProductModel={
            description:product.description,
            isActive:product.isActive,
            name:product.name,
            price:product.price,
            id:Math.random().toString(36)
        }
        this.productData.push(newproduct)
        return newproduct
    }

    deleteProduct(productId:string){
        this.productData = this.productData.filter((p:ProductModel) => p.id !== productId)
        return true
    }

    getProducts(){
        return this.productData
    }

    getProductById(productId:string){
        return this.productData.find((p:ProductModel)=>p.id === productId)
    }

    updateProductByStatus(productId:string, status:boolean){
        const idx = this.productData.findIndex((p:ProductModel) => p.id === productId)
        if(idx<0){
            throw new Error("Ürün Bulunamadı")
        }
        this.productData[idx].isActive = status
        return this.productData
    }
}
