
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Product, OrderStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LayoutDashboard, Package, ShoppingCart, Search, Bell, Settings, User } from 'lucide-react';

const Admin: React.FC = () => {
  const { products, orders, updateProduct, deleteProduct, createProduct, updateOrderStatus, categories } = useApp();
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders' | 'customers' | 'settings'>('stats');

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

  const sidebarLinks = [
    { icon: LayoutDashboard, name: 'Panel de Control', id: 'stats' },
    { icon: Package, name: 'Productos', id: 'products' },
    { icon: ShoppingCart, name: 'Pedidos', id: 'orders' },
    { icon: User, name: 'Clientes', id: 'customers' },
    { icon: Settings, name: 'Ajustes', id: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
          <span className="font-bold text-lg">LuxeTech Admin</span>
        </div>
        
        <nav className="space-y-2 flex-grow">
          {sidebarLinks.map(link => (
            <button 
              key={link.id}
              onClick={() => setActiveTab(link.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === link.id ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <link.icon size={20} />
              {link.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
             <h1 className="font-bold text-xl uppercase tracking-tight">
               {sidebarLinks.find(l => l.id === activeTab)?.name}
             </h1>
          </div>
          <div className="flex items-center gap-4">
             <button className="text-gray-500 hover:text-gray-900"><Search size={20} /></button>
             <button className="text-gray-500 hover:text-gray-900"><Bell size={20} /></button>
             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">A</div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'stats' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Ingresos Totales", value: `S/. ${totalSales.toFixed(2)}` },
                  { label: "Pedidos", value: orders.length },
                  { label: "Productos", value: products.length }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-extrabold mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold mb-6">Rendimiento Semanal</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                      <YAxis hide />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
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
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-lg">Catálogo de Productos</h2>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">+ Añadir Producto</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
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
                        <td className="px-6 py-4 flex items-center font-medium">
                          <img src={p.images[0]} className="w-10 h-10 rounded-lg object-cover mr-3 bg-gray-100" />
                          {p.name}
                        </td>
                        <td className="px-6 py-4">S/. {p.price}</td>
                        <td className="px-6 py-4"><span className="bg-gray-100 px-2.5 py-0.5 rounded-full text-xs font-medium">{p.stock}</span></td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700 text-xs font-semibold">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-lg">Pedidos Recientes</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                    <tr>
                      <th className="px-6 py-4">ID Pedido</th>
                      <th className="px-6 py-4">Cliente</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{o.id.substring(0,8)}...</td>
                        <td className="px-6 py-4 font-medium">{o.shippingAddress.split(',')[0]}</td>
                        <td className="px-6 py-4 font-semibold">S/. {o.total.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <select 
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                            className="bg-gray-100 border border-transparent hover:border-gray-300 rounded-lg px-2 py-1 text-xs font-semibold"
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
          
          {(activeTab === 'customers' || activeTab === 'settings') && (
             <div className="bg-white p-12 rounded-2xl border border-gray-200 shadow-sm text-center">
                 <h2 className="text-xl font-bold mb-2">Sección en Construcción</h2>
                 <p className="text-gray-500">Esta funcionalidad estará disponible pronto.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
