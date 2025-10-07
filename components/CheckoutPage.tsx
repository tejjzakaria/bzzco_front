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
import { useRouter } from 'next/navigation';

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
    const { items, setItems } = useCart();
    const [cart, setCart] = useState<CartItem[]>(items);
    const [selectedCountry, setSelectedCountry] = useState<{ value: string; label: string } | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
    const router = useRouter();

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
                    <form className="space-y-4" onSubmit={async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    // Collect form data
    const firstName = (form.querySelector('input[placeholder="Your First Name"]') as HTMLInputElement)?.value || '';
    const lastName = (form.querySelector('input[placeholder="Your Last Name"]') as HTMLInputElement)?.value || '';
    const email = (form.querySelector('input[type="email"]') as HTMLInputElement)?.value || '';
    const phone = (form.querySelector('input[placeholder^="+31"]') as HTMLInputElement)?.value || '';
    const postalCode = (form.querySelector('input[placeholder="Postal code"]') as HTMLInputElement)?.value.trim() || '';
    const address = (form.querySelector('textarea[name="address"]') as HTMLTextAreaElement)?.value.trim() || '';
    const city = (form.querySelector('input[placeholder="City"]') as HTMLInputElement)?.value.trim() || '';
    const country = selectedCountry?.label?.trim() || '';
    if (!address || !city || !postalCode || !country) {
        alert('Please fill in all address fields.');
        return;
    }
    // Prepare order payload (guest checkout)
    const orderPayload = {
        order_number: `BZZ-${Date.now()}`,
        customer_type: 'guest',
        guest_name: `${firstName} ${lastName}`.trim(),
        guest_email: email,
        guest_phone: phone,
        products: cart.map(item => ({
            product_id: item._id,
            quantity: item.quantity,
            unit_price: item.price,
            total_price: item.price * item.quantity
        })),
        total_price: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: 'Pending',
        shipping_address: {
            street: address,
            city: city,
            postal_code: postalCode,
            country: country
        },
        billing_address: {
            street: address,
            city: city,
            postal_code: postalCode,
            country: country
        },
        payment_method: paymentMethod,
        payment_status: 'Unpaid',
    };
    try {
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload)
        });
        if (res.ok) {
            setItems([]); // clear cart
            localStorage.removeItem('cart_items');
            router.push(`/order-confirmation?order=${orderPayload.order_number}`);
        } else {
            alert('Order failed. Please try again.');
        }
    } catch (err) {
        alert('Order failed. Please try again.');
    }
}}>
                        <div className="flex items-center justify-between gap-2">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input type="text" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="Your First Name" required defaultValue="John" />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input type="text" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="Your Last Name" required defaultValue="Doe" />
                            </div>

                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="you@email.com" required defaultValue="john.doe@example.com" />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="text" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="+31 6 00 00 00 00" required defaultValue="+31 6 12 34 56 78" />
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input type="text" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="City" required defaultValue="Amsterdam" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Postal code</label>
                                <input type="text" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="Postal code" required defaultValue="1234 AB" />
                            </div>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea name="address" id="address" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="Enter your address" required defaultValue="123 Main St, Amsterdam" ></textarea>
                        </div>
                        <div className="flex items-center mb-4 gap-2 text-orange-600">
                            <div className="bg-orange-500 rounded-md text-white flex items-center justify-center w-8 h-8">
                                <h1 className="text-sm font-semibold">2</h1>
                            </div>
                            <h1 className="font-semibold text-md">Payment Details</h1>
                        </div>

                        {/* Payment Method Tabs */}
                        <div className="mb-4">
                            <div className="flex gap-2 mb-4">
                                <button
                                    type="button"
                                    className={`flex-1 py-2 rounded-lg font-semibold border transition-all duration-150 ${paymentMethod === 'card' ? 'bg-orange-500 text-white border-orange-500' : 'bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200'}`}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    Credit/Debit Card
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 py-2 rounded-lg font-semibold border transition-all duration-150 ${paymentMethod === 'paypal' ? 'bg-orange-500 text-white border-orange-500' : 'bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200'}`}
                                    onClick={() => setPaymentMethod('paypal')}
                                >
                                    PayPal
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 py-2 rounded-lg font-semibold border transition-all duration-150 ${paymentMethod === 'apple' ? 'bg-orange-500 text-white border-orange-500' : 'bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200'}`}
                                    onClick={() => setPaymentMethod('apple')}
                                >
                                    Apple Pay
                                </button>
                            </div>
                            {/* Payment Method Forms */}
                            {paymentMethod === 'card' && (
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                        <input type="text" inputMode="numeric" pattern="[0-9 ]*" maxLength={19} className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="1234 5678 9012 3456" required defaultValue="4242 4242 4242 4242" />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                                            <input type="text" inputMode="numeric" pattern="[0-9]{2}/[0-9]{2}" maxLength={5} className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="MM/YY" required defaultValue="12/29" />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                            <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={4} className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="CVC" required defaultValue="123" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                                        <input type="text" className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="Cardholder Name" required defaultValue="John Doe" />
                                    </div>
                                </div>
                            )}
                            {paymentMethod === 'paypal' && (
                                <div className="flex flex-col items-center gap-4 py-4">
                                    <img src="/paypal.svg" alt="PayPal" className="h-8" />
                                    <p className="text-gray-600">You will be redirected to PayPal to complete your purchase.</p>
                                </div>
                            )}
                            {paymentMethod === 'apple' && (
                                <div className="flex flex-col items-center gap-4 py-4">
                                    <img src="/apple-pay.svg" alt="Apple Pay" className="h-8" />
                                    <p className="text-gray-600">You will be prompted to pay with Apple Pay on supported devices.</p>
                                </div>
                            )}
                        </div>
                        {/* End Payment Method Tabs */}
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
