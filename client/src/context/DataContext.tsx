
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Student, Course } from '../types';
// Removed: import { mockUsers, mockStudents, mockCourses, delay } from '../store/mockData';

interface DataContextType {
    users: User[];
    students: Student[];
    courses: Course[];

    // User CRUD
    addUser: (user: Omit<User, 'id'>) => Promise<void>;
    updateUser: (id: string, user: Partial<User>) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;

    // Student CRUD
    addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
    updateStudent: (id: string, student: Partial<Student>) => Promise<void>;
    deleteStudent: (id: string) => Promise<void>;

    // Course CRUD
    addCourse: (course: Omit<Course, 'id'>) => Promise<void>;
    updateCourse: (id: string, course: Partial<Course>) => Promise<void>;
    deleteCourse: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const API_URL = 'http://localhost:3000/api';

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

    const fetchData = async () => {
        try {
            const [usersRes, studentsRes, coursesRes] = await Promise.all([
                fetch(`${API_URL}/users`),
                fetch(`${API_URL}/students`),
                fetch(`${API_URL}/courses`)
            ]);
            setUsers(await usersRes.json());
            setStudents(await studentsRes.json());
            const coursesData = await coursesRes.json();
            setCourses(coursesData.map((c: any) => ({ ...c, price: Number(c.price) })));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Users
    const addUser = async (userData: Omit<User, 'id'>) => {
        await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        fetchData();
    };

    const updateUser = async (id: string, updates: Partial<User>) => {
        await fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        fetchData();
    };

    const deleteUser = async (id: string) => {
        await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
        fetchData();
    };

    // Students
    const addStudent = async (studentData: Omit<Student, 'id'>) => {
        await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });
        fetchData();
    };

    const updateStudent = async (id: string, updates: Partial<Student>) => {
        await fetch(`${API_URL}/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        fetchData();
    };

    const deleteStudent = async (id: string) => {
        await fetch(`${API_URL}/students/${id}`, { method: 'DELETE' });
        fetchData();
    };

    // Courses
    const addCourse = async (courseData: Omit<Course, 'id'>) => {
        await fetch(`${API_URL}/courses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData)
        });
        fetchData();
    };

    const updateCourse = async (id: string, updates: Partial<Course>) => {
        await fetch(`${API_URL}/courses/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        fetchData();
    };

    const deleteCourse = async (id: string) => {
        await fetch(`${API_URL}/courses/${id}`, { method: 'DELETE' });
        fetchData();
    };

    return (
        <DataContext.Provider value={{
            users, students, courses,
            addUser, updateUser, deleteUser,
            addStudent, updateStudent, deleteStudent,
            addCourse, updateCourse, deleteCourse
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
