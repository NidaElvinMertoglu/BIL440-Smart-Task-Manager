import { X, Calendar, Clock, AlertCircle, Link as LinkIcon, AlignLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, getTasks, updateTask } from '../../api/taskApi';
import type { Task, TaskCreatePayload } from '../../types';
import { useEffect } from 'react';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task;
}

type TaskFormData = {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  start_date: string;
  due_date: string;
  dependencies: string[];
  progress: number;
};

// 'YYYY-MM-DDTHH:MM
const formatDateTimeForInput = (isoString: string) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const pad = (num: number) => num.toString().padStart(2, '0');
  
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};


const TaskFormModal = ({ isOpen, onClose, taskToEdit }: TaskFormModalProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>();

  const isEditMode = !!taskToEdit;

  useEffect(() => {
    if (isEditMode && isOpen) {
      reset({
        ...taskToEdit,
        start_date: formatDateTimeForInput(taskToEdit.start_date),
        due_date: formatDateTimeForInput(taskToEdit.due_date),
      });
    } else if (!isOpen) {
      reset();
    }
  }, [isOpen, taskToEdit, isEditMode, reset]);

  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
    enabled: isOpen,
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      alert("Görev oluşturuldu!");
      onClose();
    },
    onError: (error) => {
      alert("Görev oluşturulurken bir hata oluştu: " + error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaskCreatePayload }) => updateTask(id, data),
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.setQueryData(['task', updatedTask.id.toString()], updatedTask);
      alert("Görev güncellendi!");
      onClose();
    },
    onError: (error) => {
      alert("Görev güncellenirken bir hata oluştu: " + error.message);
    }
  });

  if (!isOpen) return null;

  const onSubmit = (data: TaskFormData) => {
    // Before creating taskPayload, check dependencies if in edit mode and progress is being set > 0
    if (isEditMode && data.progress > 0) { // If progress is being set or increased from 0
      if (data.dependencies && data.dependencies.length > 0) {
        const incompleteDependencies = data.dependencies.filter(depId => {
          const dependencyTask = tasks?.find(t => t.id.toString() === depId);
          return dependencyTask && dependencyTask.progress !== 100;
        });

        if (incompleteDependencies.length > 0) {
          alert(`Bu görevi başlatmak/tamamlamak için önce bağımlı olduğu görevleri bitirmelisiniz:\n${
            incompleteDependencies.map(depId => {
              const depTask = tasks?.find(t => t.id.toString() === depId);
              return depTask ? `- ${depTask.title}` : `- Bilinmeyen Görev (${depId})`;
            }).join('\n')
          }`);
          return; // Prevent update
        }
      }
    }

    const taskPayload: TaskCreatePayload = {
        ...data,
        start_date: `${data.start_date}:00Z`,
        due_date: `${data.due_date}:00Z`,
        dependencies: data.dependencies || [],
    };
    
    if (isEditMode) {
      updateMutation.mutate({ id: taskToEdit.id, data: taskPayload });
    } else {
      createMutation.mutate(taskPayload);
    }
  };
  
  const mutation = isEditMode ? updateMutation : createMutation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">
            {isEditMode ? 'Görevi Düzenle' : 'Yeni Görev Oluştur'}
          </h3>
          <button onClick={onClose} title="Kapat" className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Görev Başlığı</label>
            <input 
              id="title"
              {...register('title', { required: "Başlık zorunludur" })}
              type="text" 
              placeholder="Örn: Login ekranı tasarımı" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <AlignLeft size={14} /> Açıklama
            </label>
            <textarea 
              id="description"
              {...register('description')}
              rows={3}
              placeholder="Görev hakkında detaylı bilgi..." 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <AlertCircle size={14} /> Öncelik
            </label>
            <select id="priority" {...register('priority')} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <option value="low">Düşük</option>
              <option value="medium">Orta</option>
              <option value="high">Yüksek</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Calendar size={14} /> Başlangıç Tarihi
                </label>
                <input 
                id="start_date"
                {...register('start_date', { required: true })}
                type="datetime-local" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
            </div>
            <div>
                <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Calendar size={14} /> Son Teslim Tarihi
                </label>
                <input 
                id="due_date"
                {...register('due_date', { required: true })}
                type="datetime-local" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <label htmlFor="dependencies" className="block text-sm font-medium text-blue-800 mb-1 flex items-center gap-1">
              <LinkIcon size={14} /> Bağımlılık (Opsiyonel)
            </label>
            <select id="dependencies" {...register('dependencies')} multiple className="w-full border border-blue-200 rounded px-3 py-2 text-sm bg-white">
                <option value="">-- Bağımsız Görev --</option>
                {tasks?.filter(t => t.id !== taskToEdit?.id).map(task => (
                    <option key={task.id} value={task.id.toString()}>{task.title}</option>
                ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">
              İptal
            </button>
            <button type="submit" disabled={mutation.isPending} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm disabled:bg-blue-300">
              {mutation.isPending 
                ? (isEditMode ? 'Kaydediliyor...' : 'Oluşturuluyor...') 
                : (isEditMode ? 'Değişiklikleri Kaydet' : 'Oluştur')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;