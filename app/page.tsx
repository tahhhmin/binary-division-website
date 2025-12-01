import React from 'react'
import styles from './styles/page.module.css'
import HeroSection from '@/components/home-page/HeroSection'
import ProjectSection from '@/components/home-page/ProjectSection'
import IndustriesSection from '@/components/home-page/IndustriesSection'
import PartnersSection from '@/components/home-page/PartnersSection'
import CareerSection from '@/components/home-page/CareerSection'
import ServicesProductsSection from '@/components/home-page/ServicesProductsSection'

export default function page() {
    return (
        <main className={styles.main}>
                <HeroSection />
                <ServicesProductsSection />
                <ProjectSection />
                <IndustriesSection />
                <PartnersSection />
                <CareerSection />
        </main>
    )
}
