"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import Link from "next/link";
import Select from 'react-select';
import { countries } from './countries';
import { IconUser } from "@tabler/icons-react";
import Image from 'next/image';
import type { CartItem } from './types';
import type { StylesConfig, GroupBase, ControlProps, OptionProps, SingleValueProps, MenuProps, CSSObjectWithLabel } from 'react-select';

const customSelectStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: (provided: CSSObjectWithLabel, state: ControlProps<{ value: string; label: string }, false, GroupBase<{ value: string; label: string }>>) => ({
        ...provided,
        backgroundColor: 'white',
        borderColor: state.isFocused ? '#fb923c' : '#fed7aa',
        boxShadow: state.isFocused ? '0 0 0 2px #fb923c33' : undefined,
        borderRadius: '0.5rem',
        minHeight: '2.5rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        fontSize: '1rem',
        transition: 'all 0.2s',
    }),
    option: (provided: CSSObjectWithLabel, state: OptionProps<{ value: string; label: string }, false, GroupBase<{ value: string; label: string }>>) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#fb923c' : state.isFocused ? '#fed7aa' : 'white',
        color: state.isSelected ? 'white' : '#1f2937',
        fontSize: '1rem',
    }),
    singleValue: (provided: CSSObjectWithLabel, _state: SingleValueProps<{ value: string; label: string }, false, GroupBase<{ value: string; label: string }>>) => ({
        ...provided,
        color: '#1f2937',
    }),
    menu: (provided: CSSObjectWithLabel, _state: MenuProps<{ value: string; label: string }, false, GroupBase<{ value: string; label: string }>>) => ({
        ...provided,
        borderRadius: '0.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        zIndex: 20,
    }),
};

export default function CheckoutPage() {
    const { items } = useCart();
    const [cart, setCart] = useState<CartItem[]>(items);
    const [selectedCountry, setSelectedCountry] = useState<{ value: string; label: string } | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('cart_items');
            setCart(stored ? JSON.parse(stored) : []);
        }
    }, []);

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center py-12 px-4 md:px-0">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
                {/* Left: Checkout Form */}
                <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-orange-100">
                    <h2 className="text-2xl font-bold mb-6 text-orange-600">Checkout</h2>
                    <div className="flex items-center mb-4 gap-2 text-orange-600">
                        <div className="bg-orange-500 rounded-md text-white flex items-center justify-center w-8 h-8">
                            <h1 className="text-sm font-semibold">1</h1>
                        </div>
                        <h1 className="font-semibold text-md">User Information</h1>
                    </div>
                    <form className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input type="text" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="Your First Name" required />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input type="text" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="Your Last Name" required />
                            </div>

                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="you@email.com" required />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="text" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="+31 6 00 00 00 00" required />
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <Select
                                    options={countries}
                                    value={selectedCountry}
                                    onChange={setSelectedCountry}
                                    placeholder="Select a country..."
                                    isSearchable
                                    classNamePrefix="react-select"
                                    styles={customSelectStyles}
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Postal code</label>
                                <input type="text" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="Postal code" required />
                            </div>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea name="address" id="address" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="Enter your address" required></textarea>
                        </div>
                        <div className="flex items-center mb-4 gap-2 text-orange-600">
                            <div className="bg-orange-500 rounded-md text-white flex items-center justify-center w-8 h-8">
                                <h1 className="text-sm font-semibold">2</h1>
                            </div>
                            <h1 className="font-semibold text-md">Payment Details</h1>
                        </div>

                        {/* Payment Details (stripe integration) */}

                        <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl text-lg transition-all duration-200 mt-4">Complete Purchase</button>
                    </form>




                </div>
                {/* Right: Cart Summary */}
                <div className="w-full md:w-96 p-8 bg-orange-50">
                    <h3 className="text-xl font-bold mb-4 text-orange-600">Order Summary</h3>
                    {cart.length === 0 ? (
                        <div className="text-orange-400 text-center py-8">Your cart is empty.</div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item: CartItem) => (
                                <div key={item._id} className="flex items-center gap-4 bg-white rounded-lg shadow p-3">
                                    <Image src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" width={56} height={56} />
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-900">{item.name}</div>
                                        <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                                    </div>
                                    <div className="font-bold text-orange-600">${item.price}</div>
                                </div>
                            ))}
                            <div className="flex justify-between items-center border-t pt-4 mt-4">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-lg text-orange-600">
                                    ${cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}
                    <Link href="/shop" className="block text-center text-orange-500 mt-6 hover:underline">Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
}
