
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { Order } from '../types';

interface CheckoutProps {
  onNavigate: (page: string, params?: any) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onNavigate }) => {
  const { cart, checkout, user } = useApp();
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState<Order | null>(null);
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    street: '',
    city: '',
    zip: ''
  });
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s+/g, '');
    if (/^4/.test(cleanNumber)) return { type: 'VISA', maxLength: 16 };
    if (/^5[1-5]/.test(cleanNumber) || /^222[1-9]/.test(cleanNumber) || /^22[3-9]/.test(cleanNumber) || /^2[3-6]/.test(cleanNumber) || /^27[0-1]/.test(cleanNumber) || /^2720/.test(cleanNumber)) return { type: 'MASTERCARD', maxLength: 16 };
    if (/^3[47]/.test(cleanNumber)) return { type: 'AMEX', maxLength: 15 };
    return { type: 'UNKNOWN', maxLength: 16 };
  };

  const handleCardNumberChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const { maxLength } = getCardType(numericValue);
    const limitedValue = numericValue.slice(0, maxLength);
    setCard({...card, number: limitedValue});
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const total = subtotal * 1.15;

  const handleComplete = async () => {
    if (!user) {
      alert("Debe iniciar sesión para completar la compra.");
      onNavigate('auth');
      return;
    }

    const cleanNumber = card.number.replace(/\s+/g, '');
    const { maxLength } = getCardType(cleanNumber);
    if (cleanNumber.length !== maxLength) {
        alert(`El número de tarjeta debe tener ${maxLength} dígitos.`);
        return;
    }
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
      alert("La fecha de vencimiento debe tener el formato MM/AA.");
      return;
    }
    if (!/^\d{3,4}$/.test(card.cvc)) {
      alert("El CVC debe tener entre 3 y 4 dígitos.");
      return;
    }
    if (!card.name.trim()) {
      alert("Por favor, ingrese el nombre del titular.");
      return;
    }

    setIsProcessing(true);
    console.log("Processing payment...");
    try {
      await new Promise(r => setTimeout(r, 2000));
      const newOrder = await checkout(`${address.street}, ${address.city}, ${address.zip}`);
      console.log("Payment successful, order:", newOrder);
      setOrder(newOrder);
      setStep(3);
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Fallo en el pago. Por favor, intente de nuevo.");
      setIsProcessing(false);
    } finally {
      console.log("Processing finished.");
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-[60vh] pt-32 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-900">Procesando su pedido...</h2>
        <p className="text-gray-500 mt-2">Estamos finalizando su transacción de forma segura</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
      <div className="mb-12 flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
        {[1, 2, 3].map(s => (
          <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            {s}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        {step === 1 && (
          <div className="p-10 space-y-8">
            <h2 className="text-2xl font-bold">Información de Envío</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  value={address.fullName}
                  onChange={(e) => setAddress({...address, fullName: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 ring-indigo-500 outline-none" 
                  placeholder="Juan Pérez"
                />
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Calle</label>
                <input 
                  type="text" 
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 ring-indigo-500 outline-none" 
                  placeholder="Av. Las Lomas 123"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                <input 
                  type="text" 
                  value={address.city}
                  onChange={(e) => setAddress({...address, city: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 ring-indigo-500 outline-none" 
                  placeholder="Lima"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                <input 
                  type="text" 
                  value={address.zip}
                  onChange={(e) => setAddress({...address, zip: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 ring-indigo-500 outline-none" 
                  placeholder="15001"
                />
              </div>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700"
            >
              Continuar al Pago
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="p-10 space-y-8">
            <h2 className="text-2xl font-bold">Método de Pago</h2>
            <div className="space-y-4">
              <div className="border-2 border-indigo-600 p-6 rounded-2xl bg-indigo-50 flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-indigo-900 rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                  <div>
                    <p className="font-bold">Tarjeta de Crédito (Stripe)</p>
                    <p className="text-sm text-gray-500">Pago seguro con su tarjeta</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border-4 border-indigo-600 bg-white"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="col-span-2">
                  <input type="text" value={card.number} onChange={(e) => handleCardNumberChange(e.target.value)} className="w-full px-4 py-3 border rounded-xl" placeholder="Número de tarjeta" />
                </div>
                <div className="col-span-2">
                  <input type="text" value={card.name} onChange={(e) => setCard({...card, name: e.target.value})} className="w-full px-4 py-3 border rounded-xl" placeholder="Nombre en la tarjeta" />
                </div>
                <input type="text" value={card.expiry} onChange={(e) => setCard({...card, expiry: e.target.value})} className="w-full px-4 py-3 border rounded-xl" placeholder="MM/AA" />
                <input type="text" value={card.cvc} onChange={(e) => setCard({...card, cvc: e.target.value})} className="w-full px-4 py-3 border rounded-xl" placeholder="CVC" />
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Total a pagar:</span>
                <span className="text-3xl font-extrabold text-indigo-600">S/. {total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400">Al pagar, usted acepta nuestros términos de servicio.</p>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 py-4 border border-gray-200 rounded-xl font-bold hover:bg-gray-50">Atrás</button>
              <button onClick={handleComplete} className="flex-[2] bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700">Pagar Ahora</button>
            </div>
          </div>
        )}
        {step === 3 && order && (
          <div className="p-10 text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </motion.div>
            <h1 className="text-4xl font-extrabold mb-6 tracking-tight luxury-serif text-black">Pago Procesado con Éxito</h1>
            <p className="text-lg text-gray-500 mb-12 max-w-lg mx-auto">Su transacción ha sido confirmada. El pedido <span className="font-mono font-bold text-indigo-600">#{order.id}</span> ya está siendo preparado.</p>
            <div className="bg-gray-50 p-6 rounded-2xl text-left mb-12 overflow-hidden relative">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Detalles de la Transacción</h3>
              <p className="text-md font-medium text-gray-800">{order.shippingAddress}</p>
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Pago Total</p>
                  <p className="text-xl font-bold">S/. {order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('home')}
              className="px-12 py-4 bg-black text-white rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-gray-800 transition-all"
            >
              Regresar al Inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
