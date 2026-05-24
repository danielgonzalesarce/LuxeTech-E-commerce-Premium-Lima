
import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { EnhancedCategory } from '../constants';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { products, categories } = useApp();
  const featured = products.filter(p => p.featured).slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } 
    }
  };

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <span className="text-white/60 uppercase tracking-[0.4em] text-[12px] font-bold">Evolution of Excellence</span>
              <h1 className="text-6xl md:text-9xl font-extrabold text-white tracking-tighter leading-none luxury-serif">
                LUJO <br /> <span className="text-indigo-400">DEFINIDO.</span>
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => onNavigate('catalog')}
                className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-indigo-400 hover:text-white transition-all hover:scale-105 active:scale-95"
              >
                Explorar Catálogo
              </button>
              <button 
                onClick={() => onNavigate('collections')}
                className="bg-transparent border border-white/20 text-white px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Colecciones
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-5xl font-bold tracking-tighter luxury-serif">Featured Releases</h2>
            <p className="text-gray-400 font-medium max-w-md">Curated selection of the most coveted objects from our latest series.</p>
          </motion.div>
          <button 
            onClick={() => onNavigate('catalog')}
            className="text-[11px] font-black uppercase tracking-widest border-b-2 border-black pb-2 hover:text-indigo-600 hover:border-indigo-600 transition-all"
          >
            View All Series
          </button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {featured.map(product => (
            <motion.div 
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onClick={() => onNavigate('product', { product })}
              className="group cursor-pointer perspective-1000"
            >
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden mb-8 bg-gray-100 relative custom-shadow transition-all group-hover:shadow-2xl">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="space-y-2 px-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                  <p className="font-bold text-lg text-gray-400">S/. {product.price}</p>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">Premium Series {product.categoryId}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Category Grid */}
      <section className="max-w-[1440px] mx-auto px-6">
        <h2 className="text-sm font-black uppercase tracking-[0.5em] text-gray-300 text-center mb-20">Explore Disciplines</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {(categories as EnhancedCategory[]).map((cat, idx) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onNavigate('catalog', { categoryId: cat.id })}
              className="relative h-[500px] rounded-[30px] overflow-hidden group cursor-pointer"
            >
              <img 
                src={cat.imageUrl} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-[0.6] group-hover:brightness-75"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-10 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-indigo-400 text-[9px] font-black uppercase tracking-[0.4em] mb-2">{cat.slogan}</p>
                <h3 className="text-white font-bold text-2xl tracking-tighter">{cat.name}</h3>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">View Collection</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
