"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './HeroSection.module.css'

export default function HeroSection() {
    const titleRef1 = useRef(null)
    const titleRef2 = useRef(null)
    const subtitleRef = useRef(null)

    useEffect(() => {
        // Create a timeline for coordinated animations
        const tl = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        })

        // Set initial states
        gsap.set([titleRef1.current, titleRef2.current, subtitleRef.current], {
            opacity: 0,
            y: 50
        })

        // Animate titles with stagger
        tl.to(titleRef1.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.5
        })
        .to(titleRef2.current, {
            opacity: 1,
            y: 0,
            duration: 1.2
        }, "-=0.8") // Overlap with previous animation
        .to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
        }, "-=0.6")

        // Cleanup
        return () => {
            tl.kill()
        }
    }, [])

    return (
        <section className={styles.heroSectionContainer}>
            <video
                className={styles.videoBackground}
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/hero-video.mp4" type="video/mp4" />
            </video>

            {/* overlay */}
            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <h1 ref={titleRef1} className={styles.title}>AI/ML & Robotics</h1>
                <h1 ref={titleRef2} className={styles.title}>for Tomorrow’s Humanity.</h1>
                <p ref={subtitleRef} className={styles.subtitle}>Precision. Autonomy. Impact.</p>
            </div>
        </section>
    )
}