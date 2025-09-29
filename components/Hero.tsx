import React from 'react'
import { SearchBarInput } from './SearchBar'

const Hero = () => {
    return (
        <section
            className='h-[calc(100vh-5rem)] bg-cover bg-center text-white px-4 sm:px-6 md:px-8'
            style={{ backgroundImage: "url('/hero-img.png')" }}
        >
            <div className='pt-12 sm:pt-20'>
                <div className='flex flex-col md:flex-row items-center justify-center gap-8'>
                    <div className='w-full md:w-[45vw] text-center md:text-left'>
                        <h1 className='heading text-2xl sm:text-3xl md:text-4xl font-bold my-5'>Explore the building industry through our catalogue!</h1>
                        <p className='text-base sm:text-lg'>
                            Where you will find the best local merchants for high quality building materials.
                            Plus, calculate your needs effortlessly with our AI calculator and enjoy convenient ordering and delivery.
                        </p>
                    </div>
                    <div className='w-40 sm:w-56 md:w-[20vw] flex justify-center md:justify-end mt-8 md:mt-0'>
                        <img src="/ai-chat.png" alt="AI Chat" className="w-full h-auto object-contain rounded-xl" />
                    </div>
                </div>
                <div className='my-10 flex justify-center'>
                    <div className='w-full sm:w-[90vw] md:w-[68vw] bg-black p-4 sm:p-8 md:p-10 rounded-lg'>
                        <SearchBarInput/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
