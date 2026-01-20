
import React, { useState } from 'react';
import { CustomerData, UnitLevel } from '../types';

interface CreditFormProps {
  onSubmit: (data: CustomerData) => void;
}

const CreditForm: React.FC<CreditFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CustomerData>({
    name: '',
    idCard: '',
    phone: '',
    relativePhone: '',
    fundBase: 12000,
    unitLevel: UnitLevel.B1,
    tenure: '3-6年',
    hasProperty: true,
    spouseInformed: true,
    purpose: '家庭装修',
    product: 'TR456 (工银融e借)',
    appliedAmount: '10万 - 20万'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.idCard.length !== 18) {
      alert("系统提示：身份证号码不符合规范 | National ID must be 18 digits.");
      return;
    }
    onSubmit(formData);
  };

  const InputLabel = ({ zh, en }: { zh: string, en: string }) => (
    <div className="flex flex-col mb-3">
      <span className="text-[11px] font-[900] text-icbc-text uppercase tracking-tight leading-none mb-1">{zh}</span>
      <span className="text-[8px] font-bold text-icbc-muted uppercase tracking-[0.2em] opacity-50 leading-none">{en}</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-icbc-red w-2 h-10 rounded-full shadow-lg shadow-red-200"></div>
        <div>
          <h2 className="text-3xl font-[1000] text-icbc-text tracking-tighter uppercase italic">Comprehensive Entry</h2>
          <p className="text-[10px] font-black text-icbc-muted uppercase tracking-[0.3em]">数字化信贷综测评录入终端</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-100/50 overflow-hidden">
          <div className="bg-gray-50/80 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
             <span className="text-xs font-black text-icbc-muted uppercase tracking-widest flex items-center gap-2">
                <svg className="w-4 h-4 text-icbc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Identity Verification Records
             </span>
             <span className="text-[9px] font-mono text-gray-300">SEC_ID_001</span>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <InputLabel zh="客户姓名" en="Legal Name" />
              <input 
                name="name" value={formData.name} onChange={handleChange}
                placeholder="ENTRY NAME" 
                className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-5 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-icbc-red/5 focus:bg-white transition-all text-icbc-text uppercase placeholder:text-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <InputLabel zh="身份证件号" en="National ID" />
              <input 
                name="idCard" value={formData.idCard} onChange={handleChange} maxLength={18}
                placeholder="000000 00000000 000X" 
                className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-5 font-mono font-bold text-lg focus:outline-none focus:ring-4 focus:ring-icbc-red/5 focus:bg-white transition-all tracking-widest placeholder:text-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <InputLabel zh="本人手机号" en="Primary Mobile" />
              <input 
                name="phone" value={formData.phone} onChange={handleChange} maxLength={11}
                placeholder="+86" 
                className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-5 font-mono font-bold text-lg focus:outline-none focus:ring-4 focus:ring-icbc-red/5 focus:bg-white transition-all placeholder:text-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <InputLabel zh="直系亲属联系方式" en="Emergency Relative" />
              <input 
                name="relativePhone" value={formData.relativePhone} onChange={handleChange} maxLength={11}
                placeholder="REQUIRED" 
                className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-5 font-mono font-bold text-lg focus:outline-none focus:ring-4 focus:ring-icbc-red/5 focus:bg-white transition-all placeholder:text-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-100/50 overflow-hidden">
          <div className="bg-gray-50/80 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
             <span className="text-xs font-black text-icbc-muted uppercase tracking-widest flex items-center gap-2">
                <svg className="w-4 h-4 text-icbc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Financial & Employment Matrix
             </span>
             <span className="text-[9px] font-mono text-gray-300">FIN_MTX_X2</span>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-start">
              <div className="flex flex-col">
                <InputLabel zh="公积金缴纳基数" en="Housing Fund Base" />
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-300 pointer-events-none">¥</span>
                   <input 
                     type="number" name="fundBase" value={formData.fundBase} onChange={handleChange}
                     className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-5 font-black text-xl text-icbc-red focus:outline-none focus:ring-4 focus:ring-icbc-red/5 focus:bg-white transition-all"
                   />
                </div>
              </div>
              <div className="flex flex-col">
                <InputLabel zh="现单位性质/等级" en="Unit Classification" />
                <div className="relative group">
                  <select 
                    name="unitLevel" value={formData.unitLevel} onChange={handleChange}
                    className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-5 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-icbc-red/5 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    {Object.values(UnitLevel).map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-icbc-red transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <InputLabel zh="现职服务期限" en="Service Tenure" />
                <div className="relative group">
                  <select 
                    name="tenure" value={formData.tenure} onChange={handleChange}
                    className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-5 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-icbc-red/5 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option>1-3年</option><option>3-6年</option><option>6-10年</option><option>10年以上</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-icbc-red transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50/50 p-6 rounded-2xl border border-dashed border-gray-200">
                <div className="mb-4">
                  <span className="text-[11px] font-[900] text-icbc-text uppercase tracking-tight block">意向产品 & 额度</span>
                  <span className="text-[8px] font-bold text-icbc-muted uppercase tracking-[0.2em] opacity-50 block">Product & Amount</span>
                </div>
                <div className="space-y-4">
                   <div className="relative group">
                    <select name="product" value={formData.product} onChange={handleChange} className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-bold text-xs uppercase appearance-none cursor-pointer">
                        <option>TR456 (工银融e借)</option>
                        <option>BTR005896 (工银精英贷)</option>
                        <option>PRD991-K (工银经营快贷)</option>
                        <option>TAX-2024 (工银税务贷)</option>
                        <option>ST-002 (工银薪金贷)</option>
                        <option>MOR-771 (工银房产抵押贷)</option>
                        <option>EDU-303 (工银学子e贷)</option>
                        <option>CORP-505 (工银企业直连贷)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 group-hover:text-icbc-red">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                   </div>
                   <div className="relative group">
                    <select name="appliedAmount" value={formData.appliedAmount} onChange={handleChange} className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-black text-sm text-icbc-red appearance-none cursor-pointer">
                        <option>10万 - 20万</option><option>20万 - 50万</option><option>50万 - 80万</option><option>100万</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-icbc-red/40 group-hover:text-icbc-red">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                   </div>
                </div>
              </div>
              <div className="bg-gray-50/50 p-6 rounded-2xl border border-dashed border-gray-200">
                <div className="mb-4">
                  <span className="text-[11px] font-[900] text-icbc-text uppercase tracking-tight block">资产及合规项</span>
                  <span className="text-[8px] font-bold text-icbc-muted uppercase tracking-[0.2em] opacity-50 block">Assets & Compliance</span>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100">
                      <span className="text-[10px] font-black uppercase text-icbc-muted">名下住宅资产</span>
                      <select onChange={e => setFormData(p=>({...p, hasProperty: e.target.value === 'true'}))} className="text-[10px] font-black text-icbc-red outline-none bg-transparent cursor-pointer"><option value="true">具备 VALID</option><option value="false">无 NONE</option></select>
                   </div>
                   <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100">
                      <span className="text-[10px] font-black uppercase text-icbc-muted">配偶授权确认</span>
                      <select onChange={e => setFormData(p=>({...p, spouseInformed: e.target.value === 'true'}))} className="text-[10px] font-black text-icbc-red outline-none bg-transparent cursor-pointer"><option value="true">已获得 AUTHORIZED</option><option value="false">未获得 NO</option></select>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit" 
            className="w-full h-24 bg-gradient-to-r from-icbc-red to-icbc-darkRed text-white rounded-[2rem] shadow-[0_20px_40px_rgba(199,0,11,0.25)] flex flex-col items-center justify-center hover:scale-[1.01] transition-all active:scale-[0.98] group"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-[1000] tracking-tight uppercase italic">Initiate Risk Audit</span>
              <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
            <span className="text-[10px] font-black opacity-60 uppercase tracking-[0.5em] mt-1">提交智能风控决策引擎</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreditForm;
