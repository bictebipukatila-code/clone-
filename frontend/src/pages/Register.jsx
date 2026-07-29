import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axios';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

export default function Register() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '',
    birthMonth: '', birthDay: '', birthYear: '', gender: '',
  });
  const [touched, setTouched] = useState({ name: false, password: false });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleBlur = (field) => setTouched({ ...touched, [field]: true });

  const nameInvalid = touched.name && (!form.firstName.trim() || !form.lastName.trim());
  const passwordInvalid = touched.password && form.password.length > 0 && form.password.length < 6;

  const inputBase = "w-full border rounded-lg px-4 py-3.5 text-base placeholder-gray-500 focus:outline-none focus:ring-1";
  const normalBorder = "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
  const errorBorder = "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTouched({ name: true, password: true });
    if (!form.firstName.trim() || !form.lastName.trim() || form.password.length < 6) return;

    try {
      const res = await api.post('/auth/register', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      localStorage.setItem('token', res.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center py-8 px-4">
    <div className="w-full max-w-[448px]">

        <button onClick={() => navigate('/')} className="text-gray-800 text-3xl mb-5 block">
          &larr;
        </button>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-blue-600 text-4xl font-bold">&#8734;</span>
          <span className="text-3xl text-gray-900">Meta</span>
        </div>

        <h1 className="text-[32px] leading-[1.2] font-bold text-gray-900 mb-3">
          Get started on Facebook with a Meta Account
        </h1>
        <p className="text-base text-gray-600 mb-7">
          A Meta Account lets you access multiple Meta technologies, like Facebook, easily and securely.
        </p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

          <div>
            <label className="font-semibold text-lg text-gray-900">Name</label>
            <div className="flex gap-3 mt-2">
              <input name="firstName" placeholder="First name" value={form.firstName}
                onChange={handleChange} onBlur={() => handleBlur('name')}
                className={`flex-1 ${inputBase} ${nameInvalid ? errorBorder : normalBorder}`} />
              <input name="lastName" placeholder="Last name" value={form.lastName}
                onChange={handleChange} onBlur={() => handleBlur('name')}
                className={`flex-1 ${inputBase} ${nameInvalid ? errorBorder : normalBorder}`} />
            </div>
            {nameInvalid && (
              <p className="text-red-600 text-sm mt-2">What's your name?</p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <label className="font-semibold text-lg text-gray-900">Birthday</label>
              <span className="text-gray-500 border border-gray-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">?</span>
            </div>
            <div className="flex gap-3 mt-2">
              <select name="birthMonth" onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-3.5 text-base text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Month</option>
                {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
              <select name="birthDay" onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-3.5 text-base text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Day</option>
                {days.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select name="birthYear" onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-3.5 text-base text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Year</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <label className="font-semibold text-lg text-gray-900">Gender</label>
              <span className="text-gray-500 border border-gray-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">?</span>
            </div>
            <select name="gender" onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-3.5 text-base text-gray-600 mt-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option value="">Select your gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-lg text-gray-900">Mobile number or email</label>
            <input name="email" type="email" placeholder="Mobile number or email" value={form.email}
              onChange={handleChange}
              className={`${inputBase} ${normalBorder} mt-2`} />
          </div>

          <p className="text-sm text-gray-600 -mt-3">
            You may receive notifications from us.{' '}
            <a href="#" className="text-blue-600">Learn why we ask for your contact information</a>
          </p>

          <div>
            <label className="font-semibold text-lg text-gray-900">Password</label>
            <input name="password" type="password" placeholder="Password" value={form.password}
              onChange={handleChange} onBlur={() => handleBlur('password')}
              className={`${inputBase} ${passwordInvalid ? errorBorder : normalBorder} mt-2`} />
            {passwordInvalid && (
              <p className="text-red-600 text-sm mt-2 flex items-start gap-2">
                <span className="border border-red-600 rounded-full w-4 h-4 flex items-center justify-center text-[10px] mt-0.5 shrink-0">!</span>
                Enter a combination of at least six numbers, letters and punctuation marks (like ! and &amp;).
              </p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <p className="text-sm text-gray-600">
            People who use our service may have uploaded your contact information to Facebook.{' '}
            <a href="#" className="text-blue-600 font-semibold">Learn more</a>.
          </p>

          <p className="text-sm text-gray-600">
            By tapping Submit, you agree to create an account and to Facebook's{' '}
            <a href="#" className="text-blue-600 font-semibold">Terms</a>,{' '}
            <a href="#" className="text-blue-600 font-semibold">Privacy Policy</a> and{' '}
            <a href="#" className="text-blue-600 font-semibold">Cookies Policy</a>.
          </p>

          <p className="text-sm text-gray-600">
            The <a href="#" className="text-blue-600 font-semibold">Privacy Policy</a> describes the ways we can use the information we collect when you create an account. For example, we use this information to provide, personalize and improve our products, including ads.
          </p>

          <button type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3.5 text-lg">
            Submit
          </button>

          <button type="button" onClick={() => navigate('/')}
            className="border border-gray-300 text-gray-900 font-semibold rounded-lg py-3.5 text-lg">
            I already have an account
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500 space-y-3">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <a href="#">English (US)</a><a href="#">नेपाली</a><a href="#">हिन्दी</a>
            <a href="#">Español</a><a href="#">Português (Brasil)</a><a href="#">日本語</a>
            <a href="#">Français (France)</a><a href="#">More languages...</a>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <a href="#">Sign Up</a><a href="#">Log In</a><a href="#">Messenger</a>
            <a href="#">Facebook Lite</a><a href="#">Video</a><a href="#">Meta Pay</a>
            <a href="#">Meta Store</a><a href="#">Meta Quest</a><a href="#">Ray-Ban Meta</a>
            <a href="#">Meta AI</a><a href="#">Instagram</a><a href="#">Threads</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <a href="#">Privacy Center</a><a href="#">About</a><a href="#">Create ad</a>
            <a href="#">Create Page</a><a href="#">Developers</a><a href="#">Careers</a>
            <a href="#">Cookies</a><a href="#">Ad choices</a><a href="#">Terms</a>
            <a href="#">Help</a><a href="#">Contact Uploading &amp; Non-Users</a>
          </div>
          <p>Meta &copy; 2026</p>
        </div>

      </div>
    </div>
  );
}