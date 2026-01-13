import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
  const { user, isAuthenticated } = useAuth();


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sol Menü */}
      <Sidebar />

      {/* Değişen İçerik Alanı */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Üst Header*/}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-gray-700 font-semibold">Hoşgeldin, {user?.full_name}</h2>
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            {user?.full_name?.charAt(0)}
            </div>
        </header>

        {/* Sayfaların render olduğu yer */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;