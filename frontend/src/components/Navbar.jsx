import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiCheckSquare } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 text-primary font-bold text-xl">
        <FiCheckSquare /> Task Manager
      </div>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Hi, {user.name}</span>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
