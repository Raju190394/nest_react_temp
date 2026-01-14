import React from 'react';
import { useData } from '../context/DataContext';
import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

export const Dashboard = () => {
    const { users, students, courses } = useData();

    const stats = [
        { label: 'Total Users', value: users.length, icon: Users, color: 'bg-blue-500', shadow: 'shadow-blue-200' },
        { label: 'Total Students', value: students.length, icon: GraduationCap, color: 'bg-green-500', shadow: 'shadow-green-200' },
        { label: 'Active Courses', value: courses.length, icon: BookOpen, color: 'bg-indigo-500', shadow: 'shadow-indigo-200' },
        { label: 'Total Revenue', value: '$24,500', icon: DollarSign, color: 'bg-purple-500', shadow: 'shadow-purple-200' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`${stat.color} p-4 rounded-xl text-white shadow-lg ${stat.shadow}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Recent Students</h3>
                        <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {students.slice(0, 5).map(student => (
                            <div key={student.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <img src={student.avatar} alt="" className="w-10 h-10 rounded-full" />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                                    <p className="text-xs text-gray-500">{student.email}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${student.status === 'active' ? 'bg-green-100 text-green-700' :
                                        student.status === 'graduated' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {student.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Popular Courses</h3>
                        <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {courses.slice(0, 4).map(course => (
                            <div key={course.id} className="group cursor-pointer">
                                <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                                    <img src={course.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                    <span className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                                        ${course.price}
                                    </span>
                                </div>
                                <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{course.title}</h4>
                                <p className="text-xs text-gray-500">{course.instructor} • {course.duration}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
