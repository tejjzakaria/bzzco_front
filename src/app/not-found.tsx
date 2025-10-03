import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-center px-4">
      <h1 className="text-5xl font-bold text-orange-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6 text-gray-600">Sorry, the page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition">Go Home</Link>
    </div>
  );
}
