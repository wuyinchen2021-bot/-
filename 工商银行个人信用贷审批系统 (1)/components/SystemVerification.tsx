
import React, { useState, useEffect } from 'react';

interface SystemVerificationProps {
  onComplete: () => void;
}

type VerifyStage = 'tax' | 'fund' | 'social';

const SystemVerification: React.FC<SystemVerificationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<VerifyStage>('tax');
  const [progress, setProgress] = useState(0);
  const [completedStages, setCompletedStages] = useState<VerifyStage[]>([]);

  useEffect(() => {
    const duration = 5000; // 每个环节 5 秒
    const interval = 50;
    const totalSteps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / totalSteps) * 100);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        if (stage === 'tax') { setCompletedStages(p => [...p, 'tax']); setStage('fund'); setProgress(0); }
        else if (stage === 'fund') { setCompletedStages(p => [...p, 'fund']); setStage('social'); setProgress(0); }
        else if (stage === 'social') { setCompletedStages(p => [...p, 'social']); setTimeout(onComplete, 800); }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [stage, onComplete]);

  const stages = [
    { id: 'tax', label: '国家税务系统直连核查', en: 'Tax Compliance Audit' },
    { id: 'fund', label: '省级公积金中心数据同步', en: 'Housing Fund Sync' },
    { id: 'social', label: '人社部社保指纹校验', en: 'Social Security Audit' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto animate-in zoom-in-95 duration-700">
      <div className="bg-white rounded-[3rem] p-12 border border-gray-200 shadow-2xl relative overflow-hidden">
        <div className="scan-line"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-12">
             <div className="bg-icbc-red/10 p-4 rounded-2xl">
                <svg className="w-10 h-10 text-icbc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
             </div>
             <div className="text-right">
                <h3 className="text-2xl font-black text-icbc-text tracking-tighter uppercase">Audit Protocol</h3>
                <p className="text-[10px] font-black text-icbc-muted uppercase tracking-[0.2em]">跨部门合规数据核查</p>
             </div>
          </div>

          <div className="space-y-6">
            {stages.map((s, idx) => {
              const isDone = completedStages.includes(s.id as VerifyStage);
              const isCurrent = stage === s.id;
              return (
                <div key={s.id} className={`p-6 rounded-2xl border transition-all duration-500 ${isCurrent ? 'bg-red-50/50 border-icbc-red shadow-lg shadow-red-100' : isDone ? 'bg-green-50/50 border-green-200 opacity-80' : 'bg-gray-50 border-gray-100 opacity-40'}`}>
                   <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-sm font-[900] text-icbc-text block">{s.label}</span>
                        <span className="text-[9px] font-black text-icbc-muted uppercase tracking-widest">{s.en}</span>
                      </div>
                      {isDone ? (
                        <span className="bg-green-500 text-white p-1 rounded-full"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span>
                      ) : isCurrent ? (
                        <span className="text-[10px] font-mono font-bold text-icbc-red animate-pulse">{Math.round(progress)}%</span>
                      ) : null}
                   </div>
                   {isCurrent && (
                     <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-icbc-red transition-all duration-100" style={{ width: `${progress}%` }}></div>
                     </div>
                   )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex justify-between items-center text-[10px] font-mono text-gray-300 font-bold uppercase tracking-widest">
             <span>Protocol_v.4.2</span>
             <span>Token: {Math.random().toString(36).substring(7).toUpperCase()}</span>
             <span>Secure_Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemVerification;
