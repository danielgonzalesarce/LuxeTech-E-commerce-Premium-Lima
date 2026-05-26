
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthRequiredModal from '../components/AuthRequiredModal';
import { useApp } from '../store/AppContext';

interface CartProps {
  onNavigate: (page: string) => void;
}

const Cart: React.FC<CartProps> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateCartQuantity, user, setPendingPath } = useApp();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const handleCheckout = () => {
    if (!user) {
      setPendingPath('checkout');
      setShowAuthModal(true);
      return;
    }
    onNavigate('checkout');
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.15;
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-40 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 flex justify-center"
        >
          <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
        </motion.div>
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight luxury-serif">Tu bolsa está vacía.</h2>
        <p className="text-gray-400 mb-12 text-xl font-light max-w-lg mx-auto">Los archivos están esperando. Descubra algo que lo defina.</p>
        <button 
          onClick={() => onNavigate('catalog')}
          className="bg-black text-white px-12 py-5 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-gray-800 transition-all hover:scale-105"
        >
          Iniciar Descubrimiento
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-24">
      <div className="flex flex-col gap-6 mb-16">
        <h1 className="text-7xl font-bold tracking-tighter luxury-serif">Tu Bolsa.</h1>
        <p className="text-gray-400 font-medium">Referencias seleccionadas ({cart.length})</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-24">
        <div className="flex-grow space-y-12">
          <AnimatePresence mode="popLayout">
            {cart.map(item => (
              <motion.div 
                layout
                key={item.productId} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col sm:flex-row gap-10 p-4 group"
              >
                <div className="w-full sm:w-48 h-64 rounded-[40px] overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 relative">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-2">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{item.product.name}</h3>
                      <button onClick={() => removeFromCart(item.productId)} className="text-gray-300 hover:text-red-500 transition-colors p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm font-medium">Referencia: {item.product.id.toUpperCase()}</p>
                  </div>
                  
                  <div className="flex justify-between items-end pt-8">
                    <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
                      <button 
                        onClick={() => updateCartQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="p-1 hover:text-indigo-600 transition-colors"
                      >-</button>
                      <span className="px-6 font-black text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.productId, Math.min(item.product.stock, item.quantity + 1))}
                        className="p-1 hover:text-indigo-600 transition-colors"
                      >+</button>
                    </div>
                    <span className="text-2xl font-black text-gray-900">S/. {(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="w-full lg:w-[450px]">
          <div className="bg-white p-10 rounded-[60px] border border-gray-100 shadow-2xl space-y-10 sticky top-32 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16" />
            <h3 className="text-2xl font-bold tracking-tight relative z-10">Resumen Financiero</h3>
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between text-gray-400 font-medium">
                <span className="uppercase tracking-widest text-[10px] font-black">Subtotal</span>
                <span>S/. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-medium">
                <span className="uppercase tracking-widest text-[10px] font-black">Recargo (15%)</span>
                <span>S/. {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-medium">
                <span className="uppercase tracking-widest text-[10px] font-black">Despacho</span>
                <span className={shipping === 0 ? 'text-green-500 font-bold' : ''}>
                  {shipping === 0 ? 'Cortesía' : `S/. ${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-8 border-t border-gray-50 flex justify-between items-baseline">
                <span className="text-sm font-black uppercase tracking-[0.3em]">Valor Total</span>
                <span className="text-4xl font-black text-indigo-600">S/. {total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="space-y-6 relative z-10">
              <button 
                onClick={handleCheckout}
                className="w-full bg-black text-white py-6 rounded-full font-black uppercase text-[12px] tracking-[0.3em] hover:bg-indigo-600 shadow-2xl transition-all hover:scale-[1.02] active:scale-95"
              >
                Proceder al Pago
              </button>
              <div className="flex items-center justify-center gap-3 opacity-30">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-widest">Infraestructura Segura Activa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthRequiredModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onLogin={() => { setShowAuthModal(false); onNavigate('auth'); }}
        onRegister={() => { setShowAuthModal(false); onNavigate('auth'); }}
      />
    </div>
  );
};

export default Cart;
