import React from 'react'

const CardWithBgImg2 = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-[15vw] my-8 md:my-15'>
      <div className='relative w-full h-[200px] sm:h-[300px] rounded-lg overflow-hidden'
      style={{ backgroundImage: 'url(/shaking-hands.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-10 z-20'>
          <h2 className='text-lg sm:text-xl md:text-4xl lg:text-3xl font-bold text-white mb-4 text-center'>Thank You for Joining Our Journey</h2>
          <p className='text-sm sm:text-lg md:text-xl text-white text-center mb-6 max-w-xs sm:max-w-lg'>Thank you for trusting us and being part of this unique journey.</p>
        </div>
      </div>
    </div>
  )
}

export default CardWithBgImg2
