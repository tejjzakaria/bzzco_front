import React from 'react'
import Image from 'next/image';
import { CONTAINER_PADDING } from '@/lib/styles';
import AnimatedSection from './AnimatedSection';

const HowItBegan = () => {
    return (
        <div className={`${CONTAINER_PADDING} my-10`}>
            <AnimatedSection direction="up" className='relative w-full h-[250px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden'>
                <Image src="/construction-depot.png" alt="Construction Depot" fill style={{ objectFit: 'cover' }} />
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2} className='flex flex-col items-center gap-4 my-10'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center'>How it began?</h1>
                <p className='text-base sm:text-lg text-center px-4'>This idea first came to life several years ago when I worked for a merchant named Ertugul Demir, owner of a construction materials store called Constructor...</p>
            </AnimatedSection>
        </div>
    )
}

export default HowItBegan
