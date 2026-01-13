import { Lightbulb, Zap } from 'lucide-react';
import type { Task } from '../../types';

interface AISuggestionsProps {
  tasks: Task[];
  onEditTask: (task: Task) => void; // New prop
}

const AISuggestions = ({ tasks, onEditTask }: AISuggestionsProps) => { // Destructure new prop
  const suggestions = tasks
    .filter(task => task.ai_suggestion)
    .map(task => ({
      id: task.id,
      icon: <Zap className="text-yellow-500" size={20} />,
      title: `"${task.title}" için verimlilik fırsatı`,
      desc: task.ai_suggestion,
      task: task, // Store the full task object
    }));

  return (
    <div className="bg-white border border-indigo-100 rounded-xl p-0 shadow-sm overflow-hidden h-fit">
      
      {/* Başlık */}
      <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex items-center gap-2">
        <Lightbulb className="text-indigo-600" size={20} />
        <h3 className="font-bold text-indigo-900 text-sm">AI İyileştirme Önerileri</h3>
      </div>

      {/* Öneri Listesi */}
      <div className="divide-y divide-gray-50">
        {suggestions.length > 0 ? (
          suggestions.map((item) => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex gap-3">
                <div className="mt-1 bg-gray-50 p-1.5 rounded-lg h-fit">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-gray-800 font-semibold text-sm">{item.title}</h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                  <button 
                    onClick={() => onEditTask(item.task)} // Call onEditTask with the full task
                    className="mt-2 text-xs text-indigo-600 font-medium hover:underline"
                  >
                    Uygula
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 text-sm">
            Şu anda herhangi bir öneri bulunmuyor.
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestions;