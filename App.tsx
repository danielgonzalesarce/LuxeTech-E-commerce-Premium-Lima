
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './store/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Essentials from './pages/Essentials';
import Support from './pages/Support';
import InfoPage from './pages/InfoPage';
import { Product, Order } from './types';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const Main: React.FC = () => {
  const [page, setPage] = useState('home');
  const [params, setParams] = useState<any>(null);

  const navigate = (newPage: string, newParams?: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(newPage);
    setParams(newParams);
  };

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'catalog': return <Catalog initialCategoryId={params?.categoryId} search={params?.search} onNavigate={navigate} />;
      case 'collections': return <Collections onNavigate={navigate} />;
      case 'product': return <ProductDetail product={params.product} onNavigate={navigate} />;
      case 'cart': return <Cart onNavigate={navigate} />;
      case 'auth': return <Auth onSuccess={() => setPage('home')} />;
      case 'checkout': return <Checkout onNavigate={navigate} />;
      case 'admin': return <Admin />;
      case 'essentials': return <Essentials onNavigate={navigate} />;
      case 'support': return <Support />;
      case 'shipping': return (
        <InfoPage 
          title="Logística Global." 
          subtitle="Despacho premium a cualquier coordenada."
          content={[
            { section: "Red de Distribución", text: "Utilizamos una red logística propia integrada con carriers de élite para garantizar que su adquisición llegue en condiciones impecables." },
            { section: "Plazos de Entrega", text: "Los pedidos metropolitanos se entregan en 24-48h. Los envíos internacionales requieren de 3 a 5 días hábiles." },
            { section: "Seguridad de Tránsito", text: "Cada paquete está asegurado por el 100% de su valor comercial y cuenta con monitoreo GPS en tiempo real." }
          ]}
        />
      );
      case 'returns': return (
        <InfoPage 
          title="Devoluciones." 
          subtitle="Transparencia absoluta en su inversión."
          content={[
            { section: "Política de Satisfacción", text: "Dispone de 14 días naturales para solicitar la devolución si el producto no cumple con sus expectativas estéticas o funcionales." },
            { section: "Recogida Premium", text: "Un agente de LuxeTech retirará el producto en su domicilio sin coste adicional, asegurando el embalaje correcto." },
            { section: "Reembolso", text: "Una vez verificado el estado, el reembolso se procesará en un máximo de 5 días hábiles a su método de pago original." }
          ]}
        />
      );
      case 'privacy': return (
        <InfoPage 
          title="Privacidad." 
          subtitle="Seguridad de datos de grado militar."
          content={[
            { section: "Recolección de Datos", text: "LuxeTech recopila únicamente la información estrictamente necesaria para la prestación de servicios de lujo: identificación personal, datos de contacto y preferencias de diseño para personalizar su ecosistema." },
            { section: "Tratamiento de la Información", text: "Sus datos son procesados bajo protocolos de encriptación end-to-end. No comercializamos, alquilamos ni compartimos su identidad con terceros para fines publicitarios externos. Su huella digital en nuestra plataforma es propiedad exclusiva de su perfil." },
            { section: "Seguridad Transaccional", text: "Implementamos infraestructura de grado bancario (PCI-DSS Nivel 1) y encriptación AES-256. Todas las transacciones financieras son procesadas a través de túneles seguros que imposibilitan la interceptación de credenciales." },
            { section: "Derechos ARCO", text: "Usted mantiene el derecho absoluto de acceso, rectificación, cancelación y oposición sobre sus datos. En cualquier momento puede solicitar el borrado total de su historial de activos de nuestros servidores de alta seguridad." },
            { section: "Uso de Cookies", text: "Utilizamos 'Smart Cookies' para mejorar la fluidez de la interfaz y recordar sus preferencias estéticas. Estas herramientas no rastrean actividad fuera del dominio de LuxeTech." },
            { section: "Actualizaciones de Protocolo", text: "Nuestras políticas de seguridad se revisan trimestralmente para integrar los últimos avances en ciberseguridad y legislación internacional de protección de datos (GDPR)." }
          ]}
        />
      );
      case 'terms': return (
        <InfoPage 
          title="Términos." 
          subtitle="Acuerdo de servicios de LuxeTech."
          content={[
            { section: "Aceptación del Acuerdo", text: "Al interactuar con la plataforma LuxeTech, usted declara conocer y aceptar los presentes términos de uso. Este es un contrato vinculante que rige la adquisición de activos tecnológicos y de diseño premium." },
            { section: "Propiedad Intelectual", text: "Todo el contenido, incluyendo diseños industriales, algoritmos visuales, tipografía editorial y arquitectura de software, es propiedad exclusiva de LuxeTech Systems Inc. Queda prohibida la reproducción o ingeniería inversa de cualquier elemento del sitio." },
            { section: "Condiciones de Venta", text: "Los precios están sujetos a la exclusividad de los materiales y la disponibilidad de stock limitado. LuxeTech se reserva el derecho de cancelar pedidos que no cumplan con los protocolos de verificación de identidad para prevenir el fraude." },
            { section: "Limitación de Responsabilidad", text: "LuxeTech no se hace responsable por el uso indebido de los dispositivos adquiridos o por fallos derivados de la infraestructura de red externa al ecosistema LuxeTech. Nuestra responsabilidad se limita al valor de adquisición del activo." },
            { section: "Garantía de Autenticidad", text: "Cada producto incluye un certificado digital de autenticidad. La alteración de los componentes de hardware o el software propietario anula de forma inmediata cualquier soporte técnico o garantía de fábrica." },
            { section: "Jurisdicción y Ley Aplicable", text: "Cualquier controversia derivada de este acuerdo será resuelta bajo las leyes de comercio internacional y sometida a los tribunales de arbitraje designados por la corporación en su sede central." }
          ]}
        />
      );
      case 'confirmation': 
        const order = params?.order as Order;
        return (
          <div className="max-w-3xl mx-auto py-32 px-6 text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-10"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </motion.div>
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight luxury-serif text-black">Compra Confirmada</h1>
            <p className="text-xl text-gray-500 mb-12 max-w-lg mx-auto">Su viaje hacia la tecnología premium ha comenzado. El pedido <span className="font-mono font-bold text-indigo-600">#{order.id}</span> ya está siendo procesado.</p>
            <div className="bg-white p-10 rounded-3xl custom-shadow border border-gray-100 text-left mb-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Detalles de Envío</h3>
              <p className="text-lg font-medium text-gray-800">{order.shippingAddress}</p>
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Inversión Total</p>
                  <p className="text-2xl font-bold">S/. {order.total.toFixed(2)}</p>
                </div>
                <div className="text-xs text-gray-400">Pago Seguro vía Stripe</div>
              </div>
            </div>
            <button 
              onClick={() => setPage('home')}
              className="px-12 py-5 bg-black text-white rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-gray-800 transition-all hover:scale-105"
            >
              Regresar al Inicio
            </button>
          </div>
        );
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar onNavigate={navigate} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <PageWrapper key={page}>
            {renderPage()}
          </PageWrapper>
        </AnimatePresence>
      </main>
      <footer className="bg-white border-t border-gray-100 py-24 px-6 mt-20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight cursor-pointer" onClick={() => navigate('home')}>LuxeTech</h3>
            <p className="text-gray-400 leading-relaxed text-sm">Forjando el futuro digital con un ojo inquebrantable para la perfección estética y funcional.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-xs uppercase tracking-[0.2em] text-gray-900">Colecciones</h4>
            <ul className="text-gray-400 text-sm space-y-4">
              <li onClick={() => navigate('catalog')} className="hover:text-black cursor-pointer transition-colors">La Colección Maestra</li>
              <li onClick={() => navigate('collections')} className="hover:text-black cursor-pointer transition-colors">Lanzamientos Limitados</li>
              <li onClick={() => navigate('essentials')} className="hover:text-black cursor-pointer transition-colors">Esenciales Estéticos</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-xs uppercase tracking-[0.2em] text-gray-900">Concierge</h4>
            <ul className="text-gray-400 text-sm space-y-4">
              <li onClick={() => navigate('shipping')} className="hover:text-black cursor-pointer transition-colors">Logística de Envío</li>
              <li onClick={() => navigate('returns')} className="hover:text-black cursor-pointer transition-colors">Devoluciones Premium</li>
              <li onClick={() => navigate('support')} className="hover:text-black cursor-pointer transition-colors">Soporte Técnico</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-xs uppercase tracking-[0.2em] text-gray-900">Boletín</h4>
            <p className="text-gray-400 text-xs mb-4">Únase para recibir acceso anticipado a nuevas colecciones.</p>
            <div className="relative">
              <input type="text" placeholder="Correo Electrónico" className="w-full bg-gray-50 border-none rounded-full px-6 py-4 text-sm focus:ring-2 ring-indigo-500 transition-all" />
              <button className="absolute right-2 top-2 bottom-2 bg-black text-white rounded-full px-4 text-[10px] font-bold uppercase">Unirse</button>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto mt-24 pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-300 text-[10px] uppercase tracking-widest font-bold">
            &copy; 2026 LUXETECH SYSTEMS. TODOS LOS DERECHOS RESERVADOS.
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
             <button onClick={() => navigate('privacy')} className="hover:text-black transition-colors">Políticas y Seguridad</button>
             <button onClick={() => navigate('terms')} className="hover:text-black transition-colors">Términos y Condiciones</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

export default App;
