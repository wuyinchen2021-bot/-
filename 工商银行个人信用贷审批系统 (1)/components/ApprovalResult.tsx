
import React, { useState, useEffect } from 'react';
import { ApprovalResponse } from '../types';

interface ApprovalResultProps {
  result: ApprovalResponse | null;
  customerName?: string;
  idCard?: string;
  onReset: () => void;
  onSupplement: () => void;
}

const GuillochePattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <pattern id="guilloche" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M0 10 Q 5 0, 10 10 T 20 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M0 5 Q 5 15, 10 5 T 20 5" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#guilloche)" />
  </svg>
);

const ApprovalResult: React.FC<ApprovalResultProps> = ({ result, customerName, idCard, onReset, onSupplement }) => {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    if (result) {
      const now = new Date();
      const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      setTimestamp(formatted);
    }
  }, [result]);

  if (!result) return null;

  const isApproved = result.status === 'Approved';

  const maskIdCard = (id?: string) => {
    if (!id || id.length !== 18) return id;
    return `${id.substring(0, 6)}********${id.substring(14)}`;
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-icbc-border animate-in zoom-in-95 duration-700 max-w-2xl mx-auto">
      <div className={`${isApproved ? 'bg-gradient-to-r from-icbc-red to-icbc-darkRed' : 'bg-gradient-to-r from-yellow-500 to-yellow-600'} p-8 text-white text-center relative overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full"><circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" /></svg>
        </div>
        <div className="relative z-10">
            <div className="text-4xl font-black mb-1 tracking-tight">
              {isApproved ? '审批通过' : '人工复核'}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">
              {isApproved ? 'Final Approval Granted' : 'Pending Manual Review'}
            </div>
        </div>
      </div>

      <div className="p-8 relative">
        <div className="absolute top-0 right-8 transform -translate-y-1/2 flex gap-1">
            {[1,2,3].map(i => <div key={i} className="w-1.5 h-6 bg-icbc-red rounded-full shadow-sm"></div>)}
        </div>

        <div className="flex justify-between items-start mb-10 bg-gray-50/50 p-6 rounded-2xl border border-gray-100/50">
          <div>
            <div className="text-[9px] text-icbc-muted font-black uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-icbc-red"></span>
              申请人 / Applicant
            </div>
            <div className="text-2xl font-black text-icbc-text leading-none">{customerName || '未知客户'}</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-icbc-muted font-black uppercase tracking-widest mb-2">
              身份校验 / Verified ID
            </div>
            <div className="text-sm font-mono font-bold text-gray-400 bg-white px-3 py-1 rounded-lg border border-gray-100">
                {maskIdCard(idCard)}
            </div>
          </div>
        </div>

        <div className="relative mb-10 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-icbc-red/20 to-transparent rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-white rounded-[1.5rem] p-10 border border-gray-100 shadow-[0_10px_30px_rgba(199,0,11,0.05)] text-center overflow-hidden">
            <GuillochePattern />
            
            <div className="absolute top-4 right-4 w-24 h-24 opacity-[0.08] pointer-events-none rotate-12">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-icbc-red">
                    <circle cx="50" cy="50" r="45" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="50" cy="50" r="38" strokeWidth="1" />
                    <text x="50" y="45" textAnchor="middle" fontSize="10" fontWeight="bold">ICBC SMART</text>
                    <text x="50" y="60" textAnchor="middle" fontSize="12" fontWeight="black">APPROVED</text>
                </svg>
            </div>

            <div className="relative z-10">
                <div className="flex flex-col items-center mb-4">
                  <div className="text-[10px] font-black text-icbc-muted uppercase tracking-[0.25em]">
                    核定最高授信额度 / Maximum Credit Limit
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-50 border border-red-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-icbc-red"></span>
                    <span className="text-[9px] font-mono font-bold text-icbc-red tracking-wider uppercase">
                      核准完成时间: {timestamp}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="flex flex-col items-end -mb-2">
                        <span className="text-xl font-bold text-icbc-red">RMB</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Currency</span>
                    </div>
                    <div className="text-7xl font-[1000] text-icbc-text tracking-tighter drop-shadow-sm transition-all hover:scale-105 duration-500 cursor-default">
                        {result.amount.toLocaleString('zh-CN')}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-0 border-t border-gray-100 pt-6">
                    <div className="px-2">
                        <div className="text-[8px] text-gray-400 font-black uppercase mb-1">执行利率 / APR</div>
                        <div className="text-xl font-black text-icbc-red">{result.interestRate}</div>
                    </div>
                    <div className="px-2 border-x border-gray-100">
                        <div className="text-[8px] text-gray-400 font-black uppercase mb-1">风险得分 / Score</div>
                        <div className="text-xl font-black text-icbc-text">{result.riskScore}</div>
                    </div>
                    <div className="px-2">
                        <div className="text-[8px] text-gray-400 font-black uppercase mb-1">期限 / Term</div>
                        <div className="text-xl font-black text-icbc-text">60<span className="text-[10px] ml-0.5">M</span></div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="mb-10 p-6 bg-red-50/30 rounded-2xl border border-red-100/50">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-icbc-red" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <h4 className="text-xs font-black text-icbc-red uppercase tracking-widest">审批意见 / Official Opinion</h4>
          </div>
          <p className="text-sm text-gray-500 font-kaiti leading-relaxed font-medium indent-4">
            {result.justification}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={onSupplement}
            className="w-full h-18 bg-icbc-red text-white rounded-2xl font-black text-lg hover:bg-icbc-darkRed transition-all shadow-[0_10px_20px_rgba(199,0,11,0.2)] active:scale-[0.98] flex flex-col items-center justify-center group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="relative z-10 flex items-center gap-3">
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              请补充贷款用途资料
            </div>
            <span className="relative z-10 text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">Supplement Loan Purpose Info</span>
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="h-12 bg-gray-900 text-white rounded-xl font-bold text-xs hover:bg-black transition-all flex items-center justify-center gap-2 uppercase tracking-tighter">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 00-2 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              打印通知 / Print
            </button>
            <button 
              onClick={onReset}
              className="h-12 bg-gray-100 text-gray-500 rounded-xl font-bold text-xs hover:bg-gray-200 transition-all uppercase tracking-tighter"
            >
              返回重录 / Return
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center text-[8px] text-gray-300 font-mono font-bold uppercase tracking-widest">
          <span>{timestamp}</span>
          <span>© ICBC DIGITAL ASSET UNIT</span>
          <span>V4.22-SECURE</span>
        </div>
      </div>
    </div>
  );
};

export default ApprovalResult;
