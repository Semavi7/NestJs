import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./RoleEntity";

@Entity()
export class Permission{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @ManyToMany(()=>Role,role=>role.permissions)
    roles:Role[]
}