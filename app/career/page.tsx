import React from 'react'
import styles from './page.module.css'
import CareerHeroSection from '@/components/career/CareerHeroSection'
import QuoteSection from '@/components/home-page/QuoteSection'

export default function page() {
    return (
        <main className={styles.main}>
            <CareerHeroSection />
            <QuoteSection quote={'meow'}            
            />
        </main>
    )
}