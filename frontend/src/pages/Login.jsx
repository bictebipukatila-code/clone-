import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // Facebook's exact native font stack
  const fbFontStyle = {
    fontFamily: 'SFProText-Regular, Helvetica, Arial, sans-serif'
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-blue-100" style={fbFontStyle}>
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1440px] mx-auto">
        
        {/* ================= LEFT SIDE ================= */}
        <div className="hidden lg:flex flex-1 flex-col justify-between p-10 xl:p-14 border-r border-[#e4e6eb] min-h-[640px]">
          
          {/* Top Left Facebook Icon */}
          <div>
            <svg className="w-[52px] h-[52px] text-[#0866FF]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>

          {/* HERO CONTENT */}
          <div className="flex items-center justify-between w-full max-w-[720px] mx-auto my-auto relative pr-2">

            {/* LEFT SIDE - Typography */}
            <div className="z-10 flex-1">
              <h1 className="text-[65px] xl:text-[px] font-bold text-[#1c1e21] leading-[1.0] tracking-[-0.02em]"><br></br><br></br><br></br><br></br>
                Explore <br />
                the <br />
                things <br />
                <span className="text-[#0866FF]">you love.</span>
              </h1>
            </div>

            {/* RIGHT SIDE - Collage Graphic */}
            <div className="w-[250px] xl:w-[350px] flex-shrink-0 relative -top-4 -ml-10 z-10">
              <img
                src="/facebook-hero.png"
                alt="Facebook Collages"
                className="w-full object-contain select-none pointer-events-none drop-shadow-sm"
              />
            </div>

          </div>

          <div className="h-2"></div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex-1 flex flex-col items-center lg:items-start justify-center p-6 lg:p-12 lg:pl-14">
          
          {/* Mobile Logo */}
          <div className="lg:hidden mb-6">
            <svg className="w-12 h-12 text-[#0866FF]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>

          {/* Form Section */}
          <div className="w-full max-w-[600px]">
            
            <h2 className="text-[20px] font-bold text-[#1c1e21] mb-6 tracking-tight">
              Log into Facebook
            </h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
              
              {/* Floating Label Email Input */}
              <div className="relative w-full">
                <input
                  id="email"
                  type="text"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full h-[56px] pt-4 pb-1 px-4 rounded-[14px] border border-[#d8dadf] bg-white text-[15px] text-[#1c1e21] outline-none focus:border-[#0866FF] transition-colors"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-4 text-[#8a8d91] text-[15px] transition-all duration-200 pointer-events-none origin-[0]
                    peer-focus:-translate-y-2.5 peer-focus:scale-[0.80] peer-focus:text-[#0866FF]
                    peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[0.80]"
                >
                  Email or mobile number
                </label>
              </div>

              {/* Floating Label Password Input */}
              <div className="relative w-full">
                <input
                  id="password"
                  type="password"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full h-[56px] pt-4 pb-1 px-4 rounded-[14px] border border-[#d8dadf] bg-white text-[15px] text-[#1c1e21] outline-none focus:border-[#0866FF] transition-colors"
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-4 text-[#8a8d91] text-[15px] transition-all duration-200 pointer-events-none origin-[0]
                    peer-focus:-translate-y-2.5 peer-focus:scale-[0.80] peer-focus:text-[#0866FF]
                    peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[0.80]"
                >
                  Password
                </label>
              </div>

              {error && (
                <p className="text-[13px] text-red-500 font-medium px-1">{error}</p>
              )}

              <button
                type="submit"
                className="w-full h-[50px] mt-1 rounded-full bg-[#0866FF] hover:bg-[#0055be] text-white text-[16px] font-semibold transition-colors shadow-sm"
              >
                Log in
              </button>

              <div className="text-center pt-2 pb-4">
                <a 
                  href="#" 
                  className="text-[14px] text-[#1c1e21] hover:underline font-semibold"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="button"
                onClick={() => navigate('/register')}
                className="w-full h-[48px] rounded-full border border-[#0866FF] text-[#0866FF] text-[15px] font-semibold hover:bg-blue-50/50 transition-colors"
              >
                Create new account
              </button>

              <div className="flex items-center justify-center gap-1.5 pt-8 text-[#0866FF]">
                <svg className="w-4 h-4" viewBox="0 0 24 16" fill="currentColor">
                  <path d="M16.5 2C14.3 2 12.6 3.3 12 4.9 11.4 3.3 9.7 2 7.5 2 4.5 2 2 4.5 2 7.5S4.5 13 7.5 13c2.2 0 3.9-1.3 4.5-2.9.6 1.6 2.3 2.9 4.5 2.9 3 0 5.5-2.5 5.5-5.5S19.5 2 16.5 2zm-9 9C5.6 11 4 9.4 4 7.5S5.6 4 7.5 4 11 5.6 11 7.5 9.4 11 7.5 11zm9 0c-1.9 0-3.5-1.6-3.5-3.5S14.6 4 16.5 4 20 5.6 20 7.5 18.4 11 16.5 11z"/>
                </svg>
                <span className="text-[#1c1e21] font-bold text-[14px]">Meta</span>
              </div>

            </form>
          </div>

        </div>

      </div>

      {/* FOOTER (EXACT FACEBOOK FOOTER TYPOGRAPHY) */}
      <footer className="w-full border-t border-[#e4e6eb] pt-[20px] pb-[28px] px-4 lg:px-8 text-[12px] leading-[1.34] text-[#8a8d91]">
        <div className="max-w-[980px] mx-auto flex flex-col gap-[8px]">
          
          {/* Languages Row */}
          <div className="flex flex-wrap items-center gap-x-[12px] gap-y-[4px]">
            <span className="text-[#737373] cursor-default">English (US)</span>
            <a href="#" className="hover:underline text-[#8a8d91]">नेपाली</a>
            <a href="#" className="hover:underline text-[#8a8d91]">हिन्दी</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Español</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Português (Brasil)</a>
            <a href="#" className="hover:underline text-[#8a8d91]">日本語</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Français (France)</a>
            <a href="#" className="hover:underline text-[#737373] bg-[#f5f6f7] border border-[#ccd0d5] px-2 py-0.5 rounded-[2px] font-bold text-[11px]">+</a>
          </div>

          <div className="border-t border-[#dddfe2] my-[2px]" />

          {/* Main Links Row 1 */}
          <div className="flex flex-wrap items-center gap-x-[12px] gap-y-[3px]">
            <a href="#" className="hover:underline text-[#8a8d91]">Sign Up</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Log In</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Messenger</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Facebook Lite</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Video</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Meta Pay</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Meta Store</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Meta Quest</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Ray-Ban Meta</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Meta AI</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Instagram</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Threads</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Privacy Policy</a>
          </div>

          {/* Main Links Row 2 */}
          <div className="flex flex-wrap items-center gap-x-[12px] gap-y-[3px]">
            <a href="#" className="hover:underline text-[#8a8d91]">Privacy Center</a>
            <a href="#" className="hover:underline text-[#8a8d91]">About</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Create ad</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Create Page</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Developers</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Careers</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Cookies</a>
            <a href="#" className="hover:underline text-[#8a8d91] inline-flex items-center gap-1">
              Ad choices 
              <span className="text-[8px] leading-none border border-[#8a8d91] rounded-[1px] px-[2px] py-[1px]">►</span>
            </a>
            <a href="#" className="hover:underline text-[#8a8d91]">Terms</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Help</a>
            <a href="#" className="hover:underline text-[#8a8d91]">Contact Uploading & Non-Users</a>
          </div>

          {/* Copyright */}
          <div className="mt-[12px] text-[11px] text-[#737373]">
            Meta © 2026
          </div>

        </div>
      </footer>

    </div>
  );
}