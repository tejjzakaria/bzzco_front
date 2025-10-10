import React from 'react'
import { CONTAINER_PADDING } from '@/lib/styles';

const CardWithBgImg2 = () => {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between ${CONTAINER_PADDING} my-8`}>
      <div className='relative w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg overflow-hidden'
      style={{ backgroundImage: 'url(/shaking-hands.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 z-20'>
          <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 text-center'>Thank You for Joining Our Journey</h2>
          <p className='text-sm sm:text-base md:text-lg text-white text-center max-w-xs sm:max-w-md md:max-w-lg'>Thank you for trusting us and being part of this unique journey.</p>
        </div>
      </div>
    </div>
  )
}

export default CardWithBgImg2
