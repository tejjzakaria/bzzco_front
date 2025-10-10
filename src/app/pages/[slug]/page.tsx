"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NavBar } from '../../../../components/NavBar';
import Footer from '../../../../components/Footer';

interface Page {
  _id: string;
  title: string;
  slug: string;
  content: string;
  metaDescription?: string;
  metaKeywords?: string[];
  status: string;
  pageType: string;
  template: string;
  createdAt: string;
  updatedAt: string;
}

export default function PageView() {
  const params = useParams();
  const slug = params.slug as string;
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPage() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch('/api/pages');
        if (!res.ok) throw new Error('Failed to fetch');
        const pages: Page[] = await res.json();
        const foundPage = pages.find(p => p.slug === slug);
        if (foundPage) {
          setPage(foundPage);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
      setLoading(false);
    }
    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-orange-500 font-bold text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-4">Page not found</p>
          <Link href="/" className="text-orange-500 hover:text-orange-600 font-semibold">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <article className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{page.title}</h1>
            <div
              className="prose prose-lg max-w-none page-content"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date(page.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </article>
        </div>
        <style jsx>{`
        .page-content :global(h1) {
          font-size: 2rem;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }
        .page-content :global(h2) {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #374151;
        }
        .page-content :global(h3) {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #4b5563;
        }
        .page-content :global(h4) {
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #4b5563;
        }
        .page-content :global(p) {
          margin-bottom: 1rem;
          color: #4b5563;
          line-height: 1.75;
        }
        .page-content :global(ul) {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: #4b5563;
        }
        .page-content :global(ol) {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: #4b5563;
        }
        .page-content :global(li) {
          margin-bottom: 0.5rem;
        }
        .page-content :global(strong) {
          font-weight: 600;
          color: #1f2937;
        }
        .page-content :global(a) {
          color: #f97316;
          text-decoration: underline;
        }
        .page-content :global(a:hover) {
          color: #ea580c;
        }
        .page-content :global(hr) {
          margin: 2rem 0;
          border-top: 1px solid #e5e7eb;
        }
      `}</style>
      </div>

      <Footer />
    </div>
  );
}
