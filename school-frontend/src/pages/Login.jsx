

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiPhone, FiLoader } from 'react-icons/fi';
import axios from 'axios';
import { API_BASE_URL } from '../../config'; // ya './config' agar same folder mein hai
export default function Login({ setAuthorizedUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', phoneNumber: '' });
  const navigate = useNavigate();

  // ✅ 1. JO EMAILS SIDEBAR DEKH SAKTEN HAIN WOH LIST
  const ADMIN_EMAILS = [
    "hafizjunaid971@gmail.com",
    "fouziamalik@gmail.com",
    "nomankhan@gmail.com",
    "salmanapwa@gmail.com",
    "imranshaikh@gmail.com",
    "zulfiqarapwa@gmail.com",
    "neelamshokat@gmail.com",
    "farihanaqwi@gmail.com"
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/signup';
    const url = isLogin ? `${API_BASE_URL}/auth/login` : `${API_BASE_URL}/auth/signup`;

    try {
      const res = await axios.post(url, form);
      alert(isLogin ? "Login Successful!" : "Signup Successful!");
      localStorage.setItem('token', res.data.token);
      
      if (isLogin) {
        // ✅ 2. CHECK KAR RAHE HAIN KE KYA YEH EMAIL LIST MEIN HAI?
        if (ADMIN_EMAILS.includes(form.email.toLowerCase().trim())) {
          setAuthorizedUser(form.email); // Sidebar show hoga
        }
        navigate('/'); // Dashboard par jao
      } else {
        setIsLogin(true);
        setForm({ email: '', password: '', phoneNumber: '' });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-600 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        <p className="text-gray-500 text-center mb-8">School Management System</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <FiPhone className="text-gray-400 mr-3" />
              <input type="text" name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} className="bg-transparent w-full outline-none text-gray-700" required />
            </div>
          )}

          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            <FiMail className="text-gray-400 mr-3" />
            <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="bg-transparent w-full outline-none text-gray-700" required />
          </div>

          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            <FiLock className="text-gray-400 mr-3" />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="bg-transparent w-full outline-none text-gray-700" required />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin" /> Processing...
              </>
            ) : (
              isLogin ? 'Login' : 'Sign Up'
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => { setIsLogin(!isLogin); setForm({ email: '', password: '', phoneNumber: '' }); }} className="text-blue-600 font-semibold cursor-pointer hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}