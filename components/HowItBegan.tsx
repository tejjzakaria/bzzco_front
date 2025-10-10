import React from 'react'
import Image from 'next/image';
import { CONTAINER_PADDING } from '@/lib/styles';

const HowItBegan = () => {
    return (
        <div className={`${CONTAINER_PADDING} my-10`}>
            <div className='relative w-full h-[250px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden'>
                <Image src="/construction-depot.png" alt="Construction Depot" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className='flex flex-col items-center gap-4 my-10'>
                <h1 className='text-4xl font-bold'>How it began?</h1>
                <p className='text-lg text-center'>This idea first came to life several years ago when I worked for a merchant named Ertugul Demir, owner of a construction materials store called Constructor...</p>
            </div>
        </div>
    )
}

export default HowItBegan
