import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, Student, Course } from '../types';
// Removed: import { mockUsers, mockStudents, mockCourses, delay } from '../store/mockData';

interface DataContextType {
    users: User[];
    students: Student[];
    totalStudents: number;
    courses: Course[];

    // User CRUD
    addUser: (user: Omit<User, 'id'>) => Promise<void>;
    updateUser: (id: string, user: Partial<User>) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;

    // Student CRUD with pagination support
    fetchStudents: (page?: number, limit?: number) => Promise<void>;
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
    const [totalStudents, setTotalStudents] = useState(0);
    const [courses, setCourses] = useState<Course[]>([]);

    const fetchStudents = async (page = 1, limit = 10) => {
        try {
            const res = await fetch(`${API_URL}/students?page=${page}&limit=${limit}`);
            const result = await res.json();
            setStudents(result.data || []);
            setTotalStudents(result.total || 0);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchData = async () => {
        try {
            const [usersRes, coursesRes] = await Promise.all([
                fetch(`${API_URL}/users`),
                fetch(`${API_URL}/courses`)
            ]);
            setUsers(await usersRes.json());
            const coursesData = await coursesRes.json();
            setCourses(coursesData.map((c: any) => ({ ...c, price: Number(c.price) })));

            // Fetch first page of students
            await fetchStudents(1, 10);
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
    const addStudent = async (studentData: any) => {
        const formData = new FormData();
        Object.keys(studentData).forEach(key => {
            const value = studentData[key];
            if (key === 'photo') {
                if (value instanceof File) {
                    formData.append('photo', value);
                } else if (typeof value === 'string' && value.startsWith('http')) {
                    formData.append('photo', value);
                }
            } else if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        });

        const res = await fetch(`${API_URL}/students`, {
            method: 'POST',
            body: formData
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to add student');
        }

        await fetchData();
    };

    const updateStudent = async (id: string, updates: any) => {
        const formData = new FormData();
        Object.keys(updates).forEach(key => {
            const value = updates[key];
            if (key === 'photo') {
                if (value instanceof File) {
                    formData.append('photo', value);
                } else if (typeof value === 'string' && value.startsWith('http')) {
                    formData.append('photo', value);
                }
            } else if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        });

        const res = await fetch(`${API_URL}/students/${id}`, {
            method: 'PUT',
            body: formData
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to update student');
        }

        await fetchData();
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
            users, students, totalStudents, courses,
            addUser, updateUser, deleteUser,
            fetchStudents, addStudent, updateStudent, deleteStudent,
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
