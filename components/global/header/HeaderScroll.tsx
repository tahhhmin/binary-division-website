"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './HeaderScroll.module.css'

interface HeaderScrollProps {
  speed?: number
  pauseOnHover?: boolean
  className?: string
}

export default function HeaderScroll({ 
  speed = 30, 
  pauseOnHover = true,
  className = ''
}: HeaderScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!scrollRef.current) return

    const scrollContainer = scrollRef.current
    const scrollContent = scrollContainer.querySelector(`.${styles.scrollContent}`) as HTMLElement
    
    if (!scrollContent) return

    // Get the width of the content
    const contentWidth = scrollContent.offsetWidth
    const containerWidth = scrollContainer.offsetWidth

    // Calculate how many clones we need
    const clonesNeeded = Math.ceil(containerWidth / contentWidth) + 1

    // Create clones
    const clones: HTMLElement[] = []
    for (let i = 0; i < clonesNeeded; i++) {
      const clone = scrollContent.cloneNode(true) as HTMLElement
      clone.classList.add(styles.clone)
      scrollContainer.appendChild(clone)
      clones.push(clone)
    }

    // Set initial positions
    gsap.set(scrollContent, { x: 0 })
    clones.forEach((clone, index) => {
      gsap.set(clone, { x: contentWidth * (index + 1) })
    })

    // Create timeline instead of tween
    const tl = gsap.timeline({ repeat: -1 })
    tlRef.current = tl

    const allElements = [scrollContent, ...clones]
    
    // Add animation to timeline
    tl.to(allElements, {
      x: `-=${contentWidth}`,
      duration: speed,
      ease: "none",
      onComplete: () => {
        // Reset positions
        allElements.forEach((el) => {
          const currentX = gsap.getProperty(el, "x") as number
          if (currentX <= -contentWidth) {
            gsap.set(el, { x: currentX + (contentWidth * allElements.length) })
          }
        })
      }
    })

    // Pause on hover
    if (pauseOnHover) {
      const handleMouseEnter = () => tl.pause()
      const handleMouseLeave = () => tl.resume()
      
      scrollContainer.addEventListener('mouseenter', handleMouseEnter)
      scrollContainer.addEventListener('mouseleave', handleMouseLeave)
      
      return () => {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
        tl.kill()
        clones.forEach(clone => clone.remove())
      }
    }

    return () => {
      tl.kill()
      clones.forEach(clone => clone.remove())
    }
  }, [speed, pauseOnHover])

  const items = [
    "Machines with Purpose",
    "Designed for the Demands of Tomorrow",
    "Precision Built Into Every Motion",
    "Machines for the Edges of the Earth",
    "3D Printed to Perfection"
  ]

  return (
    <div className={`${styles.container} ${className}`}>
      <div ref={scrollRef} className={styles.scrollWrapper}>
        <div className={styles.scrollContent}>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <span className={styles.item}>
                {item}
              </span>
              {index < items.length - 1 && (
                <span className={styles.separator}>✦</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}