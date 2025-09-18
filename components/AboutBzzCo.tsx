import React from 'react'

const AboutBzzCo = () => {
  return (
    <div className='flex flex-row items-center justify-between px-[15vw]'>
        <div className='w-1/2 mr-15'>
            <img src="/team1.jpg" alt="About Us" className='mt-8 rounded-r-full' width={900} height={900}/>
        </div>
        <div className='flex flex-col items-start w-1/2 gap-4'>
          <h1 className='text-4xl font-bold'>About Baazizi Group</h1>
          <p className='text-lg'>At Baazizi Group, we bridge Morocco and the Netherlands, connecting global talent to revolutionize the construction materials industry. Our mission is to create innovative, tech-driven solutions that shape the future through collaboration and excellence.</p>
        </div>
        
    </div>
  )
}

export default AboutBzzCo
