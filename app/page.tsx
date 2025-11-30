import React from 'react'
import styles from './styles/page.module.css'
import HeroSection from '@/components/home-page/HeroSection'
import ProjectSection from '@/components/home-page/ProjectSection'

export default function page() {
    return (
        <main className={styles.main}>
                <HeroSection />
                <ProjectSection />
        </main>
    )
}
