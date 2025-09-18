import { IconRotate, IconRotate360, IconRotateClockwise2, IconTag, IconThumbUp, IconTruckDelivery } from '@tabler/icons-react'
import { ThumbsUpIcon } from 'lucide-react'
import React from 'react'

const Features = () => {
    return (
        <div className='my-20 flex flex-col items-center justify-center gap-2'>
            <h2 className='text-3xl font-bold'>Why choose us?</h2>
            <p className='text-lg text-center'>Learn more about our process.</p>
            <div className='flex flex-row items-center justify-center gap-40 my-10'>
                <div className='flex flex-row items-center justify-center gap-4'>
                    <div className='flex flex-col items-center justify-center p-4 rounded-full bg-black'>
                        <IconTruckDelivery size={48} stroke={1.5} className='text-white' />
                    </div>
                    <div>
                        <h3 className='text-2xl font-bold'>Large Stock</h3>
                        <p className='text-lg'>Fast Delivery</p>
                    </div>

                </div>
                <div className='flex flex-row items-center justify-center gap-4'>
                    <div className='flex flex-col items-center justify-center p-4 rounded-full bg-black'>
                        <IconThumbUp size={48} stroke={1.5} className='text-white' />
                    </div>
                    <div>
                        <h3 className='text-2xl font-bold'>Satisfaction</h3>
                        <p className='text-lg'>100% Guaranteed</p>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center gap-4'>
                    <div className='flex flex-col items-center justify-center p-4 rounded-full bg-black'>
                        <IconRotate size={48} stroke={1.5} className='text-white' />
                    </div>
                    <div>
                        <h3 className='text-2xl font-bold'>14 Days</h3>
                        <p className='text-lg'>Easy Return</p>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center gap-4'>
                    <div className='flex flex-col items-center justify-center p-4 rounded-full bg-black'>
                        <IconTag size={48} stroke={1.5} className='text-white' />
                    </div>
                    <div>
                        <h3 className='text-2xl font-bold'>Low Prices</h3>
                        <p className='text-lg'>High Quality</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
