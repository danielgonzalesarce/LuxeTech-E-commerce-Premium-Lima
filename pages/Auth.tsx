
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../store/AppContext';

interface AuthProps {
  onSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const { login, register } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return alert("Se requieren credenciales de acceso.");
    
    if (isLogin) {
      login(email);
    } else {
      if (!name) return alert("Por favor, ingrese su nombre.");
      register(name, email);
    }
    onSuccess();
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden bg-[#fafafa]">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-100 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white rounded-[60px] shadow-2xl border border-gray-100 overflow-hidden relative z-10"
      >
        <div className="p-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tighter luxury-serif">LuxeTech.</h1>
            <p className="text-gray-400 mt-4 font-medium uppercase tracking-[0.2em] text-[10px]">
              {isLogin ? 'Establecer Conexión Segura' : 'Registrar Nueva Referencia'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Nombre Completo</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-8 py-5 bg-gray-50 border-none rounded-full focus:ring-2 ring-indigo-500 outline-none transition-all placeholder:text-gray-300" 
                  placeholder="Juan Pérez"
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Identificador de Acceso (Email)</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-8 py-5 bg-gray-50 border-none rounded-full focus:ring-2 ring-indigo-500 outline-none transition-all placeholder:text-gray-300" 
                placeholder="correo@luxetech.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Clave de Acceso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-8 py-5 bg-gray-50 border-none rounded-full focus:ring-2 ring-indigo-500 outline-none transition-all placeholder:text-gray-300" 
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-black text-white py-6 rounded-full font-black uppercase text-[12px] tracking-[0.3em] shadow-xl hover:bg-indigo-600 transition-all hover:scale-[1.02] active:scale-95"
            >
              {isLogin ? 'Iniciar Sesión' : 'Crear Credenciales'}
            </button>
          </form>

          <div className="mt-12 text-center text-xs text-gray-400">
            {isLogin ? "¿Nuevo en el ecosistema?" : "¿Ya tiene una referencia?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-black font-black uppercase tracking-widest hover:text-indigo-600 transition-colors"
            >
              {isLogin ? 'Registrarse' : 'Ingresar'}
            </button>
          </div>
        </div>
        <div className="bg-gray-50 py-8 text-center border-t border-gray-100 flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-300">Infraestructura Segura Activa</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
