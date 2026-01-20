
import React from 'react';

const ICBCLogo = ({ size = 32, className }: { size?: number, className?: string }) => (
  <svg width={size * 2.8} height={size} viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg" className={className}>
    <text x="0" y="32" fontFamily="Arial Black" fontWeight="900" fontSize="34" fill="#C7000B" letterSpacing="-2">ICBC</text>
  </svg>
);

interface LayoutProps {
  children: React.ReactNode;
  hideWatermark?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideWatermark = false }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      {!hideWatermark && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-[9999] overflow-hidden select-none opacity-[0.03]">
          <div className="flex flex-col items-center justify-center text-icbc-red">
            <span className="text-[22vw] font-[900] leading-none tracking-tighter">ICBC</span>
            <span className="text-[3vw] font-bold tracking-[2em] ml-[2em] mt-[-2vw]">内部合规系统专用</span>
          </div>
        </div>
      )}

      <header className="glass h-18 flex items-center justify-between px-10 border-b-2 border-icbc-red/20 shadow-sm sticky top-0 z-50">
        <div className="flex items-center">
          <ICBCLogo size={34} />
          <div className="h-8 w-[2px] bg-gray-200 mx-6"></div>
          <div>
            <h1 className="text-lg font-black text-icbc-text tracking-tight uppercase">Smart Credit Portal</h1>
            <div className="flex items-center gap-2 mt-[-2px]">
              <span className="text-[10px] text-icbc-muted font-bold tracking-widest uppercase">智能信用贷款审批中枢</span>
              <span className="text-[8px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-black">v4.0 PRO</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] text-icbc-muted font-black uppercase tracking-widest">Operator Node</span>
              <span className="text-xs font-mono font-bold">NODE_0228_HQ</span>
           </div>
           <div className="bg-red-50/50 border border-red-100 px-4 py-1.5 rounded-full flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-icbc-red"></span>
              </span>
              <span className="text-[10px] font-black text-icbc-red uppercase tracking-wider">Secure Connection Active</span>
           </div>
        </div>
      </header>

      <main className="flex-grow p-6 md:p-12 max-w-6xl mx-auto w-full transition-all duration-700 relative z-10">
        {children}
      </main>

      <footer className="glass p-8 border-t border-gray-200 text-center">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <div className="text-[10px] font-black text-icbc-text uppercase tracking-widest">© Industrial and Commercial Bank of China Limited</div>
            <div className="text-[9px] text-icbc-muted mt-1">Data transmission is encrypted via AES-256 standard protocols.</div>
          </div>
          <div className="flex gap-6 text-[9px] font-black text-icbc-muted uppercase tracking-tighter">
            <span>Security Policy</span>
            <span>Internal Audit</span>
            <span>System Logs</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
