import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import PaymentRedirect from './pages/PaymentRedirect';
import Preloader from './src/components/Preloader';

const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Preloader>
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-surface font-sans" dir="rtl">

          <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_80%)] z-0 opacity-60"></div>

          <div className="absolute -top-[10%] left-[20%] w-[40rem] h-[40rem] bg-blue-100/50 rounded-full blur-[100px] -z-10 mix-blend-multiply"></div>
          <div className="absolute top-[40%] -right-[10%] w-[30rem] h-[30rem] bg-purple-100/50 rounded-full blur-[100px] -z-10 mix-blend-multiply"></div>

          <div className="relative z-10 container mx-auto px-3 sm:px-6 lg:px-8 text-center flex flex-col items-center py-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/failed" element={<PaymentFailed />} />
              <Route path="/payment/redirect" element={<PaymentRedirect />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

        </div>
      </Preloader>
    </BrowserRouter>
  );
};

export default App;