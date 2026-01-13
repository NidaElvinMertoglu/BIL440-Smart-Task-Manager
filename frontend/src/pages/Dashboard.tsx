import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, List, LayoutGrid } from 'lucide-react';

import TaskList from '../components/tasks/TaskList';
import RiskAnalysisPanel from '../components/analysis/RiskAnalysisPanel';
import AISuggestions from '../components/analysis/AISuggestions';
import TaskFormModal from '../components/tasks/TaskFormModal';
import GanttChart from '../components/tasks/GanttChart';
import TaskCard from '../components/tasks/TaskCard'; 
import { getTasks } from '../api/taskApi';
import type { Task } from '../types';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined); // New state for task to edit
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const { data: tasks = [], isLoading, isError, error } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const handleOpenModalForEdit = (task: Task) => { 
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(undefined); 
  };

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError) return <div>Hata: {error.message}</div>;

  const completedTasks = tasks.filter(t => t.progress === 100).length;
  const completedPercentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Proje Panosu</h1>
          <p className="text-gray-500 mt-1">Tüm projelerin durumu ve AI analizleri.</p>
        </div>
        <button 
          onClick={() => {
            setTaskToEdit(undefined); // Task editlenirken eklemeyi engelle
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-sm transition-colors"
        >
          <Plus size={18} /> Yeni Görev Ekle
        </button>
      </div>

      {/* 2. İSTATİSTİKLER */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
         <StatCard label="Toplam Görev" value={tasks.length} />
         <StatCard label="Tamamlanan" value={`%${completedPercentage}`} color="text-green-600" />
         <StatCard label="Gecikme Riski" value={tasks.filter(t => t.is_risk).length} color="text-red-600" />
      </div>
      
      {/* 3. AI BÖLÜMÜ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RiskAnalysisPanel tasks={tasks} />
        <AISuggestions tasks={tasks} onEditTask={handleOpenModalForEdit} /> {/* Pass handler to AISuggestions */}
      </div>

      {/* 4. GANTT ŞEMASI */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Zaman Çizelgesi</h2>
        <GanttChart tasks={tasks} />
      </div>

      {/* 5. GÖREV LİSTESİ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
         
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-700">Görevler</h2>
            
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                title="Liste Görünümü"
              >
                <List size={18} />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                title="Kart Görünümü"
              >
                <LayoutGrid size={18} />
              </button>
            </div>
         </div>

         {viewMode === 'list' ? (
           <TaskList tasks={tasks} />
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {tasks.map(task => (
               <TaskCard key={task.id} task={task} />
             ))}
           </div>
         )}
      </div>

      {/* MODAL */}
      <TaskFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        taskToEdit={taskToEdit}
      />

    </div>
  );
};

const StatCard = ({ label, value, color = "text-gray-900" }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center">
    <span className="text-gray-500 text-sm font-medium">{label}</span>
    <span className={`text-3xl font-bold mt-2 ${color}`}>{value}</span>
  </div>
);

export default Dashboard;