import React from 'react'

const CardWithBgImg = () => {
  return (
    <div className='flex flex-row items-center justify-between px-[15vw]'>
      <div className='relative w-full h-[400px] rounded-lg overflow-hidden'
      style={{ backgroundImage: 'url(/banner-img.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        <div className='absolute inset-0 flex flex-col justify-center items-center p-10 z-20'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4'>A Revolutionary Solution</h2>
          <p className='text-lg md:text-xl text-white mb-6 max-w-lg'>Determined to make a difference, We set out to create a revolutionary solution. My goal was clear: to 'uberize' the construction materials market by creating an intuitive and efficient online platform...</p>
          <button className='bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition'>
            Explore Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardWithBgImg
