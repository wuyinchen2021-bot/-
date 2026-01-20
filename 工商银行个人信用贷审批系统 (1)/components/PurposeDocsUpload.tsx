
import React, { useState, useRef } from 'react';

interface PurposeDocsUploadProps {
  purpose: string;
  onComplete: () => void;
  onGoHome: () => void;
}

const PurposeDocsUpload: React.FC<PurposeDocsUploadProps> = ({ purpose, onComplete, onGoHome }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      setTimeout(() => {
        setUploadedFiles(prev => [...prev, ...Array.from(files).map((f: File) => f.name)]);
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }, 1500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-200">
        <div className="flex justify-between items-start mb-12">
           <div>
              <h2 className="text-3xl font-[1000] text-icbc-text tracking-tighter uppercase italic">Secure Upload</h2>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-[10px] font-black text-icbc-muted uppercase tracking-widest">资料合规上传通道</span>
                 <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              </div>
           </div>
           <div className="bg-red-50 px-4 py-2 rounded-xl border border-red-100 text-right">
              <span className="text-[9px] font-black text-icbc-red uppercase tracking-widest block">Usage Type</span>
              <span className="text-sm font-bold text-icbc-text">{purpose}</span>
           </div>
        </div>

        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />

        <div 
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`relative h-64 border-4 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer transition-all ${isUploading ? 'bg-gray-50 border-gray-200' : 'bg-gray-50/50 border-gray-200 hover:border-icbc-red hover:bg-red-50/50 group'}`}
        >
           {isUploading ? (
             <div className="text-center">
                <div className="w-12 h-12 border-4 border-icbc-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm font-[900] text-icbc-text uppercase tracking-widest">Ingesting Documents...</p>
                <p className="text-[10px] text-icbc-muted font-bold mt-1">SECURE ENCRYPTION TUNNEL ACTIVE</p>
             </div>
           ) : (
             <div className="text-center group-hover:scale-105 transition-transform">
                <div className="bg-white p-6 rounded-full shadow-lg mb-6 mx-auto inline-block border border-gray-100">
                   <svg className="w-12 h-12 text-icbc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                </div>
                <p className="text-lg font-[900] text-icbc-text uppercase tracking-tighter">Click to Import Local Files</p>
                <p className="text-[10px] font-black text-icbc-muted uppercase tracking-[0.2em] mt-1">支持PDF/JPG/PNG等业务合规格式</p>
             </div>
           )}
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-12 space-y-3">
             <span className="text-[10px] font-black text-icbc-muted uppercase tracking-widest block mb-4">Verification Records / 已载入文件清单</span>
             {uploadedFiles.map((f, i) => (
               <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-200 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span className="font-bold text-icbc-text">{f}</span>
                  </div>
                  <span className="text-[9px] font-black text-green-600 uppercase bg-green-100 px-2 py-1 rounded">Vaulted</span>
               </div>
             ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-100 space-y-4">
           <button 
             onClick={onComplete}
             disabled={uploadedFiles.length === 0 || isUploading}
             className="w-full h-20 bg-icbc-red text-white rounded-[2rem] font-[1000] text-xl uppercase italic shadow-[0_20px_40px_rgba(199,0,11,0.2)] hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50"
           >
              Finalize & Archive / 确认并归档
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
    </div>
  );
};

export default PurposeDocsUpload;
