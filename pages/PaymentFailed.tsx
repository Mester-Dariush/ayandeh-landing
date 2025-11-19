import React, { useState, useEffect } from 'react';
import { RefreshCw, MessageCircle, AlertCircle, Copy, Check } from 'lucide-react';
import { config } from '../config';
import { Emojis } from '../src/constants/assets';

const PaymentFailed: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [trxId, setTrxId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get('order_id') || String(Math.floor(100000 + Math.random() * 900000));
    setTrxId(orderId);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(trxId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 font-sans">
      
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-red-200/30 rounded-full blur-[100px] opacity-60 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-rose-200/20 rounded-full blur-[80px] opacity-50"></div>

      <div className={`relative z-10 w-full max-w-[24rem] px-4 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(220,38,38,0.1)] border border-red-100 overflow-hidden relative">
            
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-400 via-rose-500 to-red-400"></div>

            <div className="p-8 pb-6 flex flex-col items-center text-center">
                
                <div className="relative mb-6 animate-shake" style={{ animationDelay: '0.2s' }}>
                    <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-80 animate-pulse"></div>
                    
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <img 
                            src={Emojis.failed}
                            alt="Failed" 
                            className="w-20 h-20 object-contain drop-shadow-md relative z-10"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-sm z-20">
                            <div className="bg-red-100 text-red-500 rounded-full p-1">
                                <AlertCircle size={18} strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">
                   {config.failed.title}
                </h1>
                
                <p className="text-slate-500 text-[14px] leading-6 mb-8 px-2">
                   {config.failed.desc}
                </p>

                <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 mb-6 flex items-center justify-between group hover:border-slate-300 transition-colors">
                    <div className="flex flex-col items-start text-xs">
                        <span className="text-slate-400 mb-0.5">شماره سفارش</span>
                        <span className="text-slate-700 font-mono font-bold text-sm tracking-wider">{trxId}</span>
                    </div>
                    <button 
                        onClick={handleCopy}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-lg transition-all"
                        title="کپی شماره سفارش"
                    >
                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                </div>

                <div className="w-full space-y-3">
                    <a 
                        href={config.telegramBotUrl}
                        className="group w-full bg-[#e11d48] hover:bg-[#be123c] text-white rounded-xl py-3.5 px-4 font-bold text-base shadow-[0_10px_20px_-10px_rgba(225,29,72,0.5)] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                         <RefreshCw size={18} className="group-hover:-rotate-180 transition-transform duration-500" />
                         <span>تلاش مجدد</span>
                    </a>

                    <a 
                        href={config.supportUrl}
                        className="w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-xl py-3.5 px-4 font-semibold text-base transition-colors flex items-center justify-center gap-2"
                    >
                         <MessageCircle size={18} />
                         <span>تماس با پشتیبانی</span>
                    </a>
                </div>

            </div>
            
            <div className="bg-red-50/50 p-3 text-center border-t border-red-100/50">
                <p className="text-[11px] text-red-400/80 font-medium flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/40"></span>
                    بازگشت وجه خودکار تا ۷۲ ساعت
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/40"></span>
                </p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;