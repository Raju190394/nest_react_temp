
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Index()
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

    @Column({ nullable: true })
    photo: string;
}
