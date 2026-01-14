
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Users
  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }
  @Post('users')
  createUser(@Body() body: any) {
    return this.appService.createUser(body);
  }
  @Put('users/:id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.appService.updateUser(id, body);
  }
  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }

  // Courses
  @Get('courses')
  getCourses() {
    return this.appService.getCourses();
  }
  @Post('courses')
  createCourse(@Body() body: any) {
    return this.appService.createCourse(body);
  }
  @Put('courses/:id')
  updateCourse(@Param('id') id: string, @Body() body: any) {
    return this.appService.updateCourse(id, body);
  }
  @Delete('courses/:id')
  deleteCourse(@Param('id') id: string) {
    return this.appService.deleteCourse(id);
  }

  // Students
  @Get('students')
  getStudents() {
    return this.appService.getStudents();
  }
  @Post('students')
  createStudent(@Body() body: any) {
    return this.appService.createStudent(body);
  }
  @Put('students/:id')
  updateStudent(@Param('id') id: string, @Body() body: any) {
    return this.appService.updateStudent(id, body);
  }
  @Delete('students/:id')
  deleteStudent(@Param('id') id: string) {
    return this.appService.deleteStudent(id);
  }
}
