'use client';

import React, { useEffect, useState, useRef } from 'react';
import { notFound } from 'next/navigation';
import { div } from 'motion/react-client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useCart } from './CartContext';
import Image from 'next/image';
import type { Product } from './types';

export default function SingleProduct({ id }: { id: string }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [related, setRelated] = useState<Product[]>([]);
    const swiperRef = useRef<any>(null);
    const { items, setItems } = useCart();

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true);
            setError(false);
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) throw new Error('Not found');
                const data = await res.json();
                setProduct(data);
                // Fetch related products (same category, exclude current)
                if (data.category) {
                    const relRes = await fetch(`/api/products?category=${encodeURIComponent(data.category)}`);
                    if (relRes.ok) {
                        const relData = await relRes.json();
                        setRelated(relData.filter((p: any) => p._id !== data._id).slice(0, 4));
                    }
                }
            } catch (e) {
                setError(true);
            }
            setLoading(false);
        }
        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-orange-500 font-bold text-xl">Loading...</div>;
    if (error || !product) return notFound();

    return (
        <div className='px-[15vw]'>
            <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 py-16">
                <div className="rounded-2xl p-8 w-full flex flex-col md:flex-row gap-12">
                    {/* Left: Images */}
                    <div className="flex-1 flex flex-col items-center">
                        <div className="relative w-[440px] h-96 bg-orange-100 rounded-xl flex items-center justify-center mb-4 overflow-visible">
                            {/* Custom navigation buttons */}
                            {product.images && product.images.length > 1 && (
                                <>
                                    <button
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full z-20 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-orange-600 transition -ml-3"
                                        onClick={() => swiperRef.current?.slidePrev()}
                                        aria-label="Previous image"
                                    >
                                        &#8592;
                                    </button>
                                    <button
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full z-20 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-orange-600 transition -mr-3"
                                        onClick={() => swiperRef.current?.slideNext()}
                                        aria-label="Next image"
                                    >
                                        &#8594;
                                    </button>
                                </>
                            )}
                            {product.images && product.images.length > 0 ? (
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    pagination={{ clickable: true }}
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    style={{ width: '100%', height: '100%' }}
                                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                                >
                                    {product.images.map((img: string, idx: number) => (
                                        <SwiperSlide key={idx}>
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Image src={img} alt={product.productTitle} className="w-full h-full object-cover rounded-xl" width={440} height={384} />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-orange-300">No Image</div>
                            )}
                        </div>
                        {/* Thumbnails below slider */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-2 mt-2">
                                {product.images.map((img: string, idx: number) => (
                                    <Image key={idx} src={img} alt="thumb" className="w-16 h-16 object-cover rounded-lg border border-orange-200" width={64} height={64} />
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Right: Info */}
                    <div className="flex-1 flex flex-col gap-1">
                        <h1 className="text-3xl font-bold text-black mb-2">{product.productTitle}</h1>

                        <div className="text-sm text-orange-500 font-medium">Seller: {typeof product.vendor === 'object' && product.vendor?.full_name ? product.vendor.full_name : typeof product.vendor === 'string' ? product.vendor : 'N/A'}</div>

                        <div className="text-sm text-orange-500 font-medium mb-2">Category: {product.category}</div>
                        <div className="text-gray-500 mb-2">{product.description}</div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl font-bold text-gray-900">${product.productDiscountedPrice ?? product.productPrice}</span>
                            {product.productDiscountedPrice && (
                                <span className="text-sm text-gray-500 line-through">${product.productPrice}</span>
                            )}
                            {product.productDiscountedPrice && (
                                <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-md font-semibold">
                                    -{Math.round(100 - (product.productDiscountedPrice / product.productPrice) * 100)}%
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-md text-xs font-semibold ${product.inStock === 'yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {product.inStock === 'yes' ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <span className="text-xs text-gray-500">SKU: {product.productSku}</span>
                            <span className="text-xs text-gray-500">Barcode: {product.productBarcode}</span>



                            <span className="text-xs text-gray-500">Weight: {product.weight ? `${product.weight} kg` : 'N/A'}</span>
                            <span className="text-xs text-gray-500">Manufacturer: {product.manufacturer || 'N/A'}</span>
                            <span className="text-xs text-gray-500">Dimensions: {product.dimensions || 'N/A'}</span>
                        </div>
                        {/* Quantity, Add to Cart, Buy Now */}
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="flex items-center gap-4 mb-4">
                                <input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    min={1}
                                    max={product.quantity}
                                    defaultValue={1}
                                    className="w-20 px-3 py-2 rounded-lg focus:outline-none focus:border-orange-500 text-center font-semibold text-orange-600 bg-orange-100"
                                />
                                <button
                                    type="button"
                                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-md w-full transition-all duration-200 shadow-md cursor-pointer"
                                    disabled={product.inStock !== 'yes'}
                                    onClick={() => {
                                        if (product.inStock !== 'yes') return;
                                        if (!product._id) {
                                            alert('This product cannot be added to cart (missing ID).');
                                            return;
                                        }
                                        const quantity = Number((document.getElementById('quantity') as HTMLInputElement)?.value) || 1;
                                        // Prepare cart item with expected fields
                                        const cartItem = {
                                            _id: product._id,
                                            name: product.productTitle,
                                            image: product.images && product.images.length > 0 ? product.images[0] : '',
                                            price: product.productDiscountedPrice ?? product.productPrice,
                                            quantity,
                                        };
                                        // Check if already in cart
                                        const existing = items.find((item: any) => item._id === product._id);
                                        if (existing) {
                                            setItems(items.map((item: any) =>
                                                item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
                                            ));
                                        } else {
                                            setItems([
                                                ...items,
                                                cartItem
                                            ]);
                                        }
                                        // Optionally open cart drawer if available
                                        // setIsOpen && setIsOpen(true);
                                    }}
                                >
                                    {product.inStock === 'yes' ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                            </div>
                            <button type="button" className="border-1 border-orange-500 hover:bg-orange-700 hover:text-white text-orange-500 font-semibold px-6 py-2 rounded-md w-full transition-all duration-200 shadow-sm cursor-pointer">Buy Now</button>
                        </form>
                        {/* Payment Methods */}
                        <div className="flex flex-col gap-2 mt-2">
                            <span className="text-xs text-gray-500 mb-1">Payment Methods:</span>
                            <div className="flex gap-3 items-center">
                                <Image src="/visa.svg" alt="Visa" className="h-12" width={48} height={48} />
                                <Image src="/mastercard.svg" alt="Mastercard" className="h-12" width={48} height={48} />
                                <Image src="/paypal.svg" alt="PayPal" className="h-12" width={48} height={48} />
                                <Image src="/apple-pay.svg" alt="Apple Pay" className="h-12" width={48} height={48} />
                                <Image src="/amex.svg" alt="Amex" className="h-12" width={48} height={48} />
                            </div>
                        </div>
                        {/* shipping and returns */}
                        <div className="flex flex-col gap-1 mt-2">
                            <span className="text-xs text-gray-500 mb-1">- Free worldwide shipping on all orders over $100</span>
                            <span className="text-xs text-gray-500 mb-1">- Delivers in: 3-7 Working Days</span>
                            <span className="text-xs text-gray-500 mb-1">- More about <a href="/shipping-and-return" className='underline '>shipping & returns</a> </span>
                        </div>

                    </div>

                </div>

            </div>

            <div className=''>
            {/* Related Products */}
            {related.length > 0 && (
                <div className="mt-3">
                    <h2 className="text-xl font-bold text-black mb-4">You may like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {related.map((prod) => (
                            <a key={prod._id} href={`/products/${prod._id}`} className="block bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 overflow-hidden">
                                <div className="w-full aspect-square bg-orange-50 flex items-center justify-center">
                                    {prod.images && prod.images.length > 0 ? (
                                        <Image src={prod.images[0]} alt={prod.productTitle} className="w-full h-full object-cover" width={400} height={400} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-orange-300">No Image</div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <div className="text-xs text-orange-500 font-medium mb-1">{prod.category}</div>
                                    <div className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">{prod.productTitle}</div>
                                    <div className="text-sm text-gray-700 font-bold">${prod.productDiscountedPrice ?? prod.productPrice}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}
