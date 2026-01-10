import { AlertTriangle, BrainCircuit, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RiskAnalysisPanelProps {
  tasks: any[];
}

const RiskAnalysisPanel = ({ tasks }: RiskAnalysisPanelProps) => {
  // Sadece riskli görevleri filtrele
  const riskyTasks = tasks.filter(t => t.is_risk);

  // Eğer risk yoksa kullanıcıyı tebrik et
  if (riskyTasks.length === 0) {
    return (
      <div className="bg-green-50 border border-green-100 rounded-xl p-5 flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-full text-green-600">
           <BrainCircuit size={24} />
        </div>
        <div>
          <h3 className="font-bold text-green-800">Harika! Risk Yok.</h3>
          <p className="text-sm text-green-700">Yapay zeka şu an herhangi bir gecikme veya çakışma tespit etmedi.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-red-100 rounded-xl p-0 shadow-sm overflow-hidden">
      
      {/* Başlık Kısmı */}
      <div className="bg-red-50 p-4 border-b border-red-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-red-700 font-bold">
          <BrainCircuit size={20} />
          <span>AI Risk Raporu</span>
        </div>
        <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full font-bold">
          {riskyTasks.length} Kritik Sorun
        </span>
      </div>

      {/* Risk Listesi */}
      <div className="divide-y divide-gray-50">
        {riskyTasks.map(task => (
          <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-500 shrink-0 mt-1" size={18} />
              <div>
                <h4 className="text-gray-800 font-medium text-sm">{task.title}</h4>
                <p className="text-gray-500 text-xs mt-1">
                  {task.risk_message || "Bağımlı olduğu görev bitmeden başlaması planlanmış."}
                </p>
                
                {/* AI Önerisi */}
                <div className="mt-2 bg-indigo-50 border border-indigo-100 rounded p-2 text-xs flex items-center justify-between">
                  <span className="text-indigo-700">
                    💡 <strong>Öneri:</strong> {task.ai_suggestion || "Tarihi 2 gün erteleyin."}
                  </span>
                  <Link to={`/tasks/${task.id}`} className="text-indigo-600 hover:underline flex items-center gap-1">
                    İncele <ArrowRight size={12}/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskAnalysisPanel;