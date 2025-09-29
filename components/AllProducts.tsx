"use client";
import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Eye, Share2 } from 'lucide-react';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from './CartContext';
import Image from 'next/image';
import type { Product, CartItem } from './types';

const AllProducts = () => {
    const [isLiked, setIsLiked] = useState<boolean[]>([]);
    const [selectedImage, setSelectedImage] = useState<number[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["All Categories"]);
    const [selectedMerchants, setSelectedMerchants] = useState<string[]>(["All Merchants"]);
    const [categoryOpen, setCategoryOpen] = useState(true);
    const [merchantOpen, setMerchantOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>(["All Categories"]);
    const [merchants, setMerchants] = useState<string[]>(["All Merchants"]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 9;
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    const { items, setItems, setIsOpen } = useCart();

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                // Only show Published products
                const published = data.filter((p: Product) => p.status === 'Published');
                setProducts(published);
                setIsLiked(Array(published.length).fill(false));
                setSelectedImage(Array(published.length).fill(0));
                // Extract unique categories from products
                const uniqueCategories = Array.from(new Set(published.map((p: Product) => p.category).filter(Boolean))) as string[];
                setCategories(["All Categories", ...uniqueCategories]);
                // Extract unique merchants from products
                const uniqueMerchants = Array.from(new Set(published.map((p: Product) => p.vendor).filter(Boolean))) as string[];
                setMerchants(["All Merchants", ...uniqueMerchants]);
            } catch (e) {
                setProducts([]);
                setCategories(["All Categories"]);
                setMerchants(["All Merchants"]);
            }
            setLoading(false);
        }
        fetchProducts();
    }, []);

    // Replace single select logic with multi-select for categories
    const handleCategoryClick = (cat: string) => {
        if (cat === "All") {
            setSelectedCategories(["All"]);
        } else {
            setSelectedCategories((prev) => {
                const filtered = prev.filter((c) => c !== "All");
                if (filtered.includes(cat)) {
                    return filtered.length === 1 ? ["All"] : filtered.filter((c) => c !== cat);
                } else {
                    return [...filtered, cat];
                }
            });
        }
    };
    // Multi-select for merchants
    const handleMerchantClick = (merchant: string) => {
        if (merchant === "All Merchants") {
            setSelectedMerchants(["All Merchants"]);
        } else {
            setSelectedMerchants((prev) => {
                const filtered = prev.filter((m) => m !== "All Merchants");
                if (filtered.includes(merchant)) {
                    return filtered.length === 1 ? ["All Merchants"] : filtered.filter((m) => m !== merchant);
                } else {
                    return [...filtered, merchant];
                }
            });
        }
    };

    // Helper: count products per category
    const categoryCounts = categories.reduce((acc, cat) => {
        if (cat === "All Categories") {
            acc[cat] = products.length;
        } else {
            acc[cat] = products.filter((p) => p.category === cat).length;
        }
        return acc;
    }, {} as Record<string, number>);
    // Helper: count products per merchant
    const merchantCounts = merchants.reduce((acc, merchant) => {
        if (merchant === "All Merchants") {
            acc[merchant] = products.length;
        } else {
            acc[merchant] = products.filter((p) => p.vendor === merchant).length;
        }
        return acc;
    }, {} as Record<string, number>);

    // Filter products by search query (in title, description, or vendor)
    const searchedProducts = products.filter(product => {
        if (!searchQuery) return true;
        const vendorName = typeof product.vendor === 'string' ? product.vendor : product.vendor?.full_name || '';
        return (
            (product.productTitle && product.productTitle.toLowerCase().includes(searchQuery)) ||
            (product.description && product.description.toLowerCase().includes(searchQuery)) ||
            (vendorName && vendorName.toLowerCase().includes(searchQuery))
        );
    });
    const filteredProducts = searchedProducts.filter(product => {
        const vendorName = typeof product.vendor === 'string' ? product.vendor : product.vendor?.full_name || '';
        return (
            (selectedCategories.includes("All Categories") || selectedCategories.includes(product.category)) &&
            (selectedMerchants.includes("All Merchants") || selectedMerchants.includes(vendorName))
        );
    });
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

    return (
        <div className='px-2 sm:px-4 md:px-[15vw] py-8 sm:py-12 md:py-15'>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Mobile Filters Button */}
                <div className="md:hidden mb-4">
                    <button
                        className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                        onClick={() => setShowMobileFilters((v) => !v)}
                    >
                        {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                    {showMobileFilters && (
                        <div className="mt-4 bg-white rounded-2xl shadow-lg p-4">
                            {/* Filter by Category Dropdown */}
                            <div className="mb-6">
                                <button
                                    className="w-full flex justify-between items-center text-lg font-bold text-orange-600 mb-2 focus:outline-none"
                                    onClick={() => setCategoryOpen(!categoryOpen)}
                                    type="button"
                                >
                                    Filter by category
                                    <span className={`transform transition-transform ${categoryOpen ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                {categoryOpen && (
                                    <ul className='space-y-2'>
                                        {categories.map((cat) => (
                                            <li key={cat}>
                                                <button
                                                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategories.includes(cat) ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
                                                    onClick={() => handleCategoryClick(cat)}
                                                >
                                                    {cat} <span className="ml-2 text-xs text-orange-400">({categoryCounts[cat]})</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {/* Filter by Merchant Dropdown */}
                            <div>
                                <button
                                    className="w-full flex justify-between items-center text-lg font-bold text-orange-600 mb-2 focus:outline-none"
                                    onClick={() => setMerchantOpen(!merchantOpen)}
                                    type="button"
                                >
                                    Filter by merchant
                                    <span className={`transform transition-transform ${merchantOpen ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                {merchantOpen && (
                                    <ul className='space-y-2'>
                                        {merchants.map((merchant) => (
                                            <li key={merchant}>
                                                <button
                                                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${selectedMerchants.includes(merchant) ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
                                                    onClick={() => handleMerchantClick(merchant)}
                                                >
                                                    {merchant} <span className="ml-2 text-xs text-orange-400">({merchantCounts[merchant]})</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {/* Categories Filter (desktop/tablet) */}
                <aside className='hidden md:block w-56 px-4 py-10 bg-white rounded-2xl shadow-lg h-fit mt-0 md:mt-16 ml-0 md:ml-12 flex-shrink-0'>
                    {/* Filter by Category Dropdown */}
                    <div className="mb-6">
                        <button
                            className="w-full flex justify-between items-center text-lg font-bold text-orange-600 mb-2 focus:outline-none"
                            onClick={() => setCategoryOpen(!categoryOpen)}
                            type="button"
                        >
                            Filter by category
                            <span className={`transform transition-transform ${categoryOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {categoryOpen && (
                            <ul className='space-y-2'>
                                {categories.map((cat) => (
                                    <li key={cat}>
                                        <button
                                            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategories.includes(cat) ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
                                            onClick={() => handleCategoryClick(cat)}
                                        >
                                            {cat} <span className="ml-2 text-xs text-orange-400">({categoryCounts[cat]})</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Filter by Merchant Dropdown */}
                    <div>
                        <button
                            className="w-full flex justify-between items-center text-lg font-bold text-orange-600 mb-2 focus:outline-none"
                            onClick={() => setMerchantOpen(!merchantOpen)}
                            type="button"
                        >
                            Filter by merchant
                            <span className={`transform transition-transform ${merchantOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {merchantOpen && (
                            <ul className='space-y-2'>
                                {merchants.map((merchant) => (
                                    <li key={merchant}>
                                        <button
                                            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${selectedMerchants.includes(merchant) ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
                                            onClick={() => handleMerchantClick(merchant)}
                                        >
                                            {merchant} <span className="ml-2 text-xs text-orange-400">({merchantCounts[merchant]})</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </aside>
                {/* Main Content */}
                <div className='flex-1 px-0 md:px-0 py-0 md:py-16 mx-0 md:mx-8'>
                    <div className="w-full flex flex-row items-center justify-between mb-8 md:pr-16">
                        <div className="flex flex-col items-start md:items-center">
                            <h2 className="text-2xl font-bold">
                                All <span className="text-orange-500">Products</span>
                            </h2>
                            <div className="w-44 h-1 bg-orange-500 rounded-none items-start mt-2" />
                        </div>
                    </div>
                    {loading ? (
                        <div className="w-full flex justify-center items-center py-20 text-orange-500 font-bold text-xl">Loading products...</div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="w-full flex justify-center items-center py-20 text-orange-400 font-bold text-xl">
                            No products found matching your search.
                        </div>
                    ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-6 sm:py-10">
                        {paginatedProducts.map((product, idx) => (
                            <div key={product._id} className="w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
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
                                            const cartItem: CartItem = {
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
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-2">
                            <button
                                className="px-3 py-1 rounded bg-orange-100 text-orange-600 font-semibold disabled:opacity-50"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={`px-3 py-1 rounded font-semibold ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className="px-3 py-1 rounded bg-orange-100 text-orange-600 font-semibold disabled:opacity-50"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllProducts;
