'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SECTION_CONTAINER } from '@/lib/styles';

const RegisterSellerForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        // Basic Information
        shopName: '',
        ownerName: '',
        email: '',
        phone: '',

        // Business Information
        businessType: 'online' as 'online' | 'brick-and-mortar' | 'both',
        businessRegistrationNumber: '',
        taxId: '',
        yearEstablished: '',

        // Address Information
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Netherlands',

        // Business Details
        businessDescription: '',
        productCategories: [] as string[],
        estimatedMonthlyRevenue: '',
        numberOfEmployees: '',
        websiteUrl: '',

        // Social Media
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',

        // Bank Information
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
        iban: '',

        // Agreement
        agreementAccepted: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = e.target.options;
        const selected: string[] = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setFormData(prev => ({ ...prev, productCategories: selected }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const submitData = {
                ...formData,
                socialMedia: {
                    facebook: formData.facebook,
                    instagram: formData.instagram,
                    linkedin: formData.linkedin,
                    twitter: formData.twitter,
                },
                yearEstablished: formData.yearEstablished ? parseInt(formData.yearEstablished) : undefined,
            };

            const res = await fetch('/api/seller-applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit application');
            }

            setSuccess(true);
            // Reset form after 3 seconds and redirect
            setTimeout(() => {
                router.push('/');
            }, 8000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit application');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className={`${SECTION_CONTAINER} min-h-screen flex items-center justify-center`}>
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 max-w-md text-center">
                    <div className="text-green-500 text-6xl mb-4">✓</div>
                    <h2 className="text-2xl font-bold text-green-700 mb-2">Application Submitted!</h2>
                    <p className="text-gray-700">
                        Thank you for applying to become a seller! We will review your application and get back to you within 3-5 business days.
                    </p>
                    <p className="text-sm text-gray-600 mt-4">Redirecting to home...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${SECTION_CONTAINER} min-h-screen`}>
            <div className='flex flex-col lg:flex-row justify-center items-start gap-8'>
                {/* Info Card */}
                <div className='bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-2xl w-full lg:w-[400px] lg:sticky lg:top-8 shadow-xl'>
                    <h1 className='text-3xl md:text-4xl font-bold mb-4'>Become a Seller</h1>
                    <p className='text-orange-100 mb-6'>Join our marketplace and reach thousands of customers!</p>

                    <div className='space-y-4'>
                        <div className='flex items-start gap-3'>
                            <div className='bg-white/20 rounded-full p-2 mt-1'>✓</div>
                            <div>
                                <h3 className='font-semibold'>Easy Setup</h3>
                                <p className='text-sm text-orange-100'>Get started in minutes with our simple onboarding</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-3'>
                            <div className='bg-white/20 rounded-full p-2 mt-1'>✓</div>
                            <div>
                                <h3 className='font-semibold'>Reach More Customers</h3>
                                <p className='text-sm text-orange-100'>Access our growing customer base</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-3'>
                            <div className='bg-white/20 rounded-full p-2 mt-1'>✓</div>
                            <div>
                                <h3 className='font-semibold'>Secure Payments</h3>
                                <p className='text-sm text-orange-100'>Fast and secure payment processing</p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-8 pt-8 border-t border-white/20'>
                        <p className='text-sm text-orange-100'>Need help? Contact us at</p>
                        <a href="mailto:sellers@bzzco.com" className='font-semibold hover:underline'>sellers@bzzco.com</a>
                    </div>
                </div>

                {/* Form Card */}
                <div className='flex-1 w-full max-w-3xl'>
                    <form onSubmit={handleSubmit} className='bg-white rounded-2xl shadow-lg p-8'>
                        {error && (
                            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6'>
                                {error}
                            </div>
                        )}

                        {/* Basic Information */}
                        <div className='mb-8'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-orange-500'>
                                Basic Information
                            </h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='shopName'>
                                        Shop Name <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='text'
                                        id='shopName'
                                        name='shopName'
                                        value={formData.shopName}
                                        onChange={handleChange}
                                        required
                                        placeholder='Your Shop Name'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='ownerName'>
                                        Owner Name <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='text'
                                        id='ownerName'
                                        name='ownerName'
                                        value={formData.ownerName}
                                        onChange={handleChange}
                                        required
                                        placeholder='Your Full Name'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='email'>
                                        Email <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder='your@email.com'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='phone'>
                                        Phone Number <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='tel'
                                        id='phone'
                                        name='phone'
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder='+31 6 12345678'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Business Information */}
                        <div className='mb-8'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-orange-500'>
                                Business Information
                            </h2>
                            <div className='mb-4'>
                                <label className='block text-gray-700 font-semibold mb-2'>
                                    Business Type <span className='text-red-500'>*</span>
                                </label>
                                <div className='flex flex-wrap gap-4'>
                                    {[
                                        { value: 'online', label: 'Online Only' },
                                        { value: 'brick-and-mortar', label: 'Physical Store' },
                                        { value: 'both', label: 'Both' }
                                    ].map(type => (
                                        <label key={type.value} className='flex items-center cursor-pointer'>
                                            <input
                                                type='radio'
                                                name='businessType'
                                                value={type.value}
                                                checked={formData.businessType === type.value}
                                                onChange={handleChange}
                                                className='mr-2'
                                            />
                                            <span className={`px-4 py-2 rounded-lg border-2 transition ${
                                                formData.businessType === type.value
                                                    ? 'bg-orange-500 text-white border-orange-500'
                                                    : 'border-gray-300 hover:border-orange-300'
                                            }`}>
                                                {type.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='businessRegistrationNumber'>
                                        Business Registration Number
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='text'
                                        id='businessRegistrationNumber'
                                        name='businessRegistrationNumber'
                                        value={formData.businessRegistrationNumber}
                                        onChange={handleChange}
                                        placeholder='KVK Number'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='taxId'>
                                        Tax ID / VAT Number
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='text'
                                        id='taxId'
                                        name='taxId'
                                        value={formData.taxId}
                                        onChange={handleChange}
                                        placeholder='BTW Number'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='yearEstablished'>
                                        Year Established
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='number'
                                        id='yearEstablished'
                                        name='yearEstablished'
                                        value={formData.yearEstablished}
                                        onChange={handleChange}
                                        min='1900'
                                        max={new Date().getFullYear()}
                                        placeholder='2020'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='numberOfEmployees'>
                                        Number of Employees
                                    </label>
                                    <select
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        id='numberOfEmployees'
                                        name='numberOfEmployees'
                                        value={formData.numberOfEmployees}
                                        onChange={handleChange}
                                    >
                                        <option value=''>Select...</option>
                                        <option value='1'>Just me</option>
                                        <option value='2-5'>2-5</option>
                                        <option value='6-10'>6-10</option>
                                        <option value='11-50'>11-50</option>
                                        <option value='50+'>50+</option>
                                    </select>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <label className='block text-gray-700 font-semibold mb-2' htmlFor='businessDescription'>
                                    Business Description <span className='text-red-500'>*</span>
                                </label>
                                <textarea
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                    id='businessDescription'
                                    name='businessDescription'
                                    value={formData.businessDescription}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    maxLength={1000}
                                    placeholder='Tell us about your business, what you sell, and what makes you unique...'
                                />
                                <p className='text-sm text-gray-500 mt-1'>
                                    {formData.businessDescription.length}/1000 characters
                                </p>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='productCategories'>
                                        Product Categories
                                    </label>
                                    <select
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        id='productCategories'
                                        name='productCategories'
                                        multiple
                                        size={4}
                                        value={formData.productCategories}
                                        onChange={handleCategoryChange}
                                    >
                                        <option value='Construction Materials'>Construction Materials</option>
                                        <option value='Tools & Equipment'>Tools & Equipment</option>
                                        <option value='Home Improvement'>Home Improvement</option>
                                        <option value='Plumbing'>Plumbing</option>
                                        <option value='Electrical'>Electrical</option>
                                        <option value='Paint & Supplies'>Paint & Supplies</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                    <p className='text-xs text-gray-500 mt-1'>Hold Ctrl/Cmd to select multiple</p>
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='estimatedMonthlyRevenue'>
                                        Estimated Monthly Revenue (EUR)
                                    </label>
                                    <select
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        id='estimatedMonthlyRevenue'
                                        name='estimatedMonthlyRevenue'
                                        value={formData.estimatedMonthlyRevenue}
                                        onChange={handleChange}
                                    >
                                        <option value=''>Select...</option>
                                        <option value='0-1000'>€0 - €1,000</option>
                                        <option value='1000-5000'>€1,000 - €5,000</option>
                                        <option value='5000-10000'>€5,000 - €10,000</option>
                                        <option value='10000-50000'>€10,000 - €50,000</option>
                                        <option value='50000+'>€50,000+</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className='mb-8'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-orange-500'>
                                Address Information
                            </h2>
                            <div className='space-y-4'>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='address'>
                                        Street Address <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='text'
                                        id='address'
                                        name='address'
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        placeholder='Street and number'
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                    <div>
                                        <label className='block text-gray-700 font-semibold mb-2' htmlFor='city'>
                                            City <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                            type='text'
                                            id='city'
                                            name='city'
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            placeholder='Amsterdam'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-gray-700 font-semibold mb-2' htmlFor='postalCode'>
                                            Postal Code <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                            type='text'
                                            id='postalCode'
                                            name='postalCode'
                                            value={formData.postalCode}
                                            onChange={handleChange}
                                            required
                                            placeholder='1012 AB'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-gray-700 font-semibold mb-2' htmlFor='country'>
                                            Country <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                            type='text'
                                            id='country'
                                            name='country'
                                            value={formData.country}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Online Presence (Optional) */}
                        <div className='mb-8'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-orange-500'>
                                Online Presence <span className='text-sm font-normal text-gray-500'>(Optional)</span>
                            </h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='websiteUrl'>
                                        Website URL
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='url'
                                        id='websiteUrl'
                                        name='websiteUrl'
                                        value={formData.websiteUrl}
                                        onChange={handleChange}
                                        placeholder='https://yourwebsite.com'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='facebook'>
                                        Facebook
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='url'
                                        id='facebook'
                                        name='facebook'
                                        value={formData.facebook}
                                        onChange={handleChange}
                                        placeholder='https://facebook.com/...'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='instagram'>
                                        Instagram
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='url'
                                        id='instagram'
                                        name='instagram'
                                        value={formData.instagram}
                                        onChange={handleChange}
                                        placeholder='https://instagram.com/...'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='linkedin'>
                                        LinkedIn
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='url'
                                        id='linkedin'
                                        name='linkedin'
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        placeholder='https://linkedin.com/...'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bank Information (Optional) */}
                        <div className='mb-8'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-orange-500'>
                                Bank Information <span className='text-sm font-normal text-gray-500'>(Optional - for payments)</span>
                            </h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='bankName'>
                                        Bank Name
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='text'
                                        id='bankName'
                                        name='bankName'
                                        value={formData.bankName}
                                        onChange={handleChange}
                                        placeholder='ING Bank'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='accountHolderName'>
                                        Account Holder Name
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='text'
                                        id='accountHolderName'
                                        name='accountHolderName'
                                        value={formData.accountHolderName}
                                        onChange={handleChange}
                                        placeholder='Full name on account'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2' htmlFor='iban'>
                                        IBAN
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                        type='text'
                                        id='iban'
                                        name='iban'
                                        value={formData.iban}
                                        onChange={handleChange}
                                        placeholder='NL00 BANK 0000 0000 00'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className='mb-8 bg-gray-50 p-6 rounded-lg'>
                            <label className='flex items-start cursor-pointer'>
                                <input
                                    type='checkbox'
                                    name='agreementAccepted'
                                    checked={formData.agreementAccepted}
                                    onChange={handleChange}
                                    required
                                    className='mt-1 mr-3'
                                />
                                <span className='text-sm text-gray-700'>
                                    I agree to the <a href='/pages/terms-of-service' target='_blank' className='text-orange-500 hover:underline'>Terms and Conditions</a> and <a href='/pages/privacy-policy' target='_blank' className='text-orange-500 hover:underline'>Privacy Policy</a>. I understand that my application will be reviewed and I will be notified via email about the decision.
                                    <span className='text-red-500'> *</span>
                                </span>
                            </label>
                        </div>

                        {/* Submit Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 justify-end'>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
                                disabled={loading}
                            >
                                ← Go Back
                            </button>
                            <button
                                className='px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed'
                                type='submit'
                                disabled={loading || !formData.agreementAccepted}
                            >
                                {loading ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterSellerForm
