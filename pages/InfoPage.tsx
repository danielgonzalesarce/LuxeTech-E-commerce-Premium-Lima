
import React from 'react';
import { motion } from 'framer-motion';

interface InfoPageProps {
  title: string;
  subtitle: string;
  content: { section: string; text: string }[];
}

const InfoPage: React.FC<InfoPageProps> = ({ title, subtitle, content }) => {
  return (
    <div className="pt-40 pb-32 px-6 sm:px-10 lg:px-16 max-w-[1000px] mx-auto">
      <header className="mb-24 space-y-6">
        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-indigo-500">Documentación Corporativa</span>
        <h1 className="text-7xl font-bold tracking-tighter luxury-serif">{title}</h1>
        <p className="text-gray-400 text-2xl font-light italic">{subtitle}</p>
      </header>

      <div className="space-y-20">
        {content.map((item, idx) => (
          <motion.section 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold tracking-tight uppercase text-black flex items-center gap-6">
              <span className="text-[10px] font-black text-gray-200">0{idx + 1}</span>
              {item.section}
            </h2>
            <div className="h-px bg-gray-100 w-full" />
            <p className="text-gray-500 text-lg leading-relaxed font-light">
              {item.text}
            </p>
          </motion.section>
        ))}
      </div>
      
      <div className="mt-32 pt-12 border-t border-gray-100 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-300">
        <span>LuxeTech Systems Inc.</span>
        <span>Última revisión: Enero 2026</span>
      </div>
    </div>
  );
};

export default InfoPage;
