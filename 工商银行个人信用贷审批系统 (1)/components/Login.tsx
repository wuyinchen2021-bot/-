
import React, { useState } from 'react';

const ICBCLogo = ({ size = 64, className }: { size?: number, className?: string }) => (
  <svg width={size * 2.8} height={size} viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg" className={className}>
    <text 
      x="55" 
      y="32" 
      fontFamily="'Arial Black', 'Helvetica', sans-serif" 
      fontWeight="900" 
      fontSize="38" 
      fill="#C7000B" 
      letterSpacing="-2"
      textAnchor="middle"
    >
      ICBC
    </text>
  </svg>
);

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === '123789' && password === '1237890') {
      onLogin();
    } else {
      setError('用户名或密码错误 | Login Failed: Invalid Credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-2xl p-8 shadow-2xl border border-icbc-border w-full max-w-md animate-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <ICBCLogo size={64} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-icbc-text">内部审批系统登录</h2>
          <p className="text-[10px] text-icbc-muted font-bold uppercase tracking-widest mt-0.5">Internal Approval System Login</p>
          <p className="text-icbc-muted text-xs mt-3">请使用您的员工账号登录以访问敏感数据</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-icbc-muted mb-1 flex justify-between">
              <span>员工登录名</span>
              <span className="text-[10px] opacity-60">Staff ID</span>
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入登录名 / Username" 
              className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-icbc-red transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-icbc-muted mb-1 flex justify-between">
              <span>登录密码</span>
              <span className="text-[10px] opacity-60">Password</span>
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码 / Password" 
              className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-icbc-red transition-all"
            />
          </div>

          {error && <p className="text-icbc-red text-[11px] font-bold text-center bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>}

          <button 
            type="submit" 
            className="w-full h-14 bg-icbc-red text-white rounded-xl font-bold text-lg hover:bg-icbc-darkRed transition-all shadow-lg active:scale-[0.98] flex flex-col items-center justify-center"
          >
            <span>安全登录</span>
            <span className="text-[9px] font-normal opacity-80 uppercase tracking-tighter">Secure Sign In</span>
          </button>
        </form>
        <div className="mt-8 text-center text-[10px] text-icbc-muted uppercase tracking-[0.2em] font-bold opacity-50">
          Industrial and Commercial Bank of China
        </div>
      </div>
    </div>
  );
};

export default Login;
