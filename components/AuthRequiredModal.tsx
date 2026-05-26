
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({ isOpen, onClose, onLogin, onRegister }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center p-6 z-50"
          >
            <div className="bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl text-center space-y-8 relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight luxury-serif">Acceso Requerido</h2>
              <p className="text-gray-400 font-light">Para continuar, debe iniciar sesión o crear una cuenta en nuestra plataforma.</p>
              <div className="space-y-4">
                <button 
                  onClick={onLogin}
                  className="w-full bg-black text-white py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-indigo-600 transition-all"
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={onRegister}
                  className="w-full bg-gray-100 text-black py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-gray-200 transition-all"
                >
                  Registrarse
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthRequiredModal;
