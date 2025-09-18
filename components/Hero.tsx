import React from 'react'
import { SearchBarInput } from './SearchBar'

const Hero = () => {
    return (
        <section className='h-[calc(100vh-5rem)] bg-cover bg-center text-white'
            style={{ backgroundImage: "url('/hero-img.png')" }}
        >
            <div className='pt-50'>
                <div className='flex flex-row items-center justify-center gap-8'>
                    <div className='w-[45vw]'>
                        <h1 className='heading text-4xl font-bold my-5'>Explore the building industry through our catalogue!</h1>
                        <p>
                            Where you will find the best local merchants for high quality building materials.
                            Plus, calculate your needs effortlessly with our AI calculator and enjoy convenient ordering and delivery.
                        </p>
                    </div>
                    <div className='w-[20vw]'>
                        <img src="/ai-chat.png" />
                    </div>
                </div>
                <div className='my-10 flex justify-center'>
                    <div className='w-[68vw] bg-black p-10 rounded-lg'>
                        <SearchBarInput/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
