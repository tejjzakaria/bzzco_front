import React from 'react'
import { SearchBarInput } from './SearchBar'
import { CONTAINER_PADDING } from '@/lib/styles'
import AnimatedSection from './AnimatedSection'

const Hero = () => {
    return (
        <section
            className='h-[calc(80vh-5rem)] bg-cover bg-center text-white'
            style={{ backgroundImage: "url('/hero-img.png')" }}
        >
            <div className={`${CONTAINER_PADDING} h-full flex flex-col justify-center`}>
                <div className='flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto w-full'>
                    <AnimatedSection direction="left" className='w-full md:flex-1 text-center md:text-left'>
                        <h1 className='heading text-2xl sm:text-3xl md:text-4xl font-bold my-5'>Explore the building industry through our catalogue!</h1>
                        <p className='text-base sm:text-lg'>
                            Where you will find the best local merchants for high quality building materials.
                            Plus, calculate your needs effortlessly with our AI calculator and enjoy convenient ordering and delivery.
                        </p>
                    </AnimatedSection>
                    <AnimatedSection direction="right" delay={0.2} className='w-40 sm:w-56 md:w-80 flex justify-center md:justify-end mt-8 md:mt-0'>
                        <img src="/ai-chat.png" alt="AI Chat" className="w-full h-auto object-contain rounded-xl" />
                    </AnimatedSection>
                </div>
                <AnimatedSection direction="up" delay={0.4} className='my-10 flex justify-center'>
                    <div className='w-full max-w-8xl bg-black p-4 sm:p-8 md:p-10 rounded-lg'>
                        <SearchBarInput/>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    )
}

export default Hero
