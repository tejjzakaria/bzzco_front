import { IconRotate, IconRotate360, IconRotateClockwise2, IconTag, IconThumbUp, IconTruckDelivery } from '@tabler/icons-react'
import { ThumbsUpIcon } from 'lucide-react'
import React from 'react'

const Features = () => {
    return (
        <div className='py-12 md:py-20 px-4 sm:px-8 flex flex-col items-center justify-center gap-6'>
            <h2 className='text-2xl sm:text-3xl font-bold mb-2'>Why choose us?</h2>
            <p className='text-base sm:text-lg text-center mb-4'>Learn more about our process.</p>
            <div className='flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-8xl'>
                <div className='flex flex-row items-center justify-center gap-4 mb-8 md:mb-0'>
                    <div className='flex flex-col items-center justify-center p-4 rounded-full bg-black'>
                        <IconTruckDelivery size={40} className='text-white' />
                    </div>
                    <div>
                        <h3 className='text-lg sm:text-xl md:text-2xl font-bold'>Large Stock</h3>
                        <p className='text-base sm:text-lg'>Fast Delivery</p>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center gap-4 mb-8 md:mb-0'>
                    <div className='flex flex-col items-center justify-center p-4 rounded-full bg-black'>
                        <IconThumbUp size={40} className='text-white' />
                    </div>
                    <div>
                        <h3 className='text-lg sm:text-xl md:text-2xl font-bold'>Satisfaction</h3>
                        <p className='text-base sm:text-lg'>100% Guaranteed</p>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center gap-4 mb-8 md:mb-0'>
                    <div className='flex flex-col items-center justify-center p-4 rounded-full bg-black'>
                        <IconRotate size={40} className='text-white' />
                    </div>
                    <div>
                        <h3 className='text-lg sm:text-xl md:text-2xl font-bold'>14 Days</h3>
                        <p className='text-base sm:text-lg'>Easy Return</p>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center gap-4'>
                    <div className='flex flex-col items-center justify-center p-4 rounded-full bg-black'>
                        <IconTag size={40} className='text-white' />
                    </div>
                    <div>
                        <h3 className='text-lg sm:text-xl md:text-2xl font-bold'>Low Prices</h3>
                        <p className='text-base sm:text-lg'>High Quality</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
