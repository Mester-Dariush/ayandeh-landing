import React, { useEffect, useState } from 'react';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import { config } from '../config';
import { Emojis } from '../src/constants/assets';

const PaymentSuccess: React.FC = () => {
  const [trxId, setTrxId] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get('order_id') || String(Math.floor(100000 + Math.random() * 900000));
    setTrxId(orderId);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(trxId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 text-slate-800 font-sans">
      
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] opacity-60 animate-float"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-green-400/20 rounded-full blur-[120px] opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img src={Emojis.party} className="absolute top-[15%] left-[10%] w-12 h-12 animate-float-random opacity-60 blur-[1px]" style={{ animationDuration: '8s' }} alt="" />
          <img src={Emojis.sparkles} className="absolute bottom-[20%] right-[15%] w-8 h-8 animate-pulse opacity-50" alt="" />
          <img src={Emojis.money} className="absolute top-[40%] right-[5%] w-10 h-10 animate-float opacity-40 blur-[2px]" style={{ animationDelay: '1s' }} alt="" />
      </div>

      <div className={`relative z-10 w-full max-w-md px-6 transition-all duration-1000 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="relative bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] rounded-[2.5rem] overflow-hidden">
            
            <div className="pt-12 pb-8 px-8 flex flex-col items-center text-center">
                
                <div className="relative w-28 h-28 mb-6 animate-bounce-in">
                    <div className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl animate-pulse"></div>
                    <img 
                        src={Emojis.starStruck} 
                        alt="Success" 
                        className="w-full h-full object-contain drop-shadow-2xl relative z-10 hover:scale-110 transition-transform duration-300 cursor-pointer"
                    />
                    <div className="absolute -right-2 -bottom-2 bg-white rounded-full p-1.5 shadow-md animate-pop delay-300">
                        <div className="bg-green-500 rounded-full p-1">
                            <Check size={14} className="text-white stroke-[4]" />
                        </div>
                    </div>
                </div>

                <h1 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">
                    {config.success.title}
                </h1>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {config.success.desc}
                </p>
            </div>

            <div className="relative w-full h-4 bg-transparent flex items-center justify-between px-2">
                <div className="w-full border-b-2 border-dashed border-slate-200/80 absolute top-1/2 left-0"></div>
                <div className="w-6 h-6 bg-slate-50 rounded-full absolute -left-3 top-1/2 -translate-y-1/2 shadow-inner"></div>
                <div className="w-6 h-6 bg-slate-50 rounded-full absolute -right-3 top-1/2 -translate-y-1/2 shadow-inner"></div>
            </div>

            <div className="bg-slate-50/50 p-8 pt-6">
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">کد رهگیری</span>
                        <span className="font-mono text-xl font-bold text-slate-700 tracking-widest">{trxId}</span>
                    </div>
                    <button 
                        onClick={handleCopy}
                        className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-500 transition-all active:scale-90"
                    >
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                </div>

                <div className="mt-8 space-y-3">
                    <a 
                        href={config.telegramBotUrl}
                        className="w-full bg-[#007AFF] hover:bg-[#0062cc] text-white rounded-2xl py-4 font-bold text-lg shadow-[0_8px_20px_-6px_rgba(0,122,255,0.4)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        <span>{config.success.button}</span>
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;