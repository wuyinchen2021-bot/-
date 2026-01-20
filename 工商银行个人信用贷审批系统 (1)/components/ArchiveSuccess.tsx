
import React, { useState, useRef } from 'react';

interface ArchiveSuccessProps {
  onReset: () => void;
  onGoHome: () => void;
}

const ArchiveSuccess: React.FC<ArchiveSuccessProps> = ({ onReset, onGoHome }) => {
  const archiveId = `ARC-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
  const timestamp = new Date().toLocaleString();
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-700">
      <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl border border-gray-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
          <svg className="w-64 h-64 text-icbc-red" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>

        <div className="relative z-10 text-center">
          <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100 shadow-inner">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-4xl font-[1000] text-icbc-text tracking-tighter uppercase italic mb-2">Archive Completed</h2>
          <p className="text-[10px] font-black text-icbc-muted uppercase tracking-[0.4em] mb-8">审批卷宗已成功加密归档</p>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8 text-left space-y-4">
             <div className="flex justify-between items-center border-b border-gray-200/50 pb-3">
                <span className="text-[10px] font-black text-icbc-muted uppercase tracking-widest">Archive Reference ID</span>
                <span className="text-sm font-mono font-bold text-icbc-text">{archiveId}</span>
             </div>
             <div className="flex justify-between items-center border-b border-gray-200/50 pb-3">
                <span className="text-[10px] font-black text-icbc-muted uppercase tracking-widest">Filing Timestamp</span>
                <span className="text-sm font-bold text-icbc-text">{timestamp}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-icbc-muted uppercase tracking-widest">Status</span>
                <span className="text-[10px] font-black text-green-600 bg-green-100 px-3 py-1 rounded-full uppercase">Permanent_Storage</span>
             </div>
          </div>

          <div className="mb-10 text-left">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-xs font-black text-icbc-text uppercase tracking-widest">Final Photo Evidence</h3>
                <p className="text-[9px] text-icbc-muted font-bold uppercase tracking-tight">归档影像终存 (可选)</p>
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-[10px] font-black text-icbc-red uppercase hover:underline decoration-2 underline-offset-4"
              >
                Upload Photo / 增加照片
              </button>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*" 
              multiple 
            />

            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-xl border border-gray-200 overflow-hidden bg-gray-50 shadow-sm transition-transform hover:scale-105">
                  <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                </div>
              ))}
              {images.length < 4 && (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 hover:border-icbc-red hover:text-icbc-red cursor-pointer transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-10">
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={onReset}
                className="w-full h-20 bg-icbc-red text-white rounded-[1.5rem] font-[1000] text-xl uppercase italic shadow-[0_15px_30px_rgba(199,0,11,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
              >
                <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Initiate New Application / 重新录入</span>
              </button>

              <button 
                onClick={onGoHome}
                className="w-full h-14 bg-gray-900 text-white rounded-[1rem] font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-black transition-all flex items-center justify-center gap-3 group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Portal Home / 返回主页
              </button>
            </div>
          </div>

          <p className="mt-10 text-[8px] font-bold text-gray-300 uppercase tracking-[0.2em] text-center">
            Industrial and Commercial Bank of China - Security Division | V4.5-FINAL
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArchiveSuccess;
