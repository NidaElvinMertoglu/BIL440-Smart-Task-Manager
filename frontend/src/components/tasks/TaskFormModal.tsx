import { X, Calendar, Clock, AlertCircle, Link as LinkIcon, AlignLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TaskFormData = {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  duration: number;
  dueDate: string;
  dependencyId?: string;
};

const TaskFormModal = ({ isOpen, onClose }: TaskFormModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>();

  if (!isOpen) return null;

  const onSubmit = (data: TaskFormData) => {
    console.log("Yeni Görev Verisi:", data);
    alert("Görev oluşturuldu!");
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Yeni Görev Oluştur</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          
          {/* 1. Başlık */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Görev Başlığı</label>
            <input 
              {...register('title', { required: "Başlık zorunludur" })}
              type="text" 
              placeholder="Örn: Login ekranı tasarımı" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
          </div>

          {/* 2. Açıklama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <AlignLeft size={14} /> Açıklama
            </label>
            <textarea 
              {...register('description')}
              rows={3}
              placeholder="Görev hakkında detaylı bilgi..." 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* 3. Öncelik ve Süre */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <AlertCircle size={14} /> Öncelik
              </label>
              <select {...register('priority')} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
                <option value="low">Düşük</option>
                <option value="medium">Orta</option>
                <option value="high">Yüksek</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Clock size={14} /> Süre (Saat)
              </label>
              <input 
                {...register('duration', { required: true, min: 1 })}
                type="number" 
                placeholder="4" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* 4. Tarih */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Calendar size={14} /> Son Teslim Tarihi
            </label>
            <input 
              {...register('dueDate', { required: true })}
              type="datetime-local" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* 5. Bağımlılık */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <label className="block text-sm font-medium text-blue-800 mb-1 flex items-center gap-1">
              <LinkIcon size={14} /> Bağımlılık (Opsiyonel)
            </label>
            <select {...register('dependencyId')} className="w-full border border-blue-200 rounded px-3 py-2 text-sm bg-white">
              <option value="">-- Bağımsız Görev --</option>
              <option value="1">Backend API Geliştirme (Mock)</option>
              <option value="2">Veritabanı Tasarımı (Mock)</option>
            </select>
          </div>

          {/* Butonlar */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">
              İptal
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
              Oluştur
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;