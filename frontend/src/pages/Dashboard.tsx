import { useState } from 'react'; 
import { Plus } from 'lucide-react';
import TaskFormModal from '../components/tasks/TaskFormModal';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="space-y-6">
      {/* Üst Başlık */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Proje Panosu</h1>
          <p className="text-gray-500 mt-1">Görevlerinizi ve analizleri buradan yönetin.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-sm transition-colors"
        >
          <Plus size={18} /> Yeni Görev Ekle
        </button>
      </div>

      {/* İstatistik Kartları (Örnek) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium">Toplam Görev</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">12</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium">Gecikme Riski</div>
          <div className="text-3xl font-bold text-red-600 mt-2">2</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium">Tamamlanan</div>
          <div className="text-3xl font-bold text-green-600 mt-2">%45</div>
        </div>
      </div>

      {/* Gantt ve Liste Alanları (Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center text-gray-400 border-dashed">
          Gantt Şeması Burada Görüntülenecek
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center text-gray-400 border-dashed">
          AI Risk Analizi
        </div>
      </div>
      <TaskFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;