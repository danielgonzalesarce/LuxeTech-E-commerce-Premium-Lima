
import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';

interface EssentialsProps {
  onNavigate: (page: string, params?: any) => void;
}

const Essentials: React.FC<EssentialsProps> = ({ onNavigate }) => {
  const { products } = useApp();
  const essentials = products.filter(p => p.featured).slice(4, 10);

  return (
    <div className="pt-40 pb-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <header className="mb-32 text-center space-y-8">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.6em] text-indigo-500"
          >
            Curaduría de Diseño
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter luxury-serif"
          >
            Esenciales <br /> <span className="italic text-gray-300">Estéticos.</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg font-light leading-relaxed">
            Una selección rigurosa de objetos donde la forma y la función convergen en una expresión pura de minimalismo técnico.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {essentials.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onNavigate('product', { product })}
              className={`group cursor-pointer ${idx % 3 === 1 ? 'lg:mt-24' : ''}`}
            >
              <div className="aspect-[3/4] rounded-[50px] overflow-hidden bg-gray-50 mb-8 relative transition-all duration-700 group-hover:shadow-2xl">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/5" />
                <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Descubrir</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight luxury-serif">{product.name}</h3>
                <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Serie Archivo • S/. {product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Essentials;
