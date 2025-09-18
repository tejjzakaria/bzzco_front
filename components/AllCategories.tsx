'use client';

import React, { useEffect, useState } from 'react';

const AllCategories = () => {
    const [categories, setCategories] = useState<any[]>([]);
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
        <div className='px-[15vw] py-15'>
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold">
                        All <span className="text-orange-500">Categories</span>
                    </h2>
                    <div className="w-44 h-1 bg-orange-500 rounded-none" />
                </div>
            </div>
            {loading ? (
                <div className="w-full flex justify-center items-center py-20 text-orange-500 font-bold text-xl">Loading categories...</div>
            ) : error ? (
                <div className="w-full flex justify-center items-center py-20 text-orange-400 font-bold text-xl">Failed to load categories.</div>
            ) : (
                <div className="grid grid-cols-5 gap-4 py-10">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="flex flex-col items-center group cursor-pointer mb-8"
                        >
                            {/* Icon Circle */}
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-orange-100 border-orange-300 border-2 group-hover:shadow-lg transition-all duration-200 group-hover:scale-105`}>
                                <img src={category.icon} alt={category.name} className="w-8 h-8 object-contain" />
                            </div>
                            {/* Category Name */}
                            <h3 className="text-sm font-medium text-gray-800 mt-3 text-center leading-tight group-hover:text-orange-500 transition-colors">
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
