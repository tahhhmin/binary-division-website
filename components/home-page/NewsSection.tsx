// components/NewsSection.tsx - Updated image error handling
'use client'

import React, { useState, useEffect } from 'react'
import styles from './NewsSection.module.css'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface NewsItem {
  id: string
  date: string
  title: string
  description: string
  thumbnail?: string
  link?: string
  links?: string[]
}

interface NewsSectionProps {
  itemsPerPage?: number
}

export default function NewsSection({ itemsPerPage = 3 }: NewsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [newsData, setNewsData] = useState<NewsItem[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set())

  // Fetch news data
  useEffect(() => {
    fetchNews()
  }, [currentPage, itemsPerPage])

  const fetchNews = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(
        `/api/news/get?page=${currentPage}&limit=${itemsPerPage}&sortBy=date&order=desc`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }
      
      const result = await response.json()
      
      if (result.success) {
        setNewsData(result.data)
        setTotalPages(result.pagination.totalPages)
      } else {
        throw new Error(result.error || 'Failed to load news')
      }
    } catch (err) {
      console.error('Error fetching news:', err)
      setError(err instanceof Error ? err.message : 'Failed to load news')
      // Set fallback empty data
      setNewsData([])
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    // Scroll to top of news section
    document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }
    return pages
  }

  const handleNewsClick = (item: NewsItem) => {
    if (item.link) {
      window.open(item.link, '_blank', 'noopener,noreferrer')
    }
  }

  const handleImageError = (itemId: string) => {
    setBrokenImages(prev => new Set(prev).add(itemId))
  }

  if (loading) {
    return (
      <section className={styles.section} id="news-section">
        <div className={styles.titleSection}>
          <h2 className={styles.sectionTitle}>News</h2>
          <p className={styles.sectionSubtitle}>The Latest Updates</p>
        </div>
        <div className={styles.container}>
          <div className={styles.loadingMessage}>Loading news...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.section} id="news-section">
        <div className={styles.titleSection}>
          <h2 className={styles.sectionTitle}>News</h2>
          <p className={styles.sectionSubtitle}>The Latest Updates</p>
        </div>
        <div className={styles.container}>
          <div className={styles.errorMessage}>
            <p>Unable to load news at this time.</p>
            <button onClick={fetchNews} className={styles.retryButton}>
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (newsData.length === 0) {
    return (
      <section className={styles.section} id="news-section">
        <div className={styles.titleSection}>
          <h2 className={styles.sectionTitle}>News</h2>
          <p className={styles.sectionSubtitle}>The Latest Updates</p>
        </div>
        <div className={styles.container}>
          <div className={styles.emptyMessage}>
            <p>No news articles available at the moment.</p>
            <p>Check back later for updates!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section} id="news-section">
      <div className={styles.titleSection}>
        <h2 className={styles.sectionTitle}>News</h2>
        <p className={styles.sectionSubtitle}>The Latest Updates</p>
      </div>

      <div className={styles.container}>
        {newsData.map((item) => (
          <article 
            key={item.id} 
            className={`${styles.newsContainer} ${item.link ? styles.clickable : ''}`}
            onClick={() => handleNewsClick(item)}
          >
            <div className={styles.thumbnailWrapper}>
              {item.thumbnail && !brokenImages.has(item.id) ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={styles.thumbnail}
                  loading="lazy"
                  onError={() => handleImageError(item.id)}
                />
              ) : (
                <div className={styles.thumbnailPlaceholder}>

                </div>
              )}
            </div>
            <div className={styles.description}>
              <h4 className={styles.date}>{item.date}</h4>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.excerpt}>{item.description}</p>

            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(currentPage - 1)
                  }}
                  className={currentPage === 1 ? styles.disabled : ''}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {typeof page === 'number' ? (
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(page)
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  ) : (
                    <PaginationEllipsis />
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? styles.disabled : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  )
}