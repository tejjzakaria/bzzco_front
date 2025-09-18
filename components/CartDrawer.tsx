'use client';

import React from "react";
import { useCart } from "./CartContext";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { CartItem } from './types';

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, setItems } = useCart();
  const router = useRouter();
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-96 max-w-full h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button className="absolute top-4 right-4 text-2xl" onClick={() => setIsOpen(false)}>✕</button>
        <h2 className="text-xl font-bold p-4 border-b border-orange-100">Your Cart</h2>
        <div className="p-4 pb-32">
          {items.length === 0 ? (
            <div className="text-orange-400 text-center py-8">Cart is empty</div>
          ) : (
            items.map((item: CartItem) => (
              <div key={item._id} className="flex items-center gap-4 py-2 border-b border-orange-50">
                <Image src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" width={56} height={56} />
                <div className="flex-1">
                  <div className="font-semibold w-[50px]">{item.name}</div>
                  <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                </div>
                <div className="font-bold text-orange-600">${item.price}</div>
                <button
                  className="ml-2 text-red-500 hover:text-red-700 text-lg font-bold px-2 py-1 rounded transition-colors"
                  title="Remove from cart"
                  onClick={() => {
                    const filtered = items.filter((i: CartItem) => i._id !== item._id);
                    setItems(filtered);
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('cart_items', JSON.stringify(filtered));
                    }
                  }}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        {/* Checkout Button */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-orange-100 z-10">
            <button
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl text-lg transition-all duration-200"
              onClick={async () => {
                setIsOpen(false);
                if (typeof window !== 'undefined') {
                  await new Promise(r => setTimeout(r, 50)); // allow localStorage to flush
                }
                router.push('/checkout');
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
