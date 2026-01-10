import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, User, LogOut, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col hidden md:flex">
      {/* Logo Alanı */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          SmartTask
        </h1>
      </div>

      {/* Menü Linkleri */}
      <nav className="flex-1 p-4 space-y-2">
        <NavItem to="/" icon={<LayoutDashboard size={20} />} text="Genel Bakış" />
        {/* Görevler sayfası olmadığı için şimdilik Dashboard'a yönlendiriyoruz veya ileride eklenecek bir sayfaya */}
        <NavItem to="/profile" icon={<User size={20} />} text="Profilim" />
      </nav>

      {/* Alt Kısım */}
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full text-sm font-medium transition-colors">
          <LogOut size={20} /> Çıkış Yap
        </button>
      </div>
    </aside>
  );
};

// Yardımcı Link Bileşeni
const NavItem = ({ to, icon, text }: { to: string; icon: any; text: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-700 shadow-sm'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`
    }
  >
    {icon}
    {text}
  </NavLink>
);

export default Sidebar;