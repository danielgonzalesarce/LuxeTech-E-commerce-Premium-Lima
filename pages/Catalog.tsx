
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Product } from '../types';
import { EnhancedCategory } from '../constants';

interface CatalogProps {
  initialCategoryId?: string;
  onNavigate: (page: string, params?: any) => void;
  search?: string;
}

const ITEMS_PER_PAGE = 12;

const Catalog: React.FC<CatalogProps> = ({ initialCategoryId, onNavigate, search }) => {
  const { products, categories, favorites, toggleFavorite } = useApp();
  const [searchTerm, setSearchTerm] = useState(search || '');
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId || 'all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'newest'>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [currentPage, setCurrentPage] = useState(1);

  // Sincronizar con el cambio de categoría o búsqueda externa
  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategory(initialCategoryId);
      setCurrentPage(1);
    }
    if (search !== undefined) {
      setSearchTerm(search);
      setCurrentPage(1);
    }
  }, [initialCategoryId, search]);

  const currentCategoryData = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return (categories as EnhancedCategory[]).find(c => c.id === selectedCategory);
  }, [selectedCategory, categories]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             p.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortOrder === 'asc') return a.price - b.price;
        if (sortOrder === 'desc') return b.price - a.price;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, searchTerm, selectedCategory, priceRange, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Dinámico de Colección */}
      <AnimatePresence mode="wait">
        {currentCategoryData ? (
          <motion.section 
            key={currentCategoryData.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-black text-white pt-32 pb-24 px-6 sm:px-10 lg:px-16"
          >
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div className="space-y-6">
                <p className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px]">
                  Colección Curada / {currentCategoryData.name}
                </p>
                <h1 className="text-7xl md:text-8xl font-bold tracking-tighter luxury-serif leading-none">
                  {currentCategoryData.slogan}
                </h1>
              </div>
              <div className="space-y-8">
                <p className="text-white/40 text-xl font-light leading-relaxed max-w-xl">
                  {currentCategoryData.description}
                </p>
                <div className="flex items-center gap-12">
                  <div className="h-px flex-grow bg-white/10" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">
                    {filteredProducts.length} REFERENCIAS ACTIVAS
                  </span>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
              <div className="space-y-4">
                <h1 className="text-7xl font-bold tracking-tighter luxury-serif">El Archivo.</h1>
                <p className="text-gray-400 font-medium">Ingeniería de precisión a través de {products.length} productos únicos.</p>
              </div>
              <div className="relative w-full lg:w-[500px]">
                <input 
                  type="text" 
                  placeholder="Consultar catálogo..." 
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-white border-b-2 border-gray-100 py-6 text-2xl font-light focus:outline-none focus:border-black transition-all placeholder:text-gray-200"
                />
                <div className="absolute right-0 bottom-6 text-gray-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
            </div>
          </section>
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Sidebar de Filtros */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-16">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">Clasificación</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                <button 
                  onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
                  className={`text-left px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === 'all' ? 'bg-black text-white' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}
                >
                  Universal
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                    className={`text-left px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.id ? 'bg-black text-white' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">Rango de Precio</h3>
              <div className="space-y-6">
                <input 
                  type="range" min="0" max="5000" step="100"
                  value={priceRange[1]}
                  onChange={(e) => { setPriceRange([0, parseInt(e.target.value)]); setCurrentPage(1); }}
                  className="w-full h-[2px] bg-gray-100 appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-[11px] font-bold tracking-widest text-gray-900">
                  <span>S/. 0</span>
                  <span>HASTA S/. {priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">Ordenar por</h3>
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="w-full bg-transparent border-b border-gray-100 py-3 text-sm font-bold focus:outline-none focus:border-black transition-all appearance-none cursor-pointer"
              >
                <option value="newest">Lanzamientos Recientes</option>
                <option value="asc">Precio: Menor a Mayor</option>
                <option value="desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </aside>

          {/* Contenido Grid con Paginación */}
          <main className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
              <AnimatePresence mode="popLayout">
                {paginatedProducts.length > 0 ? paginatedProducts.map((product, idx) => (
                  <motion.div 
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx % 6 * 0.05 }}
                    onClick={() => onNavigate('product', { product })}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[3/4] rounded-[40px] overflow-hidden bg-gray-50 border border-gray-100/50 mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                    <div className="px-2 space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold tracking-tight text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                        <p className="text-lg font-black text-gray-300 group-hover:text-black transition-colors">S/. {product.price}</p>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">
                        {product.stock > 0 ? `${product.stock} en Stock` : 'Agotado'}
                      </p>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-full py-40 text-center">
                    <p className="text-gray-300 text-2xl font-bold luxury-serif">No se encontraron resultados para su búsqueda.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Paginación Real */}
            {totalPages > 1 && (
              <div className="mt-32 flex justify-center items-center gap-12">
                <button 
                  onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); window.scrollTo(0, 0); }}
                  disabled={currentPage === 1}
                  className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-widest disabled:opacity-20"
                >
                  <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  Anterior
                </button>
                <div className="flex gap-4">
                  <span className="text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Página {currentPage} de {totalPages}</span>
                </div>
                <button 
                  onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); window.scrollTo(0, 0); }}
                  disabled={currentPage === totalPages}
                  className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-widest disabled:opacity-20"
                >
                  Siguiente
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
