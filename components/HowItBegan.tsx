import React from 'react'
import Image from 'next/image';

const HowItBegan = () => {
    return (
        <div className='px-[15vw] my-10'>
            <Image src="/construction-depot.png" alt="" width={900} height={400} />
            <div className='flex flex-col items-center gap-4 my-10'>
                <h1 className='text-4xl font-bold'>How it began?</h1>
                <p className='text-lg text-center'>This idea first came to life several years ago when I worked for a merchant named Ertugul Demir, owner of a construction materials store called Constructor...</p>
            </div>
        </div>
    )
}

export default HowItBegan
