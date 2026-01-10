import { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskList from '../components/tasks/TaskList';
import RiskAnalysisPanel from '../components/analysis/RiskAnalysisPanel';
import TaskFormModal from '../components/tasks/TaskFormModal';
import GanttChart from '../components/tasks/GanttChart';
import { MOCK_TASKS } from '../mockData';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Şimdilik Mock veriyi kullanıyoruz
  const tasks = MOCK_TASKS; 

  return (
    <div className="space-y-6">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Proje Panosu</h1>
          <p className="text-gray-500 mt-1">Tüm projelerin durumu ve AI analizleri.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-sm transition-colors"
        >
          <Plus size={18} /> Yeni Görev Ekle
        </button>
      </div>

      {/* 2. ANALİZ VE ÖZET ALANI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol taraf: İstatistikler */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
           <StatCard label="Toplam Görev" value={tasks.length} />
           <StatCard label="Tamamlanan" value="%35" color="text-green-600" />
           <StatCard label="Gecikme Riski" value="1" color="text-red-600" />
        </div>
        
        {/* Sağ taraf: AI Risk Paneli */}
        <div className="lg:col-span-1">
          <RiskAnalysisPanel tasks={tasks} />
        </div>
      </div>

      {/* 3. GANTT ŞEMASI */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Zaman Çizelgesi</h2>
        {/* Gantt bileşenine veriyi gönderiyoruz */}
        <GanttChart tasks={tasks} />
      </div>

      {/* 4. GÖREV LİSTESİ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Görev Listesi</h2>
            <button className="text-sm text-blue-600 hover:underline">Tümünü Gör</button>
         </div>
         <TaskList tasks={tasks} />
      </div>

      {/* MODAL */}
      <TaskFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
};

// Basit İstatistik Kartı Bileşeni
const StatCard = ({ label, value, color = "text-gray-900" }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center">
    <span className="text-gray-500 text-sm font-medium">{label}</span>
    <span className={`text-3xl font-bold mt-2 ${color}`}>{value}</span>
  </div>
);

export default Dashboard;