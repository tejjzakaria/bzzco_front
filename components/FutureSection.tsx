import React from 'react'
import Image from 'next/image';
import { CONTAINER_PADDING } from '@/lib/styles';

const FutureSection = () => {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between ${CONTAINER_PADDING} gap-8 md:gap-20`}>
        <div className='w-full md:w-1/2'>
            <Image src="/team-engineers.png" alt="About Us" className='mt-8 rounded-xl' width={900} height={900}/>
        </div>
        <div className='flex flex-col items-start w-full md:w-1/2 gap-4 mt-8 md:mt-0'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Building the Future of Construction Materials</h1>
          <p className='text-base sm:text-lg'>At Baazizi Group, our mission is to guide merchants through their digital transformation and help them thrive in an ever-changing market. Together, we are innovating to build the future of construction materials...</p>
        </div>
    </div>
  )
}

export default FutureSection
