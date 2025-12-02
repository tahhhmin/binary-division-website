import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import styles from './page.module.css';
import NewsImage from './NewsImage';
import { BackButton } from '@/components/global/buttons/BackButton';

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
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                    'http://localhost:3000');
        
        const res = await fetch(`${baseUrl}/api/news/get?id=${id}`, { 
            cache: 'no-store',
            next: { revalidate: 60 } 
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
            <article className={styles.card}>
                <div className={styles.cardThumbnail}>                    
                    {news.thumbnail && (
                        <NewsImage 
                            src={news.thumbnail} 
                            alt={news.title}
                            className={styles.newsImage}
                        />
                    )}

                    <div className={styles.cardLinks}>
                        {news.links && news.links.length > 0 && (
                            <aside className={styles.newsLinks}>
                                <ul>
                                    {news.links.map((link, idx) => (
                                        <li key={idx}>
                                            <Link 
                                                href={link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className={styles.link}
                                            >
                                                {new URL(link).hostname}
                                                <span className={styles.linkIcon}>↗</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                        )}
                    </div>
                </div>

                <div className={styles.cardInfo}>
                    <nav className={styles.navigation}>
                        <BackButton />
                    </nav>

                    <header className={styles.header}>
                            <h3 className={styles.newsDate}>
                                {news.date}
                            </h3>
                            <h2 className={styles.newsTitle}>{news.title}</h2>
                    </header>

                    <div className={styles.newsContent}>
                        <p className={styles.newsDescription}>{news.description}</p>
                    </div>
                </div>
            </article>
        </main>
    );
}

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

export async function generateStaticParams() {
    return [];
}