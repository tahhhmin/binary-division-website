import React from 'react'
import styles from './HeroSection.module.css'

export default function HeroSection() {
    return (
        <section className={styles.heroSectionContainer}>
            <video
                className={styles.videoBackground}
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/hero-bg.mp4" type="video/mp4" />
            </video>

            {/* overlay */}
            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <h1 className={styles.title}>AI/ML & Robotics</h1>
                <h1 className={styles.title}>for the Built World</h1>
                <p>3D Printed to perfection</p>
            </div>
        </section>
    )
}
