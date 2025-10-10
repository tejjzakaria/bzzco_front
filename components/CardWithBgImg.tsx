import React from 'react'
import Image from 'next/image';
import { CONTAINER_PADDING } from '@/lib/styles';

const CardWithBgImg = () => {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between ${CONTAINER_PADDING} my-8`}>
      <div className='relative w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden'
      style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Optionally, you can use an absolutely positioned <Image /> for optimization */}
        <Image src="/banner-img.png" alt="Banner" fill style={{ objectFit: 'cover', zIndex: 0 }} />
        <div className='absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-8 md:p-10 z-20'>
          <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 text-center'>A Revolutionary Solution</h2>
          <p className='text-sm sm:text-base md:text-lg text-white mb-4 sm:mb-6 max-w-xs sm:max-w-md md:max-w-lg text-center'>Determined to make a difference, We set out to create a revolutionary solution. My goal was clear: to &apos;uberize&apos; the construction materials market by creating an intuitive and efficient online platform...</p>
          <button className='bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 sm:px-6 text-sm sm:text-base rounded-lg transition'>
            Explore Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardWithBgImg
