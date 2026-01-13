import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/authApi';
import type { UserLogin } from '../types/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<UserLogin>();
  const auth = useAuth();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      auth.login(data.access_token);
      alert("Giriş başarılı!");
      navigate('/'); // Dashboard yönet
    },
    onError: (error: any) => {
      alert("Giriş sırasında bir hata oluştu: " + (error.response?.data?.detail || error.message));
    }
  });

  const onSubmit = (data: UserLogin) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Giriş Yap</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-posta</label>
            <input
              type="email"
              {...register('email', { required: "E-posta zorunludur", pattern: /^\S+@\S+$/i })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="admin@test.com"
            />
            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Şifre</label>
            <input
              type="password"
              {...register('password', { required: "Şifre zorunludur", maxLength: 72 })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="******"
            />
            {errors.password && <span className="text-xs text-red-500">{errors.password.message === 'maxLength' ? 'Şifre en fazla 72 karakter olabilir' : errors.password.message}</span>}
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 disabled:bg-blue-300"
          >
            {mutation.isPending ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Hesabın yok mu? <Link to="/register" className="text-blue-600 font-semibold">Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
