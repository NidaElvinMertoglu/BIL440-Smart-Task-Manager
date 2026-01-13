import React from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import type { Task } from 'gantt-task-react';
import "gantt-task-react/dist/index.css"; 

interface Props {
  tasks: any[]; // Tiplerle uğraşmamak için şimdilik any
}

const SmartGantt: React.FC<Props> = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        Gantt şeması için henüz görev oluşturulmadı.
      </div>
    );
  }

  // 1. Bizim veriyi kütüphanenin formatına çeviriyoruz
  const ganttTasks: Task[] = tasks.map((t) => {
    
    // RENK MANTIĞI: Risk varsa KIRMIZI, yoksa önceliğe göre renk
    let barColor = '#3b82f6'; // Varsayılan Mavi
    
    if (t.is_risk) {
      barColor = '#ef4444'; // Kırmızı (Risk!)
    } else if (t.priority === 'high') {
      barColor = '#f59e0b'; // Turuncu (Yüksek Öncelik)
    } else if (t.priority === 'low') {
      barColor = '#10b981'; // Yeşil (Düşük)
    }

    return {
      start: new Date(t.start_date),
      end: new Date(t.due_date),
      name: t.title,
      id: t.id,
      type: 'task',
      progress: t.progress,
      dependencies: t.dependencies,
      isDisabled: false,
      styles: { 
        progressColor: barColor, 
        backgroundColor: barColor,
        backgroundSelectedColor: barColor
      }
    };
  });

  return (
    <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200 p-2">
      <Gantt
        tasks={ganttTasks}
        viewMode={ViewMode.Day} // Günlük görünüm
        locale="tr" // Türkçe
        columnWidth={65}
        listCellWidth="155px"
        barFill={60}
        
        // Üzerine gelince çıkan kutucuk (Tooltip)
        TooltipContent={({ task, fontSize, fontFamily }) => {
          const original = tasks.find(t => t.id === task.id);
          return (
            <div className="bg-white p-3 shadow-xl rounded border border-gray-100 min-w-[200px] z-50">
              <b className="block mb-1 text-gray-800">{task.name}</b>
              <div className="text-xs text-gray-500 mb-2">
                {task.start.toLocaleDateString()} - {task.end.toLocaleDateString()}
              </div>
              
              {/* Eğer risk varsa uyarıyı göster */}
              {original?.is_risk && (
                <div className="bg-red-50 text-red-600 p-2 rounded text-xs font-bold border border-red-100">
                  ⚠️ {original.risk_message}
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default SmartGantt;