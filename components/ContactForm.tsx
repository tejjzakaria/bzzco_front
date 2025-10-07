'use client'

import React, { useState } from 'react';
import { IconLocation } from '@tabler/icons-react';

const ContactForm = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess('Message sent successfully!');
                setForm({ name: '', email: '', message: '' });
            } else {
                setError(data.error || 'Failed to send message.');
            }
        } catch (err) {
            setError('Failed to send message.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-6 md:gap-10 px-4 sm:px-8">
            {/* Contact Info Card */}
            <div className='bg-black bg-opacity-70 text-white p-6 sm:p-10 rounded-lg w-full md:w-[600px] max-w-md h-[400px] relative overflow-hidden flex-shrink-0'>
                <div className='gap-4'>
                    <h1 className='text-3xl sm:text-4xl font-bold mb-2'>Contact Information</h1>
                    <p className='text-sm sm:text-base'>Say something to start a live chat!</p>
                </div>
                <div className='mt-10 sm:mt-20'>
                          <div className='my-6 sm:my-8 flex flex-row items-start gap-4'>
                            <div className='flex items-center justify-center bg-white p-2 rounded-lg text-black mt-1'>
                              <span className='flex items-center justify-center h-full w-full'>
                                <IconLocation size={20} />
                              </span>
                            </div>
                            <span className='text-sm sm:text-base'><strong>Netherlands Office:</strong> Mercuriusplein 1,
                              2340 Hoofddorp, Netherlands</span>
                          </div>
                        </div>
                        <div className='mt-1'>
                          <div className='my-6 sm:my-8 flex flex-row items-start gap-4'>
                            <div className='flex items-center justify-center bg-white p-2 rounded-lg text-black mt-1'>
                              <span className='flex items-center justify-center h-full w-full'>
                                <IconLocation size={20} />
                              </span>
                            </div>
                            <span className='text-sm sm:text-base'><strong>Morocco Office:</strong> We are preparing to welcome you very soon in Morocco.</span>
                          </div>
                        </div>
                {/* Decorative circles */}
                <div className='absolute -bottom-10 -right-10 w-32 h-32 border-2 border-blue-500 rounded-full opacity-50'></div>
                <div className='absolute -bottom-16 -right-16 w-40 h-40 border border-blue-400 rounded-full opacity-30'></div>
                <div className='absolute -bottom-4 -right-4 w-20 h-20 border border-blue-300 rounded-full opacity-40'></div>
            </div>

            {/* Contact Form Card */}
            <div className='flex flex-col items-center justify-center w-full md:w-[420px] max-w-md'>
                <form className='p-6 sm:p-10 rounded-lg w-full mt-0' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-semibold mb-2' htmlFor='name'>Name</label>
                        <input className='w-full px-3 py-2 border-b border-black rounded-lg focus:outline-none focus:border-orange-500' type='text' id='name' name='name' placeholder='Your Name' value={form.name} onChange={handleChange} required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-semibold mb-2' htmlFor='email'>Email</label>
                        <input className='w-full px-3 py-2 border-b border-black rounded-lg focus:outline-none focus:border-orange-500' type='email' id='email' name='email' placeholder='Your Email' value={form.email} onChange={handleChange} required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-semibold mb-2' htmlFor='message'>Message</label>
                        <textarea className='w-full px-3 py-2 border-b border-black rounded-lg focus:outline-none focus:border-orange-500' id='message' name='message' rows={4} placeholder='Your Message' value={form.message} onChange={handleChange} required></textarea>
                    </div>
                    <button className='bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition' type='submit' disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
                    {success && <div className='mt-4 text-green-600 font-semibold'>{success}</div>}
                    {error && <div className='mt-4 text-red-600 font-semibold'>{error}</div>}
                </form>
            </div>
        </div>
    )
}

export default ContactForm
