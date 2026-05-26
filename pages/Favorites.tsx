
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useApp } from '../store/AppContext';

interface FavoritesProps {
  onNavigate: (page: string, params?: any) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ onNavigate }) => {
  const { products, favorites, toggleFavorite } = useApp();
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="pt-40 pb-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <header className="mb-32 text-center space-y-8">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.6em] text-indigo-500"
          >
            Curaduría Personal
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter luxury-serif"
          >
            Favoritos.
          </motion.h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg font-light leading-relaxed">
            Una colección curada de objetos que definen su estilo y preferencia personal.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {favoriteProducts.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer flex flex-col"
            >
              <div 
                className="aspect-[3/4] rounded-[40px] sm:rounded-[50px] overflow-hidden bg-gray-50 mb-6 sm:mb-8 relative transition-all duration-700 group-hover:shadow-2xl"
                onClick={() => onNavigate('product', { product })}
              >
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <button 
                  className="absolute top-6 right-6 p-3 bg-white/50 backdrop-blur-md rounded-full text-red-500 transition-colors"
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                >
                  <Heart size={20} fill="currentColor" />
                </button>
              </div>
              <div 
                className="space-y-2 flex-grow" 
                onClick={() => onNavigate('product', { product })}
              >
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight luxury-serif">{product.name}</h3>
                <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest font-bold">Selección • S/. {product.price}</p>
              </div>
            </motion.div>
          ))}
          {favoriteProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-32 space-y-6"
            >
              <p className="text-gray-400 text-lg">No tienes productos en favoritos todavía.</p>
              <button 
                onClick={() => onNavigate('auth')}
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors uppercase text-sm font-bold tracking-widest"
              >
                Inicia sesión o regístrate
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
