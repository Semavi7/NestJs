import { IsEmail, IsInt, IsNotEmpty, Min } from 'class-validator'

export class CreateUserDto{
    @IsNotEmpty({message:"Name alanı zorunludur"})
    name:string

    @IsEmail({},{message:"Lütfen Geçerli Bir EMail Giriniz"})
    email:string

    @IsInt({message:"Yaş tanımlı olmalı"})
    @Min(0,{message:"Yaş 0 dan büyük olmalı"})
    age:number
}