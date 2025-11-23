import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { City } from "./city.entity";

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', default: 'user' })
    role: string;

    @Column({ type: 'varchar', unique: true })
    username: string;

    @Column({ type: 'varchar', unique: true })
    email: string;
  
    @Column({ type: 'varchar', unique: true, nullable: true })
    phone: string;

    @Column({ type: 'varchar' })
    password?: string;

    @Column({ type: 'varchar', nullable: true })
    picture: string;

    @Column({ type: 'bool', default: true })
    is_active: boolean;

    @Column({ type: 'bool', default: false })
    is_online: boolean;

    @Column({ type: 'bool', default: false })
    is_disabled: boolean;

    @Column({ type: 'bool', default: false })
    is_google: boolean;
  
    @CreateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)" 
    })
    created_at: Date;

    @UpdateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)", 
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updated_at: Date;

    @OneToMany(() => City, city => city.user)
    cities: City[];
  
}