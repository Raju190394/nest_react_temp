
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';
import { Student } from './student.entity';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Course) private courseRepo: Repository<Course>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) { }

  async onModuleInit() {
    await this.seedUsers();
    await this.seedCourses();
    await this.seedStudents();
  }

  // Seeding Logic
  async seedUsers() {
    if ((await this.userRepo.count()) === 0) {
      const users = [
        { name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', avatar: 'https://ui-avatars.com/api/?name=Admin+User' },
        { name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
      ];
      await this.userRepo.save(users);
      console.log('Seeded Users');
    }
  }

  async seedCourses() {
    if ((await this.courseRepo.count()) === 0) {
      const courses = [
        { title: 'React Mastery', description: 'Master React with TypeScript and Hooks', price: 99.99, duration: '10 weeks', instructor: 'Sarah Connor', thumbnail: 'https://placehold.co/600x400?text=React' },
        { title: 'Advanced Tailwind', description: 'Deep dive into Tailwind CSS', price: 49.99, duration: '4 weeks', instructor: 'John Wick', thumbnail: 'https://placehold.co/600x400?text=Tailwind' },
      ];
      await this.courseRepo.save(courses);
      console.log('Seeded Courses');
    }
  }

  async seedStudents() {
    if ((await this.studentRepo.count()) === 0) {
      const course = await this.courseRepo.findOneBy({});
      if (course) {
        const students = Array.from({ length: 50 }, (_, i) => ({
          name: `Student ${i + 1}`,
          email: `student${i + 1}@school.com`,
          courseId: course.id,
          enrollmentDate: new Date().toISOString().split('T')[0],
          status: 'active',
          avatar: `https://ui-avatars.com/api/?name=Student+${i + 1}`,
          photo: `https://images.unsplash.com/photo-1544717297-fa154da09f9d?w=200&h=200&fit=crop`,
        }));
        await this.studentRepo.save(students);
        console.log('Seeded 50 Students');
      }
    }
  }

  // Users CRUD
  async getUsers(): Promise<User[]> {
    return this.userRepo.find();
  }
  async createUser(user: Partial<User>): Promise<User> {
    return this.userRepo.save(user);
  }
  async updateUser(id: string, user: Partial<User>): Promise<void> {
    await this.userRepo.update(id, user);
  }
  async deleteUser(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }

  // Courses CRUD
  async getCourses(): Promise<Course[]> {
    return this.courseRepo.find();
  }
  async createCourse(course: Partial<Course>): Promise<Course> {
    return this.courseRepo.save(course);
  }
  async updateCourse(id: string, course: Partial<Course>): Promise<void> {
    await this.courseRepo.update(id, course);
  }
  async deleteCourse(id: string): Promise<void> {
    await this.courseRepo.delete(id);
  }

  // Students CRUD with Pagination
  async getStudents(page: number = 1, limit: number = 10): Promise<{ data: Student[], total: number }> {
    const [data, total] = await this.studentRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { name: 'ASC' }
    });
    return { data, total };
  }
  async createStudent(student: Partial<Student>): Promise<Student> {
    return this.studentRepo.save(student);
  }
  async updateStudent(id: string, student: Partial<Student>): Promise<void> {
    await this.studentRepo.update(id, student);
  }
  async deleteStudent(id: string): Promise<void> {
    await this.studentRepo.delete(id);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
