'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"

interface NewsItem {
    id: string
    date: string
    title: string
    description: string
    thumbnail?: string
}

interface PaginationData {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNext: boolean
    hasPrevious: boolean
}

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set())

    const ITEMS_PER_PAGE = 6

    const fetchNews = async (pageNum: number) => {
        setLoading(true)
        try {
        const res = await fetch(`/api/news/get?page=${pageNum}&limit=${ITEMS_PER_PAGE}`)
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const json = await res.json()

        if (json.success && json.data) {
            setNews(json.data)
            setTotalPages(json.pagination?.totalPages || 1)
        } else {
            console.error('Invalid response format:', json)
            setNews([])
            setTotalPages(1)
        }
        } catch (err) {
        console.error('Failed to fetch news:', err)
        setNews([])
        setTotalPages(1)
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        fetchNews(page)
    }, [page])

    const handleImageError = (id: string) => {
        setBrokenImages(prev => new Set(prev).add(id))
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const showEllipsisThreshold = 5
        
        if (totalPages <= showEllipsisThreshold) {
        // Show all pages if total is small
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
        } else {
        // Always show first page
        pages.push(1)
        
        // Show ellipsis if needed
        if (page > 3) {
            pages.push('...')
        }
        
        // Show pages around current page
        for (let i = Math.max(2, page - 1); i <= Math.min(page + 1, totalPages - 1); i++) {
            pages.push(i)
        }
        
        // Show ellipsis if needed
        if (page < totalPages - 2) {
            pages.push('...')
        }
        
        // Always show last page
        if (totalPages > 1) {
            pages.push(totalPages)
        }
        }
    
    return pages
  }

  return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>News</h1>
                    <p>The Latest Updates</p>
                </div>

                {loading && (
                    <div className={styles.loading}>
                        <div className={styles.loadingSpinner}></div>
                        <Progress value={33} />
                    </div>
                )}
                
                {!loading && news.length === 0 && (
                    <div className={styles.empty}>
                        <p className='muted-text'>No news found.</p>
                    </div>
                )}

                {!loading && news.length > 0 && (
                    <div className={styles.grid}>
                        {news.map(item => (
                            <Link 
                                key={item.id} 
                                href={`/news/${item.id}`} 
                                className={styles.card}
                            >
                                <div className={styles.thumbnailWrapper}>
                                    {item.thumbnail && !brokenImages.has(item.id) ? (
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className={styles.thumbnail}
                                            onError={() => handleImageError(item.id)}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className={styles.thumbnailPlaceholder}></div>
                                    )}
                                </div>

                                <div className={styles.info}>
                                    <h4>{item.date}</h4>
                                    <h3>{item.title}</h3>
                                    <p>
                                        {item.description.length > 150 
                                        ? `${item.description.substring(0, 150)}...` 
                                        : item.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                <div className={styles.paginationWrapper}>
                    <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(page - 1)
                            }}
                            className={page === 1 ? styles.disabled : ''}
                            aria-disabled={page === 1}
                        />
                        </PaginationItem>

                        {getPageNumbers().map((pageNum, index) => {
                        if (pageNum === '...') {
                            return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <span className={styles.ellipsis}>...</span>
                            </PaginationItem>
                            )
                        }

                        return (
                            <PaginationItem key={pageNum}>
                            <PaginationLink
                                href="#"
                                isActive={page === pageNum}
                                onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(pageNum as number)
                                }}
                            >
                                {pageNum}
                            </PaginationLink>
                            </PaginationItem>
                        )
                        })}

                        <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(page + 1)
                            }}
                            className={page === totalPages ? styles.disabled : ''}
                            aria-disabled={page === totalPages}
                        />
                        </PaginationItem>
                    </PaginationContent>
                    </Pagination>
                </div>
                )}
            </div>
        </main>
    )
}