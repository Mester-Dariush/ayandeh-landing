
import React, { useEffect, useState } from 'react';
import { CRITICAL_ASSETS } from '../constants/assets';
import { RefreshCw } from 'lucide-react';

interface PreloaderProps {
  children: React.ReactNode;
}

const Preloader: React.FC<PreloaderProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const total = CRITICAL_ASSETS.length;

    const checkDone = () => {
      loadedCount++;
      if (loadedCount === total) {
        // Adding a delay so the animation actually shows up. Ugh.
        setTimeout(() => setIsReady(true), 800); 
      }
    };

    // If it takes too long (3s), show the retry button. People are impatient.
    const timeoutTimer = setTimeout(() => {
      setShowRetry(true);
    }, 3000);

    if (total === 0) {
      setTimeout(() => setIsReady(true), 500);
      return;
    }

    CRITICAL_ASSETS.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = checkDone;
      img.onerror = () => {
        // Even if it errors, just proceed. I don't care enough to halt everything.
        checkDone();
      };
    });

    return () => clearTimeout(timeoutTimer);
  }, []);

  if (isReady) {
    return <>{children}</>;
  }

  return (
    <div 
      className="fixed inset-0 bg-slate-50 z-[9999] flex flex-col items-center justify-center overflow-hidden" 
      dir="rtl"
    >
      {/* Blurred background stuff */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-purple-100/60 rounded-full blur-[120px] opacity-50 animate-pulse"></div>
      </div>

      {/* Main container, centered */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 p-6">
        
        {/* The spinning thingy */}
        <div className="relative w-20 h-20 flex items-center justify-center">
            {/* Static ring */}
            <div className="absolute inset-0 border-4 border-slate-200 rounded-full opacity-30"></div>
            
            {/* Moving ring */}
            <div className="absolute inset-0 border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            
            {/* Dot in the middle */}
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-ping opacity-75 absolute"></div>
            <div className="w-2.5 h-2.5 bg-purple-600 rounded-full relative z-10"></div>
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
            <h2 className="text-slate-800 text-lg font-black tracking-tight">
              در حال آماده‌سازی...
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              لطفاً چند لحظه صبر کنید
            </p>
        </div>

        {/* Retry button. Only if things go south. */}
        {showRetry && (
          <div className="animate-fade-up pt-2">
             <button 
               onClick={() => window.location.reload()}
               className="group flex items-center gap-2.5 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
             >
               <RefreshCw size={16} className="group-hover:-rotate-180 transition-transform duration-700" />
               <span className="text-xs font-bold">رفرش صفحه</span>
             </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Preloader;
