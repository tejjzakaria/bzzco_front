'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Category } from './types';

const AllCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            setLoading(true);
            setError(false);
            try {
                const res = await fetch('/api/categories');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setCategories(data);
            } catch (e) {
                setError(true);
            }
            setLoading(false);
        }
        fetchCategories();
    }, []);

    return (
        <div className='px-4 sm:px-8 md:px-[15vw] py-8 sm:py-12 md:py-15'>
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center">
                    <h2 className="text-xl sm:text-2xl font-bold">
                        All <span className="text-orange-500">Categories</span>
                    </h2>
                    <div className="w-24 sm:w-44 h-1 bg-orange-500 rounded-none" />
                </div>
            </div>
            {loading ? (
                <div className="w-full flex justify-center items-center py-20 text-orange-500 font-bold text-lg sm:text-xl">Loading categories...</div>
            ) : error ? (
                <div className="w-full flex justify-center items-center py-20 text-orange-400 font-bold text-lg sm:text-xl">Failed to load categories.</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-6 sm:py-10">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="flex flex-col items-center group cursor-pointer mb-8"
                        >
                            {/* Icon Circle */}
                            <div className={`w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center bg-orange-100 border-orange-300 border-2 group-hover:shadow-lg transition-all duration-200 group-hover:scale-105`}>
                                <Image src={category.icon} alt={category.name} className="w-8 h-8 object-contain" width={32} height={32} />
                            </div>
                            {/* Category Name */}
                            <h3 className="text-xs sm:text-sm font-medium text-gray-800 mt-3 text-center leading-tight group-hover:text-orange-500 transition-colors">
                                {category.name}
                            </h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllCategories;
