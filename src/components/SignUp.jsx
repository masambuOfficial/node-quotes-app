import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [form, setForm] = useState({ username: '', password: '', email: '', role: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/signup', form); // Adjust the URL as needed
      alert('User created successfully!');
    } catch (error) {
      setError('Error occurred while creating user');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900">Sign Up</h2>
        {error && <div className="text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
