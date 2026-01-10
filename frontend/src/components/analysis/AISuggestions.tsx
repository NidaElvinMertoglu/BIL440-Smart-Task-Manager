import { Lightbulb, TrendingUp, Zap } from 'lucide-react';

const AISuggestions = () => {
  // Şimdilik statik öneriler İleride Backendden gelecek
  const suggestions = [
    {
      id: 1,
      icon: <Zap className="text-yellow-500" size={20} />,
      title: "Verimlilik Fırsatı",
      desc: "API Geliştirme görevi beklenenden hızlı ilerliyor. Frontend ekibi 1 gün erken başlayabilir."
    },
    {
      id: 2,
      icon: <TrendingUp className="text-blue-500" size={20} />,
      title: "Kaynak Yönetimi",
      desc: "Mert Yılmaz'ın üzerindeki iş yükü %85. Yeni görevleri diğer ekip üyelerine dağıtmanızı öneririm."
    }
  ];

  return (
    <div className="bg-white border border-indigo-100 rounded-xl p-0 shadow-sm overflow-hidden h-fit">
      
      {/* Başlık */}
      <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex items-center gap-2">
        <Lightbulb className="text-indigo-600" size={20} />
        <h3 className="font-bold text-indigo-900 text-sm">AI İyileştirme Önerileri</h3>
      </div>

      {/* Öneri Listesi */}
      <div className="divide-y divide-gray-50">
        {suggestions.map((item) => (
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
                <button className="mt-2 text-xs text-indigo-600 font-medium hover:underline">
                  Uygula
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AISuggestions;