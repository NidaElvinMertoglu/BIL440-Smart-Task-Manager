import { Calendar, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task }: { task: any }) => {
  return (
    <Link to={`/tasks/${task.id}`} className="block">
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer h-full">
        
        {/* Üst Kısım: Başlık ve Öncelik */}
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="font-bold text-gray-800 line-clamp-1" title={task.title}>
            {task.title}
          </h3>
          <span className={`shrink-0 px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
            task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
            task.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
            'bg-green-100 text-green-700'
          }`}>
            {task.priority}
          </span>
        </div>
        
        {/* Orta: Açıklama veya İlerleme */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>İlerleme</span>
            <span className="font-medium text-gray-700">%{task.progress}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-1.5 rounded-full ${task.is_risk ? 'bg-red-500' : 'bg-blue-600'}`} 
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Alt: Tarih ve Risk Uyarısı */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gray-400"/>
              <span>{new Date(task.due_date).toLocaleDateString('tr-TR')}</span>
          </div>
           {task.is_risk && (
              <div className="flex items-center gap-1 text-red-600 font-bold" title="Gecikme Riski Var">
                <AlertCircle size={14} />
                <span>Riskli</span>
              </div>
           )}
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;