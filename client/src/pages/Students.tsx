import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { Modal } from '../components/UI/Modal';
import type { Student } from '../types';

const studentSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    courseId: z.string().min(1, 'Course is required'),
    enrollmentDate: z.string().min(1, 'Date is required'),
    status: z.enum(['active', 'dropped', 'graduated']),
    photo: z.any().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

export const StudentsPage = () => {
    const { students, courses, addStudent, updateStudent, deleteStudent } = useData();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(1);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const pageSize = 5;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<StudentFormData>({
        resolver: zodResolver(studentSchema),
        defaultValues: { status: 'active', enrollmentDate: new Date().toISOString().split('T')[0] }
    });

    const getCourseName = (id: string) => courses.find(c => c.id === id)?.title || 'Unknown';

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => {
        return sort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });

    const totalPages = Math.ceil(filteredStudents.length / pageSize);
    const paginatedStudents = filteredStudents.slice((page - 1) * pageSize, page * pageSize);

    const handleOpenModal = (student?: Student) => {
        if (student) {
            setEditingStudent(student);
            reset({
                name: student.name,
                email: student.email,
                courseId: student.courseId,
                enrollmentDate: student.enrollmentDate,
                status: student.status,
                photo: student.photo || ''
            });
        } else {
            setEditingStudent(null);
            reset({
                name: '',
                email: '',
                courseId: courses[0]?.id || '',
                enrollmentDate: new Date().toISOString().split('T')[0],
                status: 'active',
                photo: ''
            });
        }
        setPreviewUrl(student?.photo || null);
        setIsModalOpen(true);
    };

    const onSubmit = async (data: StudentFormData) => {
        try {
            if (editingStudent) {
                await updateStudent(editingStudent.id, data);
            } else {
                await addStudent(data);
            }
            setIsModalOpen(false);
            reset();
        } catch (error: any) {
            alert(error.message || 'Something went wrong');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            await deleteStudent(id);
        }
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
                    <p className="text-gray-500 text-sm">Manage student enrollments and progress</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all font-medium"
                >
                    <Plus size={18} /> Add Student
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search students..."
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
                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">Course</th>
                                <th className="px-6 py-4">Enrollment Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedStudents.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No students found.</td></tr>
                            ) : (
                                paginatedStudents.map(student => (
                                    <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={student.photo || student.avatar}
                                                    alt=""
                                                    className="w-10 h-10 rounded-full bg-gray-100 object-cover border border-gray-100 shadow-sm"
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-900">{student.name}</p>
                                                    <p className="text-gray-500 text-xs">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-700 font-medium">{getCourseName(student.courseId)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(student.enrollmentDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`capitalize px-2 py-1 rounded-full text-xs font-medium ${student.status === 'active' ? 'bg-green-100 text-green-700' :
                                                student.status === 'graduated' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleOpenModal(student)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(student.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                        Showing {Math.min(filteredStudents.length, (page - 1) * pageSize + 1)} to {Math.min(filteredStudents.length, page * pageSize)} of {filteredStudents.length} students
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
                title={editingStudent ? 'Edit Student' : 'Add New Student'}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input {...register('name')} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="Student Name" />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input {...register('email')} type="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="student@example.com" />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                        <select {...register('courseId')} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.title}</option>
                            ))}
                        </select>
                        {errors.courseId && <p className="text-xs text-red-500 mt-1">{errors.courseId.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Date</label>
                            <input {...register('enrollmentDate')} type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                            {errors.enrollmentDate && <p className="text-xs text-red-500 mt-1">{errors.enrollmentDate.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select {...register('status')} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                                <option value="active">Active</option>
                                <option value="dropped">Dropped</option>
                                <option value="graduated">Graduated</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Student Photo</label>
                        <div className="flex items-center gap-4">
                            {(previewUrl || editingStudent?.avatar) && (
                                <img
                                    src={previewUrl || editingStudent?.avatar}
                                    className="w-16 h-16 rounded-xl object-cover border-2 border-indigo-50"
                                    alt="Preview"
                                />
                            )}
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            reset({ ...editingStudent, photo: file } as any);
                                            setPreviewUrl(URL.createObjectURL(file));
                                        }
                                    }}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all"
                                />
                                <p className="text-[10px] text-gray-400 mt-1">PNG, JPG or GIF (Max 2MB)</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-70 font-medium">
                            {isSubmitting ? 'Saving...' : 'Save Student'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
