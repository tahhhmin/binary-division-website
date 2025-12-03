import React from 'react'
import styles from './ServicesList.module.css'
import Link from 'next/link'

export default function ServicesList() {
    return (
        <div className={styles.container}>
            <div className={styles.services}>
                <Link href='/services/3d-printing' className={styles.servicesCard}>
                    <div>
                    <h3>3D Printing</h3>
                    <p>Custom additive manufacturing solutions for rapid prototyping and production-ready parts</p>
                    </div>
                    <ul className={styles.features}>
                        <li>SLA, FDM, and SLS technologies</li>
                        <li>Multiple material options</li>
                        <li>0.1mm layer resolution</li>
                        <li>24-hour turnaround available</li>
                    </ul>
                </Link>
            </div>
            <div className={styles.otherServices}>
                <Link href='/' className={styles.servicesCard}>
                    <h3>Fusion Engine</h3>
                    <p>Advanced propulsion system for autonomous vehicles</p>
                </Link>

                <Link href='/' className={styles.servicesCard}>
                    <h3>Omicron Engine</h3>
                    <p>High-efficiency power generation for remote operations</p>
                </Link>
            </div>
        </div>
    )
}