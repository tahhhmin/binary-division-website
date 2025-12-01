import React from 'react'
import styles from './styles/page.module.css'
import HeroSection from '@/components/home-page/HeroSection'
import ProjectSection from '@/components/home-page/ProjectSection'
import IndustriesSection from '@/components/home-page/IndustriesSection'
import PartnersSection from '@/components/home-page/PartnersSection'
import CareerSection from '@/components/home-page/CareerSection'
import ServicesProductsSection from '@/components/home-page/ServicesProductsSection'
import TeamsSection from '@/components/home-page/TeamsSection'
import QuoteSection from '@/components/home-page/QuoteSection'
import NewsSection from '@/components/home-page/NewsSection'

export default function page() {
    return (
        <main className={styles.main}>
                <HeroSection />
                <ServicesProductsSection />
                <QuoteSection 
                    quote="Our machines go where people shouldn't have to, protecting those who move the world."
                    showAuthor={false}
                    author=''
                />
                <ProjectSection />
                <IndustriesSection />
                <NewsSection />
                <PartnersSection />
                <CareerSection />
                <QuoteSection 
                    quote="Somewhere, something incredible is waiting to be known."
                    showAuthor={true}
                    author='Carl Sagan'
                />
                <TeamsSection />
        </main>
    )
}
