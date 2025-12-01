'use client';

import React, { useRef } from 'react'
import styles from './QuoteSection.module.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface QuoteSectionProps {
  quote: string;
  showAuthor?: boolean;
  author?: string;
}

export default function QuoteSection({ quote, showAuthor = false, author = '' }: QuoteSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLHeadingElement>(null)
  const authorRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // Create timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%', // Animation starts when top of section hits 80% of viewport height
        end: 'bottom 20%',
        toggleActions: 'play none none reverse', // play on enter, reverse on leave
        // markers: true, // Uncomment for debugging
      }
    })

    // Animate quote - fade in from below with split text effect
    if (quoteRef.current) {
      // Split text into words for staggered animation
      const words = quoteRef.current.innerText.split(' ')
      quoteRef.current.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ')
      
      tl.fromTo(
        quoteRef.current.querySelectorAll('.word'),
        {
          opacity: 0,
          y: 30,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power2.out'
        }
      )
    }

    // Animate author if visible
    if (showAuthor && authorRef.current) {
      tl.fromTo(
        authorRef.current,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out'
        },
        '-=0.3' // Start slightly before quote animation ends
      )
    }
  }, [quote, showAuthor]) // Re-run if props change

  return (
    <section ref={sectionRef} className={styles.section}>
        <div className={styles.container}>
            <h1 ref={quoteRef} className={styles.quote}>
                {quote}
            </h1>
            {showAuthor && (
              <p ref={authorRef} className={styles.author}>
                - {author}
              </p>
            )}
        </div>
    </section>
  )
}