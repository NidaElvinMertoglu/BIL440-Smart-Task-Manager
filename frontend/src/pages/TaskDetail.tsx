import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, AlertTriangle, 
  BrainCircuit, CheckSquare, MoreVertical, Link as LinkIcon 
} from 'lucide-react';

// Normalde bu veri React Query ile backend'den (GET /tasks/:id) gelecek.
// Şimdilik MOCK DATA kullanıyoruz.
const MOCK_TASK_DETAIL = {
  id: '1',
  title: 'Frontend Entegrasyonu',
  description: 'React arayüzünün FastAPI backend servisine bağlanması ve JWT authentication yapısının kurulması.',
  status: 'pending',
  priority: 'high',
  start_date: '2026-01-12T09:00:00',
  due_date: '2026-01-15T17:00:00',
  progress: 45,
  assignee: 'Mert Yılmaz',
  // AKILLI ÖZELLİKLER
  is_risk: true,
  risk_message: 'Bağımlı olduğu "API Geliştirme" görevi henüz tamamlanmadı.',
  ai_suggestion: 'Bu görevi 2 gün erteleyerek "API Geliştirme"nin bitmesini beklemelisin.',
  dependencies: [
    { id: '2', title: 'API Geliştirme', status: 'In Progress' }
  ]
};

const TaskDetail = () => {
  const { id } = useParams(); // URL'deki :id parametresini alır
  const navigate = useNavigate();
  
  // Veri yükleniyor simülasyonu (React Query buraya gelecek)
  const task = MOCK_TASK_DETAIL; 

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* 1. ÜST HEADER: Geri Dön ve Başlık */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-gray-200 rounded-full text-gray-600 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-500">TASK-{id}</span>
              {task.priority === 'high' && (
                <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium">Yüksek Öncelik</span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
          </div>
        </div>
        
        {/* Aksiyon Butonları */}
        <div className="flex gap-2">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
            Düzenle
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. SOL KOLON: Detaylar ve AI Analizi */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Analiz Kartı (Sadece Risk Varsa Görünür) */}
          {task.is_risk && (
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-red-600">
                <BrainCircuit size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-red-700 font-bold flex items-center gap-2 mb-2">
                  <AlertTriangle size={20}/> Gecikme Riski Tespit Edildi
                </h3>
                <p className="text-red-900/80 text-sm mb-4">
                  {task.risk_message}
                </p>
                
                <div className="bg-white/60 p-3 rounded-lg border border-red-100">
                  <div className="text-indigo-700 font-semibold text-xs mb-1 flex items-center gap-1">
                    <BrainCircuit size={14}/> YAPAY ZEKA ÖNERİSİ
                  </div>
                  <p className="text-gray-700 text-sm">{task.ai_suggestion}</p>
                  <button className="mt-3 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700 transition">
                    Öneriyi Uygula
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Açıklama Kartı */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Açıklama</h3>
            <p className="text-gray-600 leading-relaxed">
              {task.description}
            </p>
            
            <div className="mt-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Tamamlanma Oranı</span>
                <span className="text-blue-600 font-bold">%{task.progress}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Bağımlılıklar Listesi */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <LinkIcon size={18} className="text-gray-400"/>
              Bağımlılıklar
            </h3>
            {task.dependencies.length > 0 ? (
              <ul className="space-y-3">
                {task.dependencies.map((dep) => (
                  <li key={dep.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span className="text-sm font-medium text-gray-700">{dep.title}</span>
                    </div>
                    <span className="text-xs bg-white border border-gray-200 px-2 py-1 rounded text-gray-500">
                      {dep.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic">Bu görevi engelleyen başka bir görev yok.</p>
            )}
          </div>
        </div>

        {/* 3. SAĞ KOLON: Meta Bilgiler */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
            
            {/* Durum */}
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold tracking-wider">Durum</label>
              <div className="mt-1 flex items-center gap-2 text-gray-900 font-medium">
                <CheckSquare className="text-blue-500" size={18} />
                Devam Ediyor
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Tarihler */}
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold tracking-wider">Tarihler</label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar size={16} className="text-gray-400" />
                  <span>Başlangıç: <span className="font-medium">{new Date(task.start_date).toLocaleDateString()}</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock size={16} className="text-gray-400" />
                  <span>Bitiş: <span className="font-medium text-red-600">{new Date(task.due_date).toLocaleDateString()}</span></span>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Atanan Kişi */}
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold tracking-wider">Atanan Kişi</label>
              <div className="mt-2 flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs">
                  MY
                </div>
                <span className="text-sm font-medium text-gray-700">{task.assignee}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TaskDetail;