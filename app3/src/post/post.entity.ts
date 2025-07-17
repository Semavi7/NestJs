import { User } from "src/user/user.entity";
import { Comment } from "src/comment/comment.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    content: string

    @ManyToOne(() => User, (user) => user.posts, {eager:true})
    user: User

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]

    @DeleteDateColumn({nullable:true})
    deleteAt:Date
}