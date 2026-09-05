import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-sm rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            disabled={loading}
            className="bg-primary text-white rounded-md py-2 hover:opacity-90 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
