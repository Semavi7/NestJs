import { IsNotEmpty } from "class-validator";

export class CreatePostDto{
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    userId: string
}