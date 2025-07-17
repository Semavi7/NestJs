import { Post } from "src/post/post.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    comment: string

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post
}