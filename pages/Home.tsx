

import React, { useState, useEffect } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { config } from '../config';
import { Emojis } from '../src/constants/assets';

const wordData = [
  { text: "خفن", emoji: Emojis.cool, color: "text-indigo-500", bg: "bg-indigo-100" },
  // Fixed typo: Eojis -> Emojis
  { text: "باحال", emoji: Emojis.funny, color: "text-purple-500", bg: "bg-purple-100" },
  { text: "سریع", emoji: Emojis.fast, color: "text-yellow-500", bg: "bg-yellow-100" },
  { text: "خوشگل", emoji: Emojis.pretty, color: "text-pink-500", bg: "bg-pink-100" }
];

const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wordData.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentItem = wordData[currentIndex];

  return (
    <div className="w-full flex flex-col items-center relative">
      
      {/* Floating Blobs for Background Liveliness */}
      <div className="absolute top-0 left-10 w-24 h-24 bg-purple-200 rounded-full blur-2xl animate-blob opacity-50 -z-10"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full blur-2xl animate-blob opacity-50 -z-10" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-100 rounded-full blur-3xl animate-blob opacity-40 -z-10" style={{ animationDelay: '4s' }}></div>

      {/* Header / Brand */}
      <div className="mb-12 animate-fade-up flex flex-col items-center w-full px-4">
        
        {/* Modern Beta Badge */}
        <div className="group relative inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] mb-10 hover:scale-105 transition-transform duration-300 cursor-default">
             <span className="relative flex h-2.5 w-2.5 ml-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
             <span className="text-xs font-bold text-slate-600 tracking-wide">
               {config.home.badge}
             </span>
        </div>
        
        {/* Big Typography - Updated to static content matching the image */}
        <h1 className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 font-black text-slate-900 leading-none tracking-tight text-[12vw] sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="whitespace-nowrap">{config.home.titlePrefix}</span>
          
          {/* Rotating Word Box */}
          <div className="relative h-[1.4em] w-[4em] flex justify-center items-center">
             <span 
                key={currentIndex}
                className={`absolute inset-0 flex items-center justify-center gap-3 ${currentItem.color} animate-pop`}
             >
                <span className="relative z-10 tracking-tighter">{currentItem.text}</span>
                
                {/* Animated Emoji */}
                <img 
                    src={currentItem.emoji} 
                    alt="" 
                    className="w-[1em] h-[1em] drop-shadow-xl rotate-12 animate-wiggle filter saturate-150 origin-bottom" 
                />
                
                {/* Underline Highlight */}
                <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-full h-[30%] ${currentItem.bg} -z-10 -rotate-2 rounded-full opacity-60`}></span>
             </span>
          </div>

          <span className="whitespace-nowrap">{config.home.titleSuffix}</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-8 font-medium mt-12 animate-fade-up text-center" style={{ animationDelay: '0.2s' }}>
          {config.home.description}
        </p>
      </div>

      {/* Call to Action - 3D Button Effect */}
      <div className="w-full max-w-lg mx-auto mt-4 animate-fade-up px-4" style={{ animationDelay: '0.4s' }}>
          <a href={config.telegramBotUrl} target="_blank" rel="noopener noreferrer" className="block group perspective-1000">
              <div className="relative transform transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-x-12 preserve-3d">
                  
                  {/* Button Shadow Layer */}
                  <div className="absolute inset-0 bg-blue-600/30 rounded-2xl blur-lg translate-y-4 scale-90 group-hover:scale-100 transition-all duration-500"></div>

                  {/* Main Button Body */}
                  <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/20 to-white/0 backdrop-blur-md border border-white/40 shadow-xl overflow-hidden">
                      
                      {/* Inner Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-90"></div>
                      
                      {/* Shine Animation */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>

                      <div className="relative flex items-center justify-between p-6 sm:p-8">
                          {/* Icon Box */}
                          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                               <img
                                  src={Emojis.robot}
                                  alt="Robot"
                                  className="w-10 h-10 object-contain filter drop-shadow-md"
                              />
                          </div>

                          {/* Text */}
                          <div className="flex-1 text-right px-6">
                              <div className="text-white font-black text-2xl sm:text-3xl mb-1 drop-shadow-sm">{config.home.telegramButtonText}</div>
                              <div className="text-blue-100 text-sm font-medium opacity-90">{config.home.telegramButtonDesc}</div>
                          </div>

                          {/* Arrow */}
                          <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-45 transition-transform duration-300">
                              <ArrowLeft className="w-6 h-6 stroke-[3]" />
                          </div>
                      </div>
                  </div>
              </div>
          </a>
      </div>
    </div>
  );
};

export default Home;