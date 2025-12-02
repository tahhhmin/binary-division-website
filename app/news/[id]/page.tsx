// app/news/[id]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import styles from './page.module.css';
import NewsImage from './NewsImage';

interface NewsItem {
  id: string;
  date: string;
  title: string;
  description: string;
  thumbnail?: string;
  links?: string[];
}

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getNewsItem(id: string): Promise<NewsItem | null> {
  try {
    // Determine the base URL based on environment
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000');
    
    const res = await fetch(`${baseUrl}/api/news/get?id=${id}`, { 
      cache: 'no-store',
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!res.ok) {
      console.error('Failed to fetch news:', res.status, res.statusText);
      return null;
    }

    const json = await res.json();
    
    if (!json.success || !json.data) {
      console.error('Invalid response format:', json);
      return null;
    }

    return json.data;
  } catch (error) {
    console.error('Error fetching news item:', error);
    return null;
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  // Await params in Next.js 15+
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    notFound();
  }

  const news = await getNewsItem(id);

  if (!news) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <article className={styles.newsDetailContainer}>
        <header className={styles.newsHeader}>
          <h1 className={styles.newsTitle}>{news.title}</h1>
          <time className={styles.newsDate} dateTime={news.date}>
            {news.date}
          </time>
        </header>

        {news.thumbnail && (
          <NewsImage 
            src={news.thumbnail} 
            alt={news.title}
            className={styles.newsImage}
          />
        )}

        <div className={styles.newsContent}>
          <p className={styles.newsDescription}>{news.description}</p>
        </div>

        {news.links && news.links.length > 0 && (
          <aside className={styles.newsLinks}>
            <h2>Related Links</h2>
            <ul>
              {news.links.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {new URL(link).hostname}
                    <span className={styles.linkIcon}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <nav className={styles.navigation}>
          <Link href="/news" className={styles.backLink}>
            ← Back to News
          </Link>
        </nav>
      </article>
    </main>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  
  if (!id) {
    return {
      title: 'News',
      description: 'Latest news and updates',
    };
  }

  const news = await getNewsItem(id);
  
  if (!news) {
    return {
      title: 'News Not Found',
      description: 'The requested news article could not be found.',
    };
  }

  return {
    title: news.title,
    description: news.description.substring(0, 160),
    openGraph: {
      title: news.title,
      description: news.description.substring(0, 160),
      type: 'article',
      publishedTime: news.date,
      images: news.thumbnail ? [news.thumbnail] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: news.title,
      description: news.description.substring(0, 160),
      images: news.thumbnail ? [news.thumbnail] : [],
    },
  };
}

// Generate static params for common news items (optional)
export async function generateStaticParams() {
  // You can optionally pre-render some news pages at build time
  // Return empty array to use dynamic rendering for all pages
  return [];
}