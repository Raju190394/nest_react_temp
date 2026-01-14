
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    courseId: string;

    @Column()
    enrollmentDate: string;

    @Column()
    status: string;

    @Column({ nullable: true })
    avatar: string;
}
