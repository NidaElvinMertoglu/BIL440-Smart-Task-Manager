import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Giriş Yap</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-posta</label>
            <input type="email" className="w-full border rounded-lg px-3 py-2 mt-1" placeholder="admin@test.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Şifre</label>
            <input type="password" className="w-full border rounded-lg px-3 py-2 mt-1" placeholder="******" />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700">
            Giriş Yap
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