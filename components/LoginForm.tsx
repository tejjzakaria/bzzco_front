import React from 'react'
import { IconLocation } from '@tabler/icons-react'


const LoginForm = () => {
    return (
        <div className='flex justify-center items-center min-h-screen gap-10'>

            <div className='flex flex-col items-center justify-center w-[420px] max-w-md bg-white shadow-md rounded-xl'>
                <form className='p-10 rounded-lg w-full mt-0'>
                    <div className='w-full mb-4 flex justify-center'>
                        <span className='text-xl font-semibold text-center'>Sign In To Your Account.</span>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-semibold mb-2' htmlFor='email'>Email</label>
                        <input className='w-full px-3 py-2 border-b border-black rounded-lg focus:outline-none focus:border-orange-500 transition-all' type='text' id='email' name='email' placeholder='Your Email' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-semibold mb-2' htmlFor='password'>Password</label>
                        <input className='w-full px-3 py-2 border-b border-black rounded-lg focus:outline-none focus:border-orange-500 transition-all' type='password' id='password' name='password' placeholder='Your Password' />
                    </div>
                    <div className='mb-4'>
                        <span className='text-orange-400'><a href="#">Forgot password?</a></span>
                    </div>
                    <div className='mb-4'>
                        <button className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer' type='submit'>Sign In</button>
                    </div>
                    <div className='text-center'>
                        <span>Don't have an account yet? <a className='text-orange-400' href="/signup">Sign up</a></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
