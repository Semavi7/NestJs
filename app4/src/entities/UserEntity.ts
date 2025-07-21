import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./UserRoleEntity";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({unique:true})
    username:string

    @Column()
    password:string

    @OneToMany(()=>UserRole,userRole=>userRole.user, { eager: true })
    userRoles:UserRole[]
}