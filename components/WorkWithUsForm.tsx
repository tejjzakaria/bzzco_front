"use client";
import React, { useState } from 'react';
import { IconLocation } from '@tabler/icons-react';


const WorkWithUsForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phoneNumber: '' });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phoneNumber', form.phoneNumber);
      if (cvFile) formData.append('cv', cvFile);
      const res = await fetch('/api/job-application', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Application submitted successfully!');
        setForm({ name: '', email: '', phoneNumber: '' });
        setCvFile(null);
      } else {
        setError(data.error || 'Failed to submit application.');
      }
    } catch {
      setError('Failed to submit application.');
    } finally {
      setLoading(false);
    }
  }; 

  return (
        <div className='flex justify-center items-center min-h-screen gap-10'>
            {/* Contact Info Card */}
            <div className='bg-black bg-opacity-70 text-white p-10 rounded-lg w-[600px] max-w-md h-[400px] relative overflow-hidden flex-shrink-0'>
                <div className='gap-4'>
                    <h1 className='text-4xl font-bold mb-2'>Work with us!</h1>
                    <p>Join our team and help us create amazing products!</p>
                </div>
                <div className='mt-20'>
                    <div className='my-8 flex flex-row items-start gap-4'>
                        <div className='flex items-center justify-center bg-white p-2 rounded-lg text-black mt-1'>
                            <span className='flex items-center justify-center h-full w-full'>
                                <IconLocation size={20} />
                            </span>
                        </div>
                        <span><strong>Netherlands Office:</strong> Poortland 146, 1046BD Amsterdam, Netherlands</span>
                    </div>
                </div>
                <div className='mt-1'>
                    <div className='my-8 flex flex-row items-start gap-4'>
                        <div className='flex items-center justify-center bg-white p-2 rounded-lg text-black mt-1'>
                            <span className='flex items-center justify-center h-full w-full'>
                                <IconLocation size={20} />
                            </span>
                        </div>
                        <span><strong>Morocco Office:</strong> Av Abou Bakr El Kadiri, Résidences PANORAMA, Imm 11, Apt 7, Etage 3, Casablanca 20500, Morocco</span>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className='absolute -bottom-10 -right-10 w-32 h-32 border-2 border-blue-500 rounded-full opacity-50'></div>
                <div className='absolute -bottom-16 -right-16 w-40 h-40 border border-blue-400 rounded-full opacity-30'></div>
                <div className='absolute -bottom-4 -right-4 w-20 h-20 border border-blue-300 rounded-full opacity-40'></div>
            </div>

            {/* Contact Form Card */}
            <div className='flex flex-col items-center justify-center w-[420px] max-w-md'>
                <form className='p-10 rounded-lg w-full mt-0' onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-semibold mb-2' htmlFor='name'>Name</label>
                        <input className='w-full px-3 py-2 border-b border-black rounded-lg focus:outline-none focus:border-orange-500' type='text' id='name' name='name' placeholder='Your Name' value={form.name} onChange={handleChange} required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-semibold mb-2' htmlFor='email'>Email</label>
                        <input className='w-full px-3 py-2 border-b border-black rounded-lg focus:outline-none focus:border-orange-500' type='email' id='email' name='email' placeholder='Your Email' value={form.email} onChange={handleChange} required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-semibold mb-2' htmlFor='phoneNumber'>Phone Number</label>
                        <input className='w-full px-3 py-2 border-b border-black rounded-lg focus:outline-none focus:border-orange-500' type='tel' id='phoneNumber' name='phoneNumber' placeholder='Your Phone Number' value={form.phoneNumber} onChange={handleChange} required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-semibold mb-2' htmlFor='cv'>Upload CV</label>
                        <div className='relative w-full h-32 flex items-center justify-center border-2 border-dashed border-orange-400 rounded-lg bg-orange-50 cursor-pointer hover:bg-orange-100 transition group'>
                            <input
                                type='file'
                                id='cv'
                                name='cv'
                                accept='.pdf,.doc,.docx'
                                onChange={handleFileChange}
                                required
                                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
                            />
                            <div className='flex flex-col items-center justify-center pointer-events-none z-0'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                <span className='text-orange-500 font-semibold'>Drag & drop or click to upload CV</span>
                                <span className='text-xs text-gray-500 mt-1'>PDF, DOC, DOCX (max 5MB)</span>
                                {cvFile && <span className='text-xs text-green-600 mt-2'>Selected: {cvFile.name}</span>}
                            </div>
                        </div>
                    </div>
                    <button className='bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition' type='submit' disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
                    {success && <div className='mt-4 text-green-600 font-semibold'>{success}</div>}
                    {error && <div className='mt-4 text-red-600 font-semibold'>{error}</div>}
                </form>
            </div>
        </div>
    )
}

export default WorkWithUsForm
