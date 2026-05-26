
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onNavigate: (page: string, params?: any) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onNavigate }) => {
  const { addToCart, products, favorites, toggleFavorite } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const related = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    setAdding(true);
    addToCart(product, quantity);
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-24">
      <div className="flex flex-col lg:flex-row gap-24 items-start">
        {/* Medios Visuales */}
        <div className="w-full lg:w-3/5 lg:sticky lg:top-32 space-y-8">
          <div className="aspect-[4/5] rounded-[60px] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl relative group">
            <button 
              className="absolute top-8 right-8 p-4 bg-white/50 backdrop-blur-md rounded-full text-red-500 transition-colors z-20"
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart size={24} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
            </button>
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/5" />
          </div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`flex-shrink-0 w-24 h-32 rounded-3xl overflow-hidden border-2 transition-all duration-500 ${selectedImage === idx ? 'border-indigo-600 scale-105 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Narrativa y Comercio */}
        <div className="w-full lg:w-2/5 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Edición 2026.01</span>
              <div className="h-[1px] flex-grow bg-gray-100" />
            </div>
            <h1 className="text-6xl font-extrabold text-gray-900 tracking-tighter leading-none luxury-serif">{product.name}</h1>
            <div className="flex items-baseline gap-6">
              <span className="text-4xl font-black text-black">S/. {product.price}</span>
              <span className="text-gray-400 text-sm line-through">S/. {(product.price * 1.3).toFixed(0)}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-gray-500 leading-relaxed text-lg font-light">
              {product.description}
            </p>
            <div className="grid grid-cols-2 gap-8 py-6 border-y border-gray-100">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Materiales</p>
                <p className="text-sm font-bold">Titanio Grado-5 y Zafiro</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Diseño</p>
                <p className="text-sm font-bold">Unibody Minimalista</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <div className="flex items-center gap-10">
              <div className="flex items-center bg-gray-50 rounded-full px-6 py-3 border border-gray-100">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:text-indigo-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
                </button>
                <span className="px-8 font-black text-lg min-w-[3rem] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="p-2 hover:text-indigo-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-widest ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {product.stock > 0 ? `Asignación: ${product.stock} unidades` : 'Asignaciones Agotadas'}
              </span>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-6 rounded-full text-white font-black uppercase text-[12px] tracking-[0.3em] shadow-2xl transition-all flex items-center justify-center space-x-4 group ${
                adding ? 'bg-green-500 scale-95' : 'bg-black hover:bg-indigo-600 active:scale-95'
              } disabled:bg-gray-100 disabled:text-gray-300 disabled:shadow-none`}
            >
              {adding ? (
                <>
                  <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>Asignado al Carrito</span>
                </>
              ) : (
                <>
                  <span>Adquirir Ahora</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </>
              )}
            </button>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 opacity-40">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 rounded-2xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest">Envío Global</p>
                <p className="text-[10px]">Entrega estimada de 3 a 5 ciclos estándar.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 rounded-2xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest">Activo Asegurado</p>
                <p className="text-[10px]">Envío encriptado y 2 años de garantía premium.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sugerencias */}
      <section className="mt-40">
        <h2 className="text-4xl font-bold mb-16 tracking-tight luxury-serif">Combinaciones Sugeridas.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {related.map(p => (
            <motion.div 
              key={p.id}
              whileHover={{ y: -5 }}
              onClick={() => onNavigate('product', { product: p })}
              className="group cursor-pointer"
            >
              <div className="aspect-square rounded-[40px] overflow-hidden mb-6 bg-gray-50 border border-gray-100/50 relative">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/5" />
              </div>
              <h3 className="font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{p.name}</h3>
              <p className="text-gray-400 font-bold mt-2">S/. {p.price}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
