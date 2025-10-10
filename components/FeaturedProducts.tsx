"use client";
import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Eye, Share2 } from 'lucide-react';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useCart } from './CartContext';
import Image from 'next/image';
import type { Product, CartItem } from './types';
import { SECTION_CONTAINER } from '@/lib/styles';

const FeaturedProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLiked, setIsLiked] = useState<boolean[]>([]);
    const [selectedImage, setSelectedImage] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { items, setItems, setIsOpen } = useCart();

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            setError(false);
            try {
                const res = await fetch('/api/products');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                // Only show Published products, sort by createdAt desc, take first 3
                const published = data.filter((p: Product) => p.status === 'Published');
                const sorted = published.sort((a: Product, b: Product) => new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime());
                const latest = sorted.slice(0, 3);
                setProducts(latest);
                setIsLiked(Array(latest.length).fill(false));
                setSelectedImage(Array(latest.length).fill(0));
            } catch {
                setError(true);
            }
            setLoading(false);
        }
        fetchProducts();
    }, []);

    return (
        <div className={SECTION_CONTAINER}>
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold">
                        Featured <span className="text-orange-500">Products</span>
                    </h2>
                    <div className="w-44 h-1 bg-orange-500 rounded-none" />
                </div>
                <div className='flex flex-row items-center gap-2 text-orange-500 font-semibold cursor-pointer ml-8'>
                    <a href="/shop" className="text-orange-500 cursor-pointer">View all</a><IconArrowRight />
                </div>
            </div>

            {loading ? (
                <div className="w-full flex justify-center items-center py-20 text-orange-500 font-bold text-xl">Loading products...</div>
            ) : error ? (
                <div className="w-full flex justify-center items-center py-20 text-orange-400 font-bold text-xl">Failed to load products.</div>
            ) : products.length === 0 ? (
                <div className="w-full flex justify-center items-center py-20 text-orange-400 font-bold text-xl">No featured products available.</div>
            ) : (
            <div className="flex flex-row gap-8 my-10 flex-wrap justify-center">
                {products.map((product, idx) => (
                    <div key={product._id} className="max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                        {/* Image Section */}
                        <Link href={`/products/${product._id}`} prefetch={false}>
                            <div className="relative overflow-hidden cursor-pointer">
                                {/* Top Badges */}
                                <div className="absolute top-3 left-3 flex gap-2 z-10">
                                    {product.productDiscountedPrice && (
                                        <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                            -{Math.round(100 - (product.productDiscountedPrice / product.productPrice) * 100)}%
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <div className={`w-2 h-2 rounded-full ${product.inStock === 'yes' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${product.inStock === 'yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {product.inStock === 'yes' ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>
                                {/* Action Buttons */}
                                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                    <button
                                        onClick={() => {
                                            const updated = [...isLiked];
                                            updated[idx] = !updated[idx];
                                            setIsLiked(updated);
                                        }}
                                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${isLiked[idx]
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                                            }`}
                                    >
                                        <Heart className={`w-4 h-4 ${isLiked[idx] ? 'fill-current' : ''}`} />
                                    </button>
                                    <button className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200 backdrop-blur-sm">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-200 backdrop-blur-sm">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                                {/* Main Product Image */}
                                <div className="aspect-square overflow-hidden bg-orange-50 flex items-center justify-center">
                                    {product.images && product.images.length > 0 ? (
                                        <Image
                                            src={product.images[selectedImage[idx]] || product.images[0]}
                                            alt={product.productTitle}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            width={400}
                                            height={400}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-orange-300">No Image</div>
                                    )}
                                </div>
                                {/* Image Thumbnails */}
                                {product.images && product.images.length > 1 && (
                                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                                        {product.images.map((_: string, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    const updated = [...selectedImage];
                                                    updated[idx] = index;
                                                    setSelectedImage(updated);
                                                }}
                                                className={`w-2 h-2 rounded-full transition-all duration-200 ${selectedImage[idx] === index ? 'bg-white' : 'bg-white/50'}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                        {/* Content Section */}
                        <div className="p-5">
                            <span className="text-xs font-medium text-orange-600 uppercase tracking-wide mb-2 block">
                                {product.vendor && typeof product.vendor === 'string' && product.vendor.trim() !== '' ? product.vendor : 'No Merchant'}
                            </span>
                            <Link href={`/products/${product._id}`} prefetch={false}>
                                <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors cursor-pointer">
                                    {product.productTitle}
                                </h3>
                            </Link>
                            <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl font-bold text-gray-900">
                                    ${product.productDiscountedPrice ?? product.productPrice}
                                </span>
                                {product.productDiscountedPrice && (
                                    <span className="text-sm text-gray-500 line-through">
                                        ${product.productPrice}
                                    </span>
                                )}
                            </div>
                            <button
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                                disabled={product.inStock !== 'yes'}
                                onClick={() => {
                                    if (product.inStock !== 'yes') return;
                                    if (!product._id) {
                                        alert('This product cannot be added to cart (missing ID).');
                                        return;
                                    }
                                    // Prepare cart item with expected fields
                                    const cartItem = {
                                        _id: product._id,
                                        name: product.productTitle,
                                        image: product.images && product.images.length > 0 ? product.images[0] : '',
                                        price: product.productDiscountedPrice ?? product.productPrice,
                                        quantity: 1,
                                    };
                                    // Check if already in cart
                                    const existing = items.find((item: CartItem) => item._id === product._id);
                                    if (existing) {
                                        setItems(items.map((item: CartItem) =>
                                            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                                        ));
                                    } else {
                                        setItems([
                                            ...items,
                                            cartItem
                                        ]);
                                    }
                                    setIsOpen(true); // Optionally open cart drawer
                                }}
                            >
                                <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                {product.inStock === 'yes' ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}

export default FeaturedProducts;
