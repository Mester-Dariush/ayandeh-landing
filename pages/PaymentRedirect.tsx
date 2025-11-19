import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { config } from '../config';

const LOADING_STEPS = [
  config.redirect.title,
  "اتصال به درگاه بانک...",
  "تایید امنیت...",
];

const PaymentRedirect: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const targetUrl = searchParams.get('url');

    if (stepIndex < LOADING_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setStepIndex(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (targetUrl) {
      const timer = setTimeout(() => {
        window.location.href = targetUrl;
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [stepIndex]);

  return (
    <div className="fixed inset-0 w-full h-full bg-white flex flex-col items-center justify-center font-sans" dir="rtl">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[30%] w-[400px] h-[400px] bg-blue-100 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[30%] w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        
        <div className="relative w-24 h-24 mb-12">
          <div className="absolute inset-0 border-[3px] border-blue-500 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20"></div>
          <div className="absolute inset-0 border-[3px] border-blue-500 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20" style={{ animationDelay: '0.5s' }}></div>
          
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-200 flex items-center justify-center animate-float">
             <ShieldCheck className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-2 tracking-tight animate-fade-up">
          {LOADING_STEPS[stepIndex]}
        </h2>
        <p className="text-slate-400 text-sm animate-pulse">
          لطفاً شکیبا باشید
        </p>
        
        <div className="mt-10 flex gap-2">
            {[0, 1, 2].map((i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === stepIndex % 3 ? 'bg-blue-600' : 'bg-blue-200'}`} 
              />
            ))}
        </div>

        <div className="absolute bottom-[-150px] flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">پرداخت امن شاپرک</span>
        </div>

      </div>
    </div>
  );
};

export default PaymentRedirect;