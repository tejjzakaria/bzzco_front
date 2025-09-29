import React from 'react'
import { IconLocation } from '@tabler/icons-react'


const RegisterSellerForm = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center items-center min-h-screen gap-6 md:gap-10 px-4 sm:px-8'>
            {/* Contact Info Card */}
            <div className='bg-black bg-opacity-70 text-white p-6 sm:p-10 rounded-lg w-full md:w-[400px] max-w-md h-[400px] relative overflow-hidden flex-shrink-0 mb-6 md:mb-0'>
                <div className='gap-4'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2'>Register your shop here</h1>
                    <p className='text-sm sm:text-base'>Please fill in the details below to register your shop.</p>
                </div>


                {/* Decorative circles */}
                <div className='absolute -bottom-10 -right-10 w-32 h-32 border-2 border-blue-500 rounded-full opacity-50'></div>
                <div className='absolute -bottom-16 -right-16 w-40 h-40 border border-blue-400 rounded-full opacity-30'></div>
                <div className='absolute -bottom-4 -right-4 w-20 h-20 border border-blue-300 rounded-full opacity-40'></div>
            </div>

            {/* Contact Form Card */}
            <div className='flex flex-col items-center justify-center w-full md:w-[620px] max-w-md'>
                <form className='p-6 sm:p-10 rounded-lg w-full mt-0'>
                    <div className='flex flex-col md:flex-row gap-4 mb-4'>
                        <div className='mb-4 w-full'>
                            <label className='block text-gray-700 font-semibold mb-2' htmlFor='name'>Shop Name*</label>
                            <input className='w-full px-3 py-2 border-b border-black rounded-lg focus:outline-none focus:border-orange-500' type='text' id='name' name='name' placeholder='Your Shop Name' />
                        </div>
                        <div className='mb-4 w-full'>
                            <label className='block text-gray-700 font-semibold mb-2' htmlFor='owner'>Owner Name*</label>
                            <input className='w-full px-3 py-2 border-b border-black rounded-lg focus:outline-none focus:border-orange-500' type='text' id='owner' name='owner' placeholder='Your Name' />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-4 mb-4'>
                        <div className='mb-4 w-full'>
                            <label className='block text-gray-700 font-semibold mb-2' htmlFor='phone'>Phone Number*</label>
                            <input className='w-full px-3 py-2 border-b border-black rounded-lg focus:outline-none focus:border-orange-500' type='text' id='phone' name='phone' placeholder='Your Phone Number' />
                        </div>
                        <div className='mb-4 w-full'>
                            <label className='block text-gray-700 font-semibold mb-2' htmlFor='email'>Email*</label>
                            <input className='w-full px-3 py-2 border-b border-black rounded-lg focus:outline-none focus:border-orange-500' type='email' id='email' name='email' placeholder='Your Email' />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-semibold mb-2'>Business Type</label>
                        <div className='flex gap-4 my-5'>
                            <div>
                                <input type='radio' id='business-type-1' name='business-type' value='type1' className='peer hidden' />
                                <label htmlFor='business-type-1' className='cursor-pointer px-4 py-2 rounded-lg border border-gray-300 peer-checked:bg-orange-500 peer-checked:text-white transition'>Online</label>
                            </div>
                            <div>
                                <input type='radio' id='business-type-2' name='business-type' value='type2' className='peer hidden' />
                                <label htmlFor='business-type-2' className='cursor-pointer px-4 py-2 rounded-lg border border-gray-300 peer-checked:bg-orange-500 peer-checked:text-white transition'>Brick and Mortar</label>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-semibold mb-2' htmlFor='email'>Address</label>
                        <textarea className='w-full px-3 py-2 border-b border-black rounded-lg focus:outline-none focus:border-orange-500' id='address' name='address' placeholder='Your Address'></textarea>
                    </div>
                    

                    <button className='w-full md:w-[200px] bg-black hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition' type='submit'>Register</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterSellerForm
