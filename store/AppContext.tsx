
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, User, CartItem, Order, OrderStatus, UserRole } from '../types';
import { INITIAL_PRODUCTS, CATEGORIES } from '../constants';

interface AppContextType {
  products: Product[];
  categories: typeof CATEGORIES;
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  login: (email: string) => void;
  // Added register method to AppContextType to fix TypeScript error in Auth.tsx
  register: (name: string, email: string) => void;
  logout: () => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: (address: string) => Promise<Order>;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  createProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [products, user, cart, orders]);

  const login = (email: string) => {
    const isAdmin = email.includes('admin');
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: isAdmin ? 'Administrador LuxeTech' : 'Cliente Premium',
      email,
      role: isAdmin ? UserRole.ADMIN : UserRole.CUSTOMER,
      createdAt: new Date().toISOString()
    });
  };

  // Added register implementation to handle new user registration in Auth.tsx
  const register = (name: string, email: string) => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: UserRole.CUSTOMER,
      createdAt: new Date().toISOString()
    });
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) } 
            : item
        );
      }
      return [...prev, { productId: product.id, quantity, product }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const checkout = async (address: string): Promise<Order> => {
    if (!user) throw new Error("Authentication required");
    const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    
    // Update inventory
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(ci => ci.productId === p.id);
      if (cartItem) {
        return { ...p, stock: p.stock - cartItem.quantity };
      }
      return p;
    }));

    const newOrder: Order = {
      id: `PED-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      userId: user.id,
      items: [...cart],
      total,
      status: OrderStatus.PAID,
      shippingAddress: address,
      paymentIntentId: `pi_${Math.random().toString(36).substr(2, 12)}`,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const createProduct = (p: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...p,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <AppContext.Provider value={{
      products, categories: CATEGORIES, user, cart, orders,
      login, register, logout, addToCart, removeFromCart, updateCartQuantity, clearCart, checkout,
      updateProduct, deleteProduct, createProduct, updateOrderStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
