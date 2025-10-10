import React from 'react'
import Image from 'next/image';
import { CONTAINER_PADDING } from '@/lib/styles';

const AboutBzzCo = () => {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between ${CONTAINER_PADDING} gap-8 my-8`}>
        <div className='w-full md:w-1/2'>
            <Image src="/team1.jpg" alt="About Us" className='mt-8 rounded-r-full' width={900} height={900}/>
        </div>
        <div className='flex flex-col items-start w-full md:w-1/2 gap-4'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>About Baazizi Group</h1>
          <p className='text-base sm:text-lg'>At Baazizi Group, we bridge Morocco and the Netherlands, connecting global talent to revolutionize the construction materials industry. Our mission is to create innovative, tech-driven solutions that shape the future through collaboration and excellence.</p>
        </div>

    </div>
  )
}

export default AboutBzzCo
