import React from 'react'
import styles from './ServicesProductsSection.module.css'
import Link from 'next/link'

export default function ServicesProductsSection() {
    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Services & Products</h2>

            <div className={styles.container}>
                <div className={styles.services}>
                    <div className={styles.printing}>
                        <Link href='/services/3d-printing' className={styles.cardContent}>
                            <h3>3D Printing</h3>
                            <p>Custom additive manufacturing solutions for rapid prototyping and production-ready parts</p>
                            <ul className={styles.features}>
                                <li>SLA, FDM, and SLS technologies</li>
                                <li>Multiple material options</li>
                                <li>0.1mm layer resolution</li>
                                <li>24-hour turnaround available</li>
                            </ul>
                        </Link>
                    </div>
                    <div className={styles.otherServices}>
                        <Link href='/' className={styles.engine}>
                            <h3>Fusion Engine</h3>
                            <p>Advanced propulsion system for autonomous vehicles</p>
                        </Link>

                        <Link href='/' className={styles.engine}>
                            <h3>Omicron Engine</h3>
                            <p>High-efficiency power generation for remote operations</p>
                        </Link>
                    </div>
                </div>

                <div className={styles.products}>
                    <div className={styles.productContainer}>
                        <h3>Store</h3>
                        <p>Shop our catalog</p>
                    </div>
                    <div className={styles.productContainer}>
                        <h3>Rover</h3>
                        <p>All-terrain exploration</p>
                    </div>
                    <div className={styles.productContainer}>
                        <h3>Autonomous Drone</h3>
                        <p>Aerial surveillance</p>
                    </div>
                    <div className={styles.productContainer}>
                        <h3>Robotic Arm</h3>
                        <p>Precision manipulation</p>
                    </div>
                    <div className={styles.productContainer}>
                        <h3>Submarine</h3>
                        <p>Deep-sea operations</p>
                    </div>
                    <div className={styles.productContainer}>
                        <h3>Inspection Bot</h3>
                        <p>Hazard assessment</p>
                    </div>
                </div>
            </div>
        </section>
    )
}