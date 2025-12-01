'use client'

import React, { useState, useMemo } from 'react'
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
}

interface NewsSectionProps {
  itemsPerPage?: number
}

const newsData: NewsItem[] = [
  {
    id: '1',
    date: 'NOV 28, 2024',
    title: 'Binary Division Launches Revolutionary AI Platform for Enterprise Automation',
    description: 'Binary Division unveils its cutting-edge artificial intelligence platform designed to transform enterprise operations through intelligent automation and predictive analytics.',
    thumbnail: '#'
  },
  {
    id: '2',
    date: 'NOV 25, 2024',
    title: 'Strategic Partnership with Global Tech Leaders Announced',
    description: 'Binary Division partners with leading technology companies to accelerate digital transformation initiatives across multiple industries.',
    thumbnail: '#'
  },
  {
    id: '3',
    date: 'NOV 22, 2024',
    title: 'Binary Division Wins Innovation Award for Robotics Excellence',
    description: 'The company receives prestigious recognition for its groundbreaking work in robotics and autonomous systems development.',
    thumbnail: '#'
  },
  {
    id: '4',
    date: 'NOV 18, 2024',
    title: 'New Research Lab Opens to Drive Future Technologies',
    description: 'Binary Division inaugurates state-of-the-art research facility dedicated to advancing AI, quantum computing, and sustainable tech solutions.',
    thumbnail: '#'
  },
  {
    id: '5',
    date: 'NOV 15, 2024',
    title: 'Expanding Operations: Binary Division Goes Global',
    description: 'Company announces expansion into new international markets with offices opening in Europe, Asia, and South America.',
    thumbnail: '#'
  },
  {
    id: '6',
    date: 'NOV 12, 2024',
    title: 'Binary Division Hosts Annual Developer Conference',
    description: 'Thousands of developers gather for Binary DevCon 2024, featuring keynotes on emerging technologies and hands-on workshops.',
    thumbnail: '#'
  },
  {
    id: '7',
    date: 'NOV 8, 2024',
    title: 'Breakthrough in Quantum Computing Applications',
    description: 'Binary Division researchers achieve significant milestone in practical quantum computing applications for cryptography and optimization.',
    thumbnail: '#'
  },
  {
    id: '8',
    date: 'NOV 5, 2024',
    title: 'Sustainable Tech Initiative: Carbon Neutral by 2025',
    description: 'Binary Division commits to achieving carbon neutrality across all operations by 2025 through innovative green technologies.',
    thumbnail: '#'
  },
  {
    id: '9',
    date: 'NOV 2, 2024',
    title: 'AI Ethics Framework Released for Public Review',
    description: 'Company publishes comprehensive ethical guidelines for AI development and deployment, inviting community feedback.',
    thumbnail: '#'
  },
  {
    id: '10',
    date: 'OCT 30, 2024',
    title: 'Binary Division Academy: Training the Next Generation',
    description: 'Launch of educational program aimed at upskilling professionals in AI, machine learning, and advanced robotics.',
    thumbnail: '#'
  }
]

export default function NewsSection({ itemsPerPage = 3 }: NewsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(newsData.length / itemsPerPage)

  const currentNews = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return newsData.slice(start, end)
  }, [currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
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

  return (
    <section className={styles.section} id="news-section">
      <div className={styles.titleSection}>
        <h2 className={styles.sectionTitle}>News</h2>
        <p className={styles.sectionSubtitle}>The Latest Updates</p>
      </div>

      <div className={styles.container}>
        {currentNews.map((item) => (
          <article key={item.id} className={styles.newsContainer}>
            <div className={styles.thumbnailWrapper}>
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={styles.thumbnail}
                  loading="lazy"
                />
              ) : (
                <div className={styles.thumbnailPlaceholder} />
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
