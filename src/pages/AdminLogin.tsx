import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockIcon, UserIcon } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple authentication (in production, this should be handled by a secure backend)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Store auth token in localStorage
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-dark-800 rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400">Sign in to access the admin dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-dark-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-accent-red"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-dark-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-accent-red"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-accent-red text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-red font-medium"
            >
              Sign In
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                ← Back to Website
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-dark-700 rounded-md">
            <p className="text-xs text-gray-500 text-center">
              Demo Credentials:<br/>
              Username: <span className="text-gray-400">admin</span><br/>
              Password: <span className="text-gray-400">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;