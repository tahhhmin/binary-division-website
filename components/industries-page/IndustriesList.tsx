'use client'

import React, { useState, useMemo } from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import styles from './IndustriesList.module.css'
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
    link: string
}

interface IndustriesSectionProps {
    itemsPerPage?: number
}

const industriesData: IndustryItem[] = [
    { id: '1', title: 'Critical Medical Delivery', thumbnail: CMD, link: "/critical-medical-delivery" },
    { id: '2', title: 'Automated Delivery', thumbnail: null, link: "/automated-delivery" },
    { id: '3', title: 'Disaster Response & Assessment', thumbnail: null, link: "/disaster-response" },
    { id: '4', title: 'Hazardous Environment Exploration', thumbnail: null, link: "/hazardous-environment-exploration" },
    { id: '5', title: 'Security Surveillance', thumbnail: null, link: "/security-surveillance" },
    { id: '6', title: 'Infrastructure Inspection', thumbnail: null, link: "/infrastructure-inspection" },
    { id: '7', title: 'Network Establishment', thumbnail: null, link: "/network-establishment" },
    { id: '8', title: 'Weather Monitoring', thumbnail: null, link: "/weather-monitoring" },
    { id: '9', title: 'Agriculture Automation', thumbnail: null, link: "/agriculture-automation" },
    { id: '10', title: 'Wildlife & Ecosystem Monitoring', thumbnail: null, link: "/wildlife-monitoring" },
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
        <div className={styles.container}>
            <div className={styles.grid}>
                {currentIndustries.map((item) => (
                <Link 
                    key={item.id} 
                    href={item.link} 
                    className={styles.industryItem}
                >
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
                </Link>
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
        </div>
    )
}
