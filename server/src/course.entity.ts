
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value)
        }
    })
    price: number;

    @Column()
    duration: string;

    @Column()
    instructor: string;

    @Column({ nullable: true })
    thumbnail: string;
}
