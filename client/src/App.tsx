import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { UsersPage } from './pages/Users';
import { StudentsPage } from './pages/Students';
import { CoursesPage } from './pages/Courses';
import { Layout } from './components/Layout/Layout';
import { WebsiteLayout } from './components/Layout/WebsiteLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminCoursesPage } from './pages/AdminCourses';

import { CartProvider } from './context/CartContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <CartProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Website Module */}
              <Route element={<WebsiteLayout />}>
                <Route path="/" element={<Navigate to="/courses" replace />} />
                <Route path="/courses" element={<CoursesPage />} />
              </Route>

              {/* Admin Module */}
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="students" element={<StudentsPage />} />
                  <Route path="courses" element={<AdminCoursesPage />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </CartProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
