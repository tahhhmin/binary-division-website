'use client'

import React, { useState, useMemo } from 'react'
import Image, { StaticImageData } from 'next/image'
import styles from './ProjectSection.module.css'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Import local SVG
import Rover from '@/public/rover.svg'

// TypeScript interface
interface Project {
  id: string
  title: string
  image: string | StaticImageData
  description: string
}

// Projects data
const projectsData: Project[] = [
  { id: '1', title: 'Project Alpha', image: Rover, description: 'AI platform for enterprise operations.' },
  { id: '2', title: 'Project Beta', image: Rover, description: 'AI project with advanced analytics.' },
  { id: '3', title: 'Project Gamma', image: Rover, description: 'Automation and predictive analytics.' },
  { id: '4', title: 'Project Delta', image: Rover, description: 'Next-gen AI solutions.' },
  { id: '5', title: 'Project Epsilon', image: Rover, description: 'Smart AI optimization.' },
  { id: '6', title: 'Project Zeta', image: Rover, description: 'Advanced enterprise automation.' },
]

interface ProjectSectionProps {
  itemsPerPage?: number
}

export default function ProjectSection({ itemsPerPage = 3 }: ProjectSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(projectsData.length / itemsPerPage)

  const currentProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return projectsData.slice(start, end)
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
    <section className={styles.section} id="projects-section">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <p className={styles.sectionSubtitle}>Exploring the Edge of Advanced Technology</p>
      </div>

      <div className={styles.grid}>
        {currentProjects.map((project) => (
          <div key={project.id} className={styles.card}>
            <Image
              src={project.image}
              alt={project.title}
              width={300}
              height={300}
              className={styles.image}
            />
            <div className={styles.meta}>
              <h3 className={styles.name}>{project.title}</h3>
              <p>{project.description}</p>
            </div>
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
