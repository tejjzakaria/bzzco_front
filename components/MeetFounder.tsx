import React from 'react'
import Image from 'next/image';
import { IconBrandLinkedin } from '@tabler/icons-react';
import { CONTAINER_PADDING } from '@/lib/styles';

const MeetFounder = () => {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between ${CONTAINER_PADDING} gap-8`}>
        <div className='flex flex-col items-start w-full md:w-1/2 gap-4'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Moussa Baazizi - Founder of Baazizi Group</h1>
          <p className='text-base sm:text-lg'>Welcome to Baazizi Group, a platform designed to revolutionize the world of construction materials merchants. I am Moussa Baazizi, the founder of this visionary project, born from a simple yet powerful idea.</p>
          <a href="https://www.linkedin.com/in/moussa-b-010183249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target='_blank'><IconBrandLinkedin size={30} className='text-blue-700 hover:text-blue-800 transition'/></a>
        </div>
        <div className='w-full md:w-1/2 flex justify-end mt-8 md:mt-0'>
            <Image src="/moussa2.jpeg" alt="About Us" className='rounded-l-full' width={500} height={500}/>
        </div>
    </div>
  )
}

export default MeetFounder
