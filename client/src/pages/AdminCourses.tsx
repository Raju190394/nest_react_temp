import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, ArrowUpDown, Image } from 'lucide-react';
import { Modal } from '../components/UI/Modal';
import type { Course } from '../types';

const courseSchema = z.object({
    title: z.string().min(3, 'Title is required (min 3 chars)'),
    description: z.string().min(10, 'Description is required (min 10 chars)'),
    price: z.number({ invalid_type_error: "Price must be a number" }).min(0, 'Price must be positive'),
    duration: z.string().min(2, 'Duration is required'),
    instructor: z.string().min(2, 'Instructor is required'),
    thumbnail: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type CourseFormData = z.infer<typeof courseSchema>;

export const AdminCoursesPage = () => {
    const { courses, addCourse, updateCourse, deleteCourse } = useData();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
        defaultValues: { price: 0 }
    });

    const filteredCourses = courses.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => {
        return sort === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    });

    const totalPages = Math.ceil(filteredCourses.length / pageSize);
    const paginatedCourses = filteredCourses.slice((page - 1) * pageSize, page * pageSize);

    const handleOpenModal = (course?: Course) => {
        if (course) {
            setEditingCourse(course);
            reset({
                title: course.title,
                description: course.description,
                price: course.price,
                duration: course.duration,
                instructor: course.instructor,
                thumbnail: course.thumbnail || ''
            });
        } else {
            setEditingCourse(null);
            reset({
                title: '',
                description: '',
                price: 0,
                duration: '',
                instructor: '',
                thumbnail: ''
            });
        }
        setIsModalOpen(true);
    };

    const onSubmit = async (data: CourseFormData) => {
        // Clean up undefined/empty string thumbnail
        const cleanData = { ...data, thumbnail: data.thumbnail || undefined };

        if (editingCourse) {
            await updateCourse(editingCourse.id, cleanData);
        } else {
            await addCourse(cleanData);
        }
        setIsModalOpen(false);
        reset();
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            await deleteCourse(id);
        }
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
                    <p className="text-gray-500 text-sm">Create and manage curriculum</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all font-medium"
                >
                    <Plus size={18} /> Add Course
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setSort(prev => prev === 'asc' ? 'desc' : 'asc')}
                        className="px-4 py-2 border border-gray-200 rounded-xl flex items-center gap-2 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <ArrowUpDown size={16} />
                        Sort: {sort === 'asc' ? 'A-Z' : 'Z-A'}
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Thumbnail</th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Instructor</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedCourses.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No courses found.</td></tr>
                            ) : (
                                paginatedCourses.map(course => (
                                    <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-16 h-10 rounded-md overflow-hidden bg-gray-100">
                                                <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900">{course.title}</p>
                                            <p className="text-xs text-gray-500 line-clamp-1 w-48">{course.description}</p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{course.instructor}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">${course.price}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleOpenModal(course)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(course.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Showing {Math.min(filteredCourses.length, (page - 1) * pageSize + 1)} to {Math.min(filteredCourses.length, page * pageSize)} of {filteredCourses.length} courses
                    </p>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'hover:bg-gray-50 text-gray-600'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingCourse ? 'Edit Course' : 'Create New Course'}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                        <input {...register('title')} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="e.g. Advanced React" />
                        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea rows={3} {...register('description')} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="Course details..." />
                        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register('price', { valueAsNumber: true })}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            />
                            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input {...register('duration')} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="e.g. 8 weeks" />
                            {errors.duration && <p className="text-xs text-red-500 mt-1">{errors.duration.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                            <input {...register('instructor')} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="Instructor Name" />
                            {errors.instructor && <p className="text-xs text-red-500 mt-1">{errors.instructor.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                            <input {...register('thumbnail')} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="https://..." />
                            {errors.thumbnail && <p className="text-xs text-red-500 mt-1">{errors.thumbnail.message}</p>}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-70 font-medium">
                            {isSubmitting ? 'Saving...' : 'Save Course'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
