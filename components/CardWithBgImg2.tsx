import React from 'react'

const CardWithBgImg2 = () => {
  return (
    <div className='flex flex-row items-center justify-between px-[15vw] my-15'>
      <div className='relative w-full h-[300px] rounded-lg overflow-hidden'
      style={{ backgroundImage: 'url(/shaking-hands.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        <div className='absolute inset-0 flex flex-col justify-center items-center p-10 z-20'>
          <h2 className='text-xl md:text-4xl lg:text-3xl font-bold text-white mb-4'>Thank You for Joining Our Journey</h2>
          <p className='text-lg md:text-xl text-white text-center mb-6 max-w-lg'>Thank you for trusting us and being part of this unique journey.</p>
          
        </div>
      </div>
    </div>
  )
}

export default CardWithBgImg2
