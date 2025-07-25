import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class RegisterDto{
    @IsNotEmpty()
    @IsString()
    username:string

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password:string
}