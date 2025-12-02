'use client'

import React, { useState, useMemo } from 'react'
import Image, { StaticImageData } from 'next/image'
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

import CMD from '@/public/industries/drone.jpg'

interface IndustryItem {
  id: string
  title: string
  thumbnail: string | StaticImageData | null
}

interface IndustriesSectionProps {
  itemsPerPage?: number
}

// Sample industries data
const industriesData: IndustryItem[] = [
  { id: '1', title: 'Critical Medical Delivery', thumbnail: CMD },
  { id: '2', title: 'Automated Delivery', thumbnail: null },
  { id: '3', title: 'Disaster Response & Assessment', thumbnail: null },
  { id: '4', title: 'Hazardous Environment Exploration', thumbnail: null },
  { id: '5', title: 'Security Surveillance', thumbnail: null },
  { id: '6', title: 'Infrastructure Inspection', thumbnail: null },
  { id: '7', title: 'Network Establishment', thumbnail: null },
  { id: '8', title: 'Weather Monitoring', thumbnail: null },
  { id: '9', title: 'Agriculture Automation', thumbnail: null },
  { id: '10', title: 'Wildlife & Ecosystem Monitoring', thumbnail: null },
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
            {item.thumbnail ? (
              <Image
                src={item.thumbnail}
                alt={item.title}
                className={styles.thumbnail}
                width={200}
                height={200}
              />
            ) : (
              <div className={styles.thumbnail}></div>
            )}
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