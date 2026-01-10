import { Link } from 'react-router-dom';
import { Calendar, AlertCircle, ArrowRight } from 'lucide-react';

interface Task { id: string; title: string; priority: string; due_date: string; is_risk: boolean; }

interface TaskListProps {
  tasks: any[]; 
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
          <tr>
            <th className="px-4 py-3 rounded-tl-lg">Görev Adı</th>
            <th className="px-4 py-3">Öncelik</th>
            <th className="px-4 py-3">Durum</th>
            <th className="px-4 py-3">Bitiş Tarihi</th>
            <th className="px-4 py-3 rounded-tr-lg"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50 transition-colors group">
              
              {/* 1. Görev Adı ve Risk İkonu */}
              <td className="px-4 py-3 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  {task.title}
                  {task.is_risk && (
                    <span className="text-red-500" title="Gecikme Riski">
                      <AlertCircle size={16} />
                    </span>
                  )}
                </div>
              </td>

              {/* 2. Öncelik Badge */}
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                  task.priority === 'high' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                  task.priority === 'medium' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-green-50 text-green-700 border-green-200'
                }`}>
                  {task.priority === 'high' ? 'Yüksek' : task.priority === 'medium' ? 'Orta' : 'Düşük'}
                </span>
              </td>

              {/* 3. İlerleme Durumu */}
              <td className="px-4 py-3 text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs">%{task.progress}</span>
                </div>
              </td>

              {/* 4. Tarih */}
              <td className="px-4 py-3 text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-gray-400" />
                  {new Date(task.due_date).toLocaleDateString('tr-TR')}
                </div>
              </td>

              {/* 5. Detay Butonu */}
              <td className="px-4 py-3 text-right">
                <Link 
                  to={`/tasks/${task.id}`} 
                  className="text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowRight size={18} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {tasks.length === 0 && (
        <div className="p-8 text-center text-gray-400 text-sm">
          Henüz hiç görev yok.
        </div>
      )}
    </div>
  );
};

export default TaskList;