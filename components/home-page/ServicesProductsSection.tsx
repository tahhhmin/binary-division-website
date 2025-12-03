import React from 'react'
import styles from './ServicesProductsSection.module.css'
import Link from 'next/link'
import ServicesList from '../services-page/ServicesList'
import ProductsList from '../products-page/ProductsList'

export default function ServicesProductsSection() {
    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2 >Services & Products</h2>
                <p>#</p>
            </div>
            <div className={styles.container}>
                <div className={styles.services}>
                    <ServicesList />
                </div>

                <div className={styles.products}>
                    <ProductsList />
                </div>
            </div>

        </section>
    )
}