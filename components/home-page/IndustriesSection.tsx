'use client'

import React, { useState, useMemo } from 'react'
import styles from './IndustriesSection.module.css'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface IndustryItem {
  id: string
  title: string
  thumbnail: string
}

interface IndustriesSectionProps {
  itemsPerPage?: number
}

// Sample industries data
const industriesData: IndustryItem[] = [
    { id: '1', title: 'Finance', thumbnail: '#' },
    { id: '2', title: 'Healthcare', thumbnail: '#' },
    { id: '3', title: 'Technology', thumbnail: '#' },
    { id: '4', title: 'Manufacturing', thumbnail: '#' },
    { id: '5', title: 'Education', thumbnail: '#' },
    { id: '6', title: 'Retail', thumbnail: '#' },
    { id: '7', title: 'Energy', thumbnail: '#' },
    { id: '8', title: 'Transportation', thumbnail: '#' },
]

export default function IndustriesSection({ itemsPerPage = 4 }: IndustriesSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(industriesData.length / itemsPerPage)

  const currentIndustries = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return industriesData.slice(start, end)
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
    <section className={styles.section}>
      <div className={styles.titleSection}>
        <h2 className={styles.sectionTitle}>Industries</h2>
        <p className={styles.sectionSubtitle}>Your Trusted Partner</p>
      </div>

      <div className={styles.container}>
        {currentIndustries.map((item) => (
          <div key={item.id} className={styles.industryItem}>
            <img src={item.thumbnail} alt={item.title} className={styles.thumbnail} />
            <h3 className={styles.title}>{item.title}</h3>
          </div>
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
