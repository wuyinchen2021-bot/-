
import React, { useState, useEffect } from 'react';

interface ProcessingProps {
  onComplete: () => void;
}

const Processing: React.FC<ProcessingProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className="bg-white rounded-xl p-10 shadow-md border border-icbc-border text-center flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-gray-100 border-t-icbc-red rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-icbc-red">
          {Math.round((15 - timeLeft) / 15 * 100)}%
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-icbc-text">智能风控系统分析中...</h3>
        <p className="text-[10px] text-icbc-muted font-bold uppercase tracking-widest">Intelligent Risk System Analyzing</p>
        <p className="text-sm text-icbc-muted pt-2">正在检索总行征信数据库与社交指纹信息</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-5xl font-black text-icbc-red tracking-tight">
          {timeLeft}s
        </div>
        <span className="text-[10px] font-bold text-gray-300 uppercase">Estimated Finish</span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div 
          className="bg-icbc-red h-full transition-all duration-1000" 
          style={{ width: `${(15 - timeLeft) / 15 * 100}%` }}
        />
      </div>

      <p className="text-xs text-icbc-muted italic opacity-60">
        "基于多维大数据矩阵实时生成信用画像..."
        <span className="block mt-1 font-bold uppercase tracking-tighter">Generating Real-time Credit Profile</span>
      </p>
    </div>
  );
};

export default Processing;
