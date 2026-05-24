
import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { EnhancedCategory } from '../constants';

interface CollectionsProps {
  onNavigate: (page: string, params?: any) => void;
}

const Collections: React.FC<CollectionsProps> = ({ onNavigate }) => {
  const { categories, products } = useApp();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Editorial */}
      <section className="h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Hero background" />
        </motion.div>
        
        <div className="relative z-10 space-y-6">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: '0em' }}
            animate={{ opacity: 1, letterSpacing: '0.8em' }}
            transition={{ duration: 1.5 }}
            className="text-[10px] font-black uppercase tracking-[0.8em] text-indigo-400"
          >
            Antología 2026
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-7xl md:text-9xl font-bold tracking-tighter leading-none luxury-serif"
          >
            LAS <br /> COLECCIONES
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="w-px h-32 bg-gradient-to-b from-indigo-500 to-transparent mx-auto mt-12"
          />
        </div>
      </section>

      {/* Listado Editorial de Colecciones - Basado en Categorías Reales */}
      <section className="py-32">
        {(categories as EnhancedCategory[]).map((cat, index) => {
          const topProducts = products.filter(p => p.categoryId === cat.id).slice(0, 3);

          return (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`min-h-screen flex flex-col justify-center items-center py-24 px-6 sm:px-10 lg:px-16 border-b border-white/5 ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-20`}
            >
              {/* Imagen Principal de la Categoría */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="aspect-[4/5] rounded-[60px] overflow-hidden custom-shadow-dark relative">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5 }}
                    src={cat.imageUrl} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    alt={cat.name}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="absolute -bottom-10 -right-10 lg:right-auto lg:-left-10 bg-indigo-600 p-12 rounded-[40px] hidden md:block">
                    <p className="text-4xl font-bold italic luxury-serif">0{index + 1}</p>
                </div>
              </div>

              {/* Información de la Colección */}
              <div className="w-full lg:w-1/2 space-y-12">
                <div className="space-y-4">
                  <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">{cat.slogan}</p>
                  <h2 className="text-6xl font-bold tracking-tighter luxury-serif">{cat.name}</h2>
                  <p className="text-white/40 font-light text-xl leading-relaxed max-w-xl">
                    {cat.description}
                  </p>
                </div>

                {/* Previsualización de Productos Reales de esta Categoría */}
                <div className="grid grid-cols-3 gap-4 py-8">
                  {topProducts.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => onNavigate('product', { product: p })}
                      className="cursor-pointer group"
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                        <img src={p.images[0]} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={p.name} />
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onNavigate('catalog', { categoryId: cat.id })}
                  className="px-10 py-5 bg-white text-black rounded-full font-black uppercase text-[11px] tracking-[0.3em] hover:bg-indigo-400 transition-all active:scale-95"
                >
                  Explorar Serie Completa
                </button>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Footer Editorial CTA */}
      <section className="py-40 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter luxury-serif mb-12">
          ¿No encuentra lo que busca? <br />
          <span className="text-white/20 italic">Explore el archivo completo.</span>
        </h2>
        <button 
          onClick={() => onNavigate('catalog')}
          className="group flex items-center gap-6 mx-auto text-sm font-black uppercase tracking-[0.5em] hover:text-indigo-400 transition-colors"
        >
          Ir al catálogo maestro
          <svg className="w-6 h-6 transform group-hover:translate-x-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </button>
      </section>
    </div>
  );
};

export default Collections;
