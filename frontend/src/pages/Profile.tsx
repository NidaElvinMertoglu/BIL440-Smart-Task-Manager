import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [firstName, lastName] = user?.full_name ? user.full_name.split(' ') : ['', ''];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profil Ayarları</h1>
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ad
            </label>
            <p className="mt-1 text-lg text-gray-900">{firstName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Soyad
            </label>
            <p className="mt-1 text-lg text-gray-900">{lastName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;