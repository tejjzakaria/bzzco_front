'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import type { CartItem } from './types';

const CartContext = createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
} | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItemsState] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('cart_items');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  // Custom setItems that also updates localStorage immediately
  const setItems = (newItems: CartItem[]) => {
    setItemsState(newItems);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart_items', JSON.stringify(newItems));
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart_items', JSON.stringify(items));
    }
  }, [items]);

  return (
    <CartContext.Provider value={{ isOpen, setIsOpen, items, setItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
