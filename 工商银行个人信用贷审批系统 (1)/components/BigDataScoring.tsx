
import React, { useState, useEffect } from 'react';

interface BigDataScoringProps {
  onContinue: () => void;
}

const BigDataScoring: React.FC<BigDataScoringProps> = ({ onContinue }) => {
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 10000; // 10 seconds
    const interval = 100;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        const randomScore = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
        setScore(randomScore);
        setLoading(false);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // 优化参数：半径设为 80，viewBox 设为 200x200，留出足够空间给 stroke-linecap
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white rounded-2xl p-10 shadow-2xl border border-icbc-border text-center max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-icbc-text leading-tight">个人大数据授信评分</h2>
        <p className="text-[10px] text-icbc-muted font-bold uppercase tracking-widest mt-0.5">Personal Big Data Credit Scoring</p>
        <p className="text-sm text-icbc-muted mt-3">正在接入第三方征信、反欺诈引擎及多维社交数据矩阵...</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
            <svg 
              className="w-full h-full transform -rotate-90 overflow-visible"
              viewBox="0 0 200 200"
            >
              {/* 背景底圆 */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-100"
              />
              {/* 动态进度圆环 */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (circumference * progress) / 100}
                className="text-icbc-red transition-all duration-300 ease-linear"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-icbc-text">{Math.round(progress)}%</span>
              <span className="text-[10px] text-icbc-muted font-bold tracking-widest uppercase mt-1">Calculating</span>
            </div>
          </div>
          <div className="space-y-3 w-full max-w-xs">
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-icbc-red transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-gray-400 font-mono animate-pulse uppercase">
              {progress < 30 && ">> Init Data Interface..."}
              {progress >= 30 && progress < 60 && ">> Multi-platform Check..."}
              {progress >= 60 && progress < 90 && ">> Profile Generation..."}
              {progress >= 90 && ">> Aggregating Score..."}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-6 animate-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block p-1 rounded-full bg-green-50 mb-4">
            <div className="px-6 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold border border-green-200">
              评分生成成功 | Score Generated
            </div>
          </div>
          
          <div className="relative mb-8">
             <div className="text-8xl font-black text-icbc-text tracking-tighter drop-shadow-sm">
                {score}
             </div>
             <div className="text-[11px] font-bold text-icbc-muted mt-2 tracking-widest uppercase flex flex-col items-center">
                <span>大数据综合评分结果</span>
                <span className="opacity-60 text-[9px]">Big Data Composite Score</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10 text-left">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex justify-between items-center mb-1">
                 <span className="text-[10px] text-gray-400 font-bold uppercase">信用等级</span>
                 <span className="text-[8px] text-gray-300 font-bold uppercase">Rank</span>
              </div>
              <span className="text-sm font-bold text-icbc-text">
                {score && score > 450 ? 'AAA 级 (极好)' : score && score > 380 ? 'AA 级 (良好)' : 'A 级 (正常)'}
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex justify-between items-center mb-1">
                 <span className="text-[10px] text-gray-400 font-bold uppercase">违约风险预估</span>
                 <span className="text-[8px] text-gray-300 font-bold uppercase">Risk</span>
              </div>
              <span className="text-sm font-bold text-icbc-text">
                {score && score > 450 ? '低于 0.05%' : '约 0.12% - 0.5%'}
              </span>
            </div>
          </div>

          <button 
            onClick={onContinue}
            className="w-full h-18 bg-icbc-red text-white rounded-xl font-bold text-xl hover:bg-icbc-darkRed transition-all shadow-xl active:scale-[0.98] flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-3">
               继续进入核心智能审批
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
               </svg>
            </div>
            <span className="text-xs font-normal opacity-70 uppercase tracking-widest mt-1">Continue to Core Approval</span>
          </button>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-100">
         <p className="text-[10px] text-gray-400 leading-relaxed uppercase">
           Score based on housing fund, social security, and e-commerce data. For internal reference only.
         </p>
      </div>
    </div>
  );
};

export default BigDataScoring;
