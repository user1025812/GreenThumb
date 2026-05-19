import { useState } from 'react';
import adminlogo from "../assets/adminLogo.png";
import { NavLink } from 'react-router-dom';

function AdminLogin() {
  const adminData = {
    username: 'Admin',
    password: 'Pa$$w0rd',
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleNavigationCheck = (e) => {
    setError(''); 

    if (!username || !password) {
      e.preventDefault();
      setError('Please fill out all fields.');
      return;
    }

    //this part of the code was made with the assistance of ai 
    if (username === adminData.username && password === adminData.password) {
        // 
    } else {
      e.preventDefault(); 
      setError('Invalid admin username or password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#f8f9fa] adminlogin">
      
      <div className="w-full max-w-md p-8 md:p-10 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 text-2xl font-bold tracking-wide">
            <img 
              src={adminlogo} 
              alt="GreenThumbs" 
              className="h-14 w-auto object-contain -my-8 max-w-[150px]" 
            />
          </div>
          <p className="pt-6 text-xl font-bold text-black tracking-tight">Admin Portal</p>
          <p className="mt-1.5 text-sm text-gray-600">Sign in to manage your dashboard</p>
        </div>

        {error && (
          <div className="p-3.5 mb-6 text-sm text-center border rounded-lg border-red-100 bg-red-50 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label htmlFor="username" className="block mb-2 text-md font-bold tracking-wider text-[#084c32] text-left">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-gray-50/50 border border-gray-200 rounded-lg outline-none transition-all duration-200 focus:bg-white focus:border-[#084c32]"
              placeholder="Enter admin username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-md font-bold tracking-wider text-[#084c32] text-left">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-gray-50/50 border border-gray-200 rounded-lg outline-none transition-all duration-200 focus:bg-white focus:border-[#084c32]"
              placeholder="Enter admin password"
            />
          </div>
         <NavLink to="/faqs" onClick={handleNavigationCheck} className="block w-full mt-4">
            <button
              type="button" 
              className="w-full px-4 py-3.5 font-bold rounded-lg duration-150 tracking-wide shadow-sm bg-[#084c32] text-white hover:bg-green-100 hover:text-black transition-colors"
            >
              LOGIN TO DASHBOARD
            </button>
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;