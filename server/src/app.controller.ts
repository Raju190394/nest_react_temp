import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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
  @UseInterceptors(FileInterceptor('thumbnail', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `course-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  createCourse(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      body.thumbnail = `http://localhost:3000/uploads/${file.filename}`;
    }
    // Convert price to number if it's sent as string
    if (body.price) body.price = Number(body.price);
    return this.appService.createCourse(body);
  }

  @Put('courses/:id')
  @UseInterceptors(FileInterceptor('thumbnail', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `course-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  updateCourse(@Param('id') id: string, @Body() body: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      body.thumbnail = `http://localhost:3000/uploads/${file.filename}`;
    }
    // Convert price to number if it's sent as string
    if (body.price) body.price = Number(body.price);
    return this.appService.updateCourse(id, body);
  }

  @Delete('courses/:id')
  deleteCourse(@Param('id') id: string) {
    return this.appService.deleteCourse(id);
  }

  // Students with Pagination and File Upload Support
  @Get('students')
  getStudents(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.appService.getStudents(Number(page), Number(limit));
  }

  @Post('students')
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  createStudent(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      body.photo = `http://localhost:3000/uploads/${file.filename}`;
    }
    return this.appService.createStudent(body);
  }

  @Put('students/:id')
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  updateStudent(@Param('id') id: string, @Body() body: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      body.photo = `http://localhost:3000/uploads/${file.filename}`;
    }
    return this.appService.updateStudent(id, body);
  }

  @Delete('students/:id')
  deleteStudent(@Param('id') id: string) {
    return this.appService.deleteStudent(id);
  }
}
