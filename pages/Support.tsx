
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Support: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "¿Cómo solicito asistencia técnica inmediata?", a: "Nuestros ingenieros están disponibles 24/7 a través de la línea de Concierge Premium o mediante el formulario de reporte encriptado." },
    { q: "¿Cuál es el periodo de garantía de los dispositivos?", a: "Todos los productos LuxeTech incluyen 2 años de Garantía Global de Activos, cubriendo cualquier anomalía de fabricación o software." },
    { q: "¿Ofrecen servicios de configuración a domicilio?", a: "Sí, el servicio 'LuxeWhiteGlove' está disponible en áreas metropolitanas seleccionadas para la instalación inicial de su hábitat inteligente." }
  ];

  return (
    <div className="pt-40 pb-32 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
        <div className="space-y-16">
          <header className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500">Centro de Inteligencia</span>
            <h1 className="text-7xl font-bold tracking-tighter luxury-serif">Soporte Técnico.</h1>
            <p className="text-gray-400 text-xl font-light leading-relaxed">
              Asistencia de ingeniería para sus activos más valiosos. Estamos aquí para asegurar la continuidad de su experiencia digital.
            </p>
          </header>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-6">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-lg font-bold tracking-tight">{faq.q}</span>
                  <svg className={`w-5 h-5 transition-transform duration-500 ${activeFaq === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-gray-400 leading-relaxed font-light">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-16 rounded-[60px] shadow-2xl border border-gray-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 blur-3xl" />
          <h2 className="text-3xl font-bold mb-10 tracking-tight luxury-serif relative z-10">Reporte de Incidencia</h2>
          <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nombre de Titular</label>
              <input type="text" className="w-full bg-gray-50 border-none rounded-2xl p-5 outline-none focus:ring-2 ring-indigo-500 transition-all" placeholder="Juan Pérez" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Referencia de Producto</label>
              <input type="text" className="w-full bg-gray-50 border-none rounded-2xl p-5 outline-none focus:ring-2 ring-indigo-500 transition-all" placeholder="LT-8829-PRO" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Descripción Técnica</label>
              <textarea rows={4} className="w-full bg-gray-50 border-none rounded-2xl p-5 outline-none focus:ring-2 ring-indigo-500 transition-all resize-none" placeholder="Detalle el comportamiento observado..."></textarea>
            </div>
            <button className="w-full bg-black text-white py-6 rounded-full font-black uppercase text-[12px] tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-xl">
              Transmitir Reporte
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
