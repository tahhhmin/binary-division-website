import React from 'react'
import styles from './IndustriesSection.module.css'
import IndustriesList from '@/components/industries-page/IndustriesList'

export default function IndustriesSection() {
    return (
        <section className={styles.section}>
            <header className={styles.header}>
                 <h2>Industries</h2>
                <p>Your Trusted Partner</p>
            </header>

            <div className={styles.gridContainer}>
                <IndustriesList />
            </div>
        </section>
    )
}
