import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskDetail from './pages/TaskDetail'; 

// Context
import { AuthProvider, useAuth } from './context/AuthContext';


const queryClient = new QueryClient();

// ProtectedRoute component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  
  // If not authenticated, redirect to login immediately
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but user data is not yet loaded, show a loading state
  // This covers the brief period after login where token is present but user data is still being fetched
  if (isAuthenticated && user === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-blue-600 font-semibold text-lg">Yükleniyor...</div>
      </div>
    );
  }

  // If authenticated and user data is loaded, render children
  return <>{children}</>;
};


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes (Layout dışı) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes (Sidebar ve Navbar olan sayfalar) */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tasks/:id" element={<TaskDetail />} />
            </Route>

            {/* Yanlış URL girilirse Login'e at */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;