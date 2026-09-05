import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await register(name, email, password);
    if (ok) navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-sm rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
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
            placeholder="Password (min 6 characters)"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            disabled={loading}
            className="bg-primary text-white rounded-md py-2 hover:opacity-90 disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
