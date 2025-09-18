import type { StaticImageData } from 'next/image';

export interface Product {
  _id: string;
  productTitle: string;
  description: string;
  vendor: string | { full_name?: string };
  category: string;
  images: string[];
  productPrice: number;
  productDiscountedPrice?: number;
  inStock: 'yes' | 'no';
  productSku?: string;
  productBarcode?: string;
  weight?: number;
  manufacturer?: string;
  dimensions?: string;
  quantity?: number;
  status?: string;
  createdAt?: string;
}

export interface Merchant {
  _id: string;
  name: string;
  subtitle?: string;
  logo: string;
  category?: { name?: string };
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
}

export interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
