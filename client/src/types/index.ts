export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
    avatar?: string;
}

export interface Student {
    id: string;
    name: string;
    email: string;
    courseId: string;
    enrollmentDate: string;
    status: 'active' | 'dropped' | 'graduated';
    avatar?: string;
    photo?: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: string;
    instructor: string;
    thumbnail?: string;
}

export type SortDirection = 'asc' | 'desc';
