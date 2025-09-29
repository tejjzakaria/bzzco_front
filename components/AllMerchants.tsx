'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { IconArrowRight } from '@tabler/icons-react'
import Image from 'next/image';
import type { Merchant } from './types';

const AllMerchants = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const cardColors = [
      { bg: 'bg-blue-600', border: 'border-blue-500' },
      { bg: 'bg-orange-500', border: 'border-orange-400' },
      { bg: 'bg-green-600', border: 'border-green-500' },
      { bg: 'bg-purple-600', border: 'border-purple-500' }
    ];

    useEffect(() => {
        async function fetchMerchants() {
            setLoading(true);
            setError(false);
            try {
                const res = await fetch('/api/merchants');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setMerchants(data);
            } catch (e) {
                setError(true);
            }
            setLoading(false);
        }
        fetchMerchants();
    }, []);

    return (
        <div className='px-4 sm:px-8 md:px-[15vw] py-8 sm:py-12 md:py-15'>
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center">
                    <h2 className="text-xl sm:text-2xl font-bold">
                        All <span className="text-orange-500">Merchants</span>
                    </h2>
                    <div className="w-24 sm:w-44 h-1 bg-orange-500 rounded-none" />
                </div>
            </div>
            <div className='pt-10 grid grid-cols-1 gap-y-12'>
              {loading ? (
                <div className="w-full flex justify-center items-center py-20 text-orange-500 font-bold text-xl">Loading merchants...</div>
              ) : error ? (
                <div className="w-full flex justify-center items-center py-20 text-orange-400 font-bold text-xl">Failed to load merchants.</div>
              ) : (
                merchants.map((merchant, idx) => {
                  const color = cardColors[idx % cardColors.length];
                  return (
                    <div
                      key={merchant._id}
                      className={`w-full h-96 ${color.bg} rounded-xl relative overflow-hidden shadow-md flex flex-col justify-between p-4 text-white`}
                    >
                      {/* Top Row: Logo (left) and Title/Category (right) */}
                      <div className="flex flex-row justify-between items-start mb-6">
                        {/* Logo top left */}
                        <div className="p-10">
                          <Image
                            src={merchant.logo}
                            alt={`${merchant.name} Logo`}
                            className="h-23 w-auto opacity-90"
                            width={92}
                            height={92}
                          />
                        </div>
                        {/* Title and Category top right */}
                        <div className="flex flex-col items-end p-10">
                          <span className="bg-black text-white text-xs px-3 py-1 rounded-md w-fit mb-2">
                            {merchant.category?.name || 'Merchant'}
                          </span>
                          <p className="text-3xl font-semibold text-right">
                            {merchant.name} <br />{merchant.subtitle || ''}
                          </p>
                        </div>
                      </div>
                      {/* Decorative circle */}
                      <div className={`absolute right-0 top-0 w-40 h-40 rounded-full border-2 ${color.border} opacity-40 translate-x-1/3 -translate-y-1/3`}></div>
                    </div>
                  );
                })
              )}
            </div>
        </div>
    )
}

export default AllMerchants
