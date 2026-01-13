import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/authApi';
import type { UserCreate, Token } from '../types/auth';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<UserCreate>();
  const auth = useAuth(); 

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: Token) => { // Token gelir
      auth.login(data.access_token); // Başarılı giriş yapar
      navigate('/');
    },
    onError: (error: any) => {
      alert("Kayıt sırasında bir hata oluştu: " + (error.response?.data?.detail || error.message));
    }
  });

  const onSubmit = (data: UserCreate) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        {/* Başlık Alanı */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <User size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Hesap Oluştur</h1>
          <p className="text-gray-500 mt-2 text-sm">Proje yönetimine hemen başla.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Ad Soyad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="text" 
                {...register('full_name', { required: "Ad soyad zorunludur" })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                placeholder="Örn: Mert Yılmaz" 
              />
              {errors.full_name && <span className="text-xs text-red-500">{errors.full_name.message}</span>}
            </div>
          </div>

          {/* E-posta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="email" 
                {...register('email', { required: "E-posta zorunludur", pattern: /^\S+@\S+$/i })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                placeholder="ornek@sirket.com" 
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
            </div>
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="password" 
                {...register('password', { required: "Şifre zorunludur", minLength: 6 })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                placeholder="••••••••" 
              />
              {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
            </div>
          </div>

          <button 
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all mt-6 shadow-lg shadow-blue-200 disabled:bg-blue-300"
          >
            {mutation.isPending ? 'Kaydediliyor...' : <>Kayıt Ol <ArrowRight size={18} /></>}
          </button>
        </form>

        {/* Alt Link */}
        <p className="text-center mt-6 text-gray-600 text-sm">
          Zaten hesabın var mı?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;