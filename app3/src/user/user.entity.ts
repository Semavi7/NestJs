import { Post } from "src/post/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    username: string

    @Column()
    email: string

    @OneToMany(() => Post,(post)=>post.user)
    posts:Post[]
}