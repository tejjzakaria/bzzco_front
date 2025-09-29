'use client';
import { IconArrowRight } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const TopMerchants = () => {
    const [merchants, setMerchants] = useState<{ _id: string; name: string; logo: string; subtitle?: string; category?: { name?: string } }[]>([]);
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
                setMerchants(data.slice(0, 4)); // Only show 4 merchants
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
                        Top <span className="text-orange-500">Merchants</span>
                    </h2>
                    <div className="w-24 sm:w-44 h-1 bg-orange-500 rounded-none" />
                </div>
                <div className='flex flex-row items-center gap-2 text-orange-500 font-semibold cursor-pointer ml-8'>
                    <Link href="/merchants" className="text-orange-500 cursor-pointer">View all</Link><IconArrowRight />
                </div>
            </div>
            <div className='pt-10 flex flex-row gap-8 flex-wrap justify-center'>
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
                      className={`w-84 h-46 ${color.bg} rounded-xl relative overflow-hidden shadow-md flex flex-col justify-between p-4 text-white m-4`}
                    >
                      {/* Tag */}
                      <span className="bg-black text-white text-xs px-3 py-1 rounded-md w-fit">
                        {merchant.category?.name || 'Merchant'}
                      </span>
                      {/* Bottom text */}
                      <p className="text-xl font-semibold">
                        {merchant.name} <br />{merchant.subtitle || ''}
                      </p>
                      {/* Logo (absolute on right) */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <img
                          src={merchant.logo}
                          alt={`${merchant.name} Logo`}
                          className="h-12 w-auto opacity-90"
                        />
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

export default TopMerchants
