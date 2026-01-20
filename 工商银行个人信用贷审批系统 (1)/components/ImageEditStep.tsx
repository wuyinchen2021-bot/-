
import React, { useState, useRef } from 'react';
import { editImage } from '../services/imageService';

interface ImageEditStepProps {
  onComplete: (imageUrl: string) => void;
}

const ImageEditStep: React.FC<ImageEditStepProps> = ({ onComplete }) => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!sourceImage || !prompt) return;
    setIsProcessing(true);
    try {
      const base64Data = sourceImage.split(',')[1];
      const mimeType = sourceImage.split(',')[0].split(':')[1].split(';')[0];
      const result = await editImage(base64Data, mimeType, prompt);
      setEditedImage(result);
    } catch (error) {
      console.error("Image processing failed", error);
      alert("系统影像处理失败，请重试。");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-icbc-border">
      <div className="text-lg font-bold text-icbc-red mb-4 pb-2 border-b border-icbc-border flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        智能影像合规化处理 (身份/抵押物)
      </div>

      {!sourceImage ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-icbc-red transition-colors bg-gray-50"
        >
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-600">点击上传身份证或资产照片</p>
          <p className="text-xs text-gray-400 mt-1">支持 JPG, PNG 格式</p>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">原始影像</span>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <img src={sourceImage} alt="Source" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-icbc-red uppercase tracking-wider">智能优化结果</span>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                {editedImage ? (
                  <img src={editedImage} alt="Edited" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-gray-400">待处理...</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">智能调整指令 (例: "增强清晰度", "去除背景杂物")</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="输入影像处理要求..." 
                className="flex-grow h-11 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-icbc-red"
              />
              <button 
                onClick={handleEdit}
                disabled={isProcessing || !prompt}
                className="px-6 h-11 bg-icbc-red text-white rounded-lg font-bold disabled:opacity-50 hover:bg-icbc-darkRed transition-all whitespace-nowrap"
              >
                {isProcessing ? '处理中...' : '开始处理'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {['增强细节', '移除背景', '打码敏感信息', '清晰度修复'].map(chip => (
                <button 
                  key={chip} 
                  onClick={() => setPrompt(chip)}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-between gap-4">
            <button 
              onClick={() => setSourceImage(null)}
              className="px-6 h-11 text-gray-500 font-medium hover:text-gray-700 transition-colors"
            >
              重新上传
            </button>
            <button 
              onClick={() => onComplete(editedImage || sourceImage)}
              className="flex-grow h-11 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
              确认并继续审批
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditStep;
