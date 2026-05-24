
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Product, OrderStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Admin: React.FC = () => {
  const { products, orders, updateProduct, deleteProduct, createProduct, updateOrderStatus, categories } = useApp();
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders'>('stats');

  const totalSales = orders.reduce((acc, o) => acc + o.total, 0);
  const revenueData = [
    { name: 'Lun', amount: 4000 },
    { name: 'Mar', amount: 3000 },
    { name: 'Mié', amount: 2000 },
    { name: 'Jue', amount: 2780 },
    { name: 'Vie', amount: 1890 },
    { name: 'Sáb', amount: 2390 },
    { name: 'Dom', amount: 3490 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-2">
          <button 
            onClick={() => setActiveTab('stats')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'stats' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-white border border-transparent hover:border-gray-200'}`}
          >
            📊 Panel
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-white border border-transparent hover:border-gray-200'}`}
          >
            📦 Productos
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-white border border-transparent hover:border-gray-200'}`}
          >
            📜 Pedidos
          </button>
        </aside>

        <main className="flex-grow">
          {activeTab === 'stats' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-gray-500 text-sm">Ingresos Totales</p>
                  <p className="text-3xl font-extrabold mt-1">S/. {totalSales.toFixed(2)}</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-gray-500 text-sm">Pedidos</p>
                  <p className="text-3xl font-extrabold mt-1">{orders.length}</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-gray-500 text-sm">Productos</p>
                  <p className="text-3xl font-extrabold mt-1">{products.length}</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-8">Pronóstico Semanal</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 4 ? '#4F46E5' : '#E5E7EB'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Catálogo de Productos</h2>
                <button 
                  onClick={() => {
                    const name = prompt("¿Nombre del producto?");
                    const price = prompt("¿Precio?");
                    if (name && price) {
                      const slug = name.toLowerCase().replace(/ /g, '-');
                      createProduct({
                        name,
                        slug,
                        description: "Descripción del nuevo producto premium LuxeTech.",
                        price: parseFloat(price),
                        stock: 10,
                        categoryId: "1",
                        images: [`https://images.unsplash.com/featured/?${slug},tech&sig=${Date.now()}`]
                      });
                    }
                  }}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-600 transition-colors"
                >
                  + Añadir Producto
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                    <tr>
                      <th className="px-6 py-4">Producto</th>
                      <th className="px-6 py-4">Precio</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.slice(0, 15).map(p => (
                      <tr key={p.id}>
                        <td className="px-6 py-4 flex items-center">
                          <img src={p.images[0]} className="w-10 h-10 rounded-lg object-cover mr-3" />
                          <span className="font-medium">{p.name}</span>
                        </td>
                        <td className="px-6 py-4">S/. {p.price}</td>
                        <td className="px-6 py-4">{p.stock}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:text-red-800 font-bold text-xs">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Pedidos Recientes</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Cliente</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td className="px-6 py-4 font-mono text-xs">{o.id}</td>
                        <td className="px-6 py-4">{o.shippingAddress.split(',')[0]}</td>
                        <td className="px-6 py-4 font-bold">S/. {o.total.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <select 
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                            className="bg-gray-100 rounded-full px-3 py-1 text-xs font-bold"
                          >
                            <option value={OrderStatus.PAID}>Pagado</option>
                            <option value={OrderStatus.SHIPPED}>Enviado</option>
                            <option value={OrderStatus.DELIVERED}>Entregado</option>
                            <option value={OrderStatus.CANCELLED}>Cancelado</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
