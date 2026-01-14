
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: 'user' })
    role: string;

    @Column({ default: 'active' })
    status: string;

    @Column({ nullable: true })
    avatar: string;
}
