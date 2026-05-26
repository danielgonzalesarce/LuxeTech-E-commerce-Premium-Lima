
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { UserRole } from '../types';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { user, cart, logout } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 glass-effect border-b border-gray-200/20 ${scrolled ? 'py-4 shadow-lg' : 'py-6'}`}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 lg:gap-16">
              <button className="lg:hidden p-2" onClick={toggleMobileMenu}>
                <Menu className="w-6 h-6 text-black" />
              </button>
              <motion.h1 
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('home')} 
                className="text-2xl font-black tracking-tighter cursor-pointer flex items-center group text-black"
              >
                <span className="bg-black text-white px-2 py-0.5 mr-1 rounded-sm group-hover:bg-indigo-600 transition-colors">L</span>
                LUXETECH
              </motion.h1>
              <div className="hidden lg:flex space-x-10">
                <button onClick={() => onNavigate('catalog')} className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-700 hover:text-black transition-colors relative overflow-hidden group">
                  Catálogo
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black transform translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-500" />
                </button>
                <button onClick={() => onNavigate('collections')} className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-700 hover:text-black transition-colors relative overflow-hidden group">
                  Colecciones
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black transform translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-500" />
                </button>
                <button onClick={() => onNavigate('favorites')} className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-700 hover:text-black transition-colors relative overflow-hidden group">
                  Esenciales
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black transform translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-500" />
                </button>
                {user?.role === UserRole.ADMIN && (
                  <button onClick={() => onNavigate('admin')} className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-600 hover:text-indigo-800">Administración</button>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 lg:space-x-8">
              <button 
                onClick={() => onNavigate('cart')} 
                className="group flex items-center gap-2 p-2 relative"
              >
                <svg className="w-5 h-5 text-gray-800 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {user ? (
                <div className="hidden lg:flex items-center gap-6">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-600">Hola, {user.name.split(' ')[0]}</span>
                  <button 
                    onClick={logout}
                    className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-0.5 hover:text-indigo-600 hover:border-indigo-600 transition-all text-black"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => onNavigate('auth')}
                  className="bg-black text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-indigo-600 transition-all hover:scale-105 active:scale-95 shadow-lg hidden lg:block"
                >
                  Acceso
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 z-[101] bg-black"
            />
            {/* Menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm z-[102] bg-white pt-24 px-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                 <h2 className="text-2xl font-bold">Menú</h2>
                 <button onClick={toggleMobileMenu}>
                   <X className="w-8 h-8 text-black" />
                 </button>
              </div>
              <nav className="flex flex-col space-y-8 text-xl font-medium tracking-tight">
                <button onClick={() => handleNavigate('home')} className="text-left text-3xl font-serif">Inicio</button>
                <button onClick={() => handleNavigate('catalog')} className="text-left text-3xl font-serif">Catálogo</button>
                <button onClick={() => handleNavigate('collections')} className="text-left text-3xl font-serif">Colecciones</button>
                <button onClick={() => handleNavigate('favorites')} className="text-left text-3xl font-serif">Esenciales</button>
                {user ? (
                   <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-left text-3xl font-serif text-red-600">Salir</button>
                ) : (
                   <button onClick={() => handleNavigate('auth')} className="text-left text-3xl font-serif text-indigo-600">Acceso</button>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
