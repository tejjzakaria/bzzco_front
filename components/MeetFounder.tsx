import React from 'react'
import Image from 'next/image';

const MeetFounder = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-[15vw] gap-8'>
        <div className='flex flex-col items-start w-full md:w-1/2 gap-4'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Moussa Baazizi - Founder of Baazizi Group</h1>
          <p className='text-base sm:text-lg'>Welcome to Baazizi Group, a platform designed to revolutionize the world of construction materials merchants. I am Moussa Baazizi, the founder of this visionary project, born from a simple yet powerful idea.</p>
        </div>
        <div className='w-full md:w-1/2 mt-8 md:mt-0'>
            <Image src="/moussa.png" alt="About Us" className='mt-8 rounded-l-full' width={900} height={900}/>
        </div>
    </div>
  )
}

export default MeetFounder
