
import { Category, Product } from './types';

export interface EnhancedCategory extends Category {
  description: string;
  slogan: string;
  imageUrl: string;
}

const IMG_TECH_CAT = 'photo-1496181133206-80ce9b88a853'; // Laptop premium (Vanguardia Digital)
const IMG_FASHION_CAT = 'photo-1558769132-cb1aea458c5e'; // ID preciso para los colgadores con ropa blanca/tierra
const IMG_HOME_CAT = 'photo-1618221195710-dd6b41faaea6'; // Interior minimalista premium (Hábitat Inteligente)
const IMG_SPORT_CAT = 'photo-1534438327276-14e5300c3a48'; // Imagen de levantamiento de pesas
const IMG_BEAUTY_CAT = 'photo-1612817288484-6f916006741a'; // Skincare orgánico premium (Estética Orgánica)

export const CATEGORIES: EnhancedCategory[] = [
  { 
    id: '1', 
    name: 'Electrónica', 
    slug: 'electronica',
    slogan: 'VANGUARDIA DIGITAL',
    description: 'Processing systems and smart devices defining the digital frontier.',
    imageUrl: `https://images.unsplash.com/${IMG_TECH_CAT}?auto=format&fit=crop&q=80&w=1200`
  },
  { 
    id: '2', 
    name: 'Vestimenta', 
    slug: 'vestimenta',
    slogan: 'ALTA COSTURA TECH',
    description: 'Technical textiles and timeless silhouettes for the modern aesthetic.',
    imageUrl: `https://images.unsplash.com/${IMG_FASHION_CAT}?auto=format&fit=crop&q=80&w=1200`
  },
  { 
    id: '3', 
    name: 'Hogar y Estilo', 
    slug: 'hogar-estilo',
    slogan: 'HÁBITAT INTELIGENTE',
    description: 'Design objects transforming everyday spaces into sanctuaries.',
    imageUrl: `https://images.unsplash.com/${IMG_HOME_CAT}?auto=format&fit=crop&q=80&w=1200`
  },
  { 
    id: '4', 
    name: 'Deportes', 
    slug: 'deportes',
    slogan: 'DINÁMICA HUMANA',
    description: 'Equipment engineered to amplify physical potential.',
    imageUrl: `https://images.unsplash.com/${IMG_SPORT_CAT}?auto=format&fit=crop&q=80&w=1200`
  },
  { 
    id: '5', 
    name: 'Belleza', 
    slug: 'belleza',
    slogan: 'ESTÉTICA ORGÁNICA',
    description: 'Personal care elevated through bio-science and art.',
    imageUrl: `https://images.unsplash.com/${IMG_BEAUTY_CAT}?auto=format&fit=crop&q=80&w=1200`
  }
];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const brands = ['Aura', 'Nova', 'Zenith', 'Apex', 'Flux', 'Vortex', 'Element'];
  
  const imagePools: Record<string, string[]> = {
    '1': ['photo-1505740420928-5e560c06d30e', 'photo-1523275335684-37898b6baf30', 'photo-1491933382434-500287f9b54b'],
    '2': ['photo-1558769132-cb1aea458c5e', 'photo-1551028719-00167b16eac5', 'photo-1591047139396-74345c60e452'],
    '3': ['photo-1518455027359-f3f816b1a238', 'photo-1534073828943-f801091bb18c', 'photo-1493663284031-b7e3aefcae8e'],
    '4': ['photo-1534438327276-14e5300c3a48', 'photo-1584735935682-2f2b69dff9d2', 'photo-1571019613454-1cb2f99b2d8b'],
    '5': ['photo-1556228720-195a672e8a03', 'photo-1612817288484-6f916006741a', 'photo-1512496011212-32ec354d5b4a']
  };

  const getNamesList = (catId: string) => {
    switch (catId) {
      case '1': return ['Smartphone', 'Laptop', 'Tablet', 'Audífonos', 'Smartwatch', 'Cámara'];
      case '2': return ['Jeans', 'Camiseta', 'Chaqueta', 'Zapatillas', 'Sudadera', 'Vestido'];
      case '3': return ['Escritorio', 'Lámpara', 'Cafetera', 'Silla', 'Alfombra', 'Jarrón'];
      case '4': return ['Mochila', 'Mancuerna', 'Tapete Yoga', 'Zapatos Running', 'Botella', 'Bicicleta'];
      case '5': return ['Champú', 'Perfume', 'Serum', 'Labial', 'Crema', 'Mascarilla'];
      default: return ['Item'];
    }
  };

  for (let i = 1; i <= 200; i++) {
    const catId = ((i % 5) + 1).toString();
    const names = getNamesList(catId);
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const itemName = names[i % names.length];
    const name = `${brand} ${itemName} ${i}`;
    
    const pool = imagePools[catId];
    const photoId = pool[i % pool.length];
    const secondaryPhotoId = pool[(i + 1) % pool.length];

    products.push({
      id: `prod-${i}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      description: `The ${brand} ${itemName} series represents the pinnacle of LuxeTech design. Precision engineering meets timeless aesthetics.`,
      price: Math.floor(Math.random() * 3500) + 200,
      stock: Math.floor(Math.random() * 50) + 5,
      categoryId: catId,
      images: [
        `https://images.unsplash.com/${photoId}?auto=format&fit=crop&q=80&w=800`,
        `https://images.unsplash.com/${secondaryPhotoId}?auto=format&fit=crop&q=80&w=800`
      ],
      featured: i <= 12,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString()
    });
  }
  return products;
};

export const INITIAL_PRODUCTS = generateProducts();
