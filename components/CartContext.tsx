'use client';
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItemsState] = useState<any[]>(() => {
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
  const setItems = (newItems: any[]) => {
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
