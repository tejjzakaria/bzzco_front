import React from 'react'
import Image from 'next/image';

const FutureSection = () => {
  return (
    <div className='flex flex-row items-center justify-between px-[15vw] gap-20'>
        <div className='w-1/2'>
            <Image src="/team-engineers.png" alt="About Us" className='mt-8 rounded-xl' width={900} height={900}/>
        </div>
        
        <div className='flex flex-col items-start w-1/2 gap-4'>
          <h1 className='text-4xl font-bold'>Building the Future of Construction Materials</h1>
          <p className='text-lg'>At Baazizi Group, our mission is to guide merchants through their digital transformation and help them thrive in an ever-changing market. Together, we are innovating to build the future of construction materials...</p>
        </div>
        
        
    </div>
  )
}

export default FutureSection
