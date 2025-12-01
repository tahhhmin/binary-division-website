'use client';

import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { useTheme } from 'next-themes'

import LogoLight from '@/public/bd-typo-logo-b1.svg'
import LogoDark from '@/public/bd-typo-logo-b2.svg'

import Link from 'next/link'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

import { ThemeToggleButton } from "@/components/global/buttons/ThemeToggleButton"
import { NavigationMenuDemo } from '@/components/global/header/HeaderNavigation'
import HeaderScroll from './HeaderScroll'

export default function Header() {
    const [mounted, setMounted] = useState(false)
    const { theme, resolvedTheme } = useTheme()
    
    useEffect(() => {
        setMounted(true)
    }, [])

    // Use resolvedTheme to handle 'system' theme setting
    const currentTheme = theme === 'system' ? resolvedTheme : theme
    const Logo = currentTheme === 'dark' ? LogoDark : LogoLight

    // Default to light logo before mounting to avoid flash
    if (!mounted) {
        return (
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.logoContainer}>
                        <Link href='./'>
                            <Image 
                                src={LogoLight} 
                                alt='Binary Division Logo' 
                                className={styles.logo}
                            />
                        </Link>
                    </div>

                    <div className={styles.navigation}>
                        <NavigationMenuDemo />
                    </div>

                    <div className={styles.buttons}>
                        <ButtonGroup className="hidden sm:flex">
                            <Button variant="outline">Contact</Button>
                            <Button variant="outline">Log In</Button>
                            <ThemeToggleButton />
                        </ButtonGroup>
                    </div>
                </div>
                <HeaderScroll />
            </header>
        )
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <Link href='./'>
                        <Image 
                            src={Logo} 
                            alt='Binary Division Logo' 
                            className={styles.logo}
                        />
                    </Link>
                </div>

                <div className={styles.navigation}>
                    <NavigationMenuDemo />
                </div>

                <div className={styles.buttons}>
                    <ButtonGroup className="hidden sm:flex">
                        <Button variant="outline">Contact</Button>
                        <Button variant="outline">Log In</Button>
                        <ThemeToggleButton />
                    </ButtonGroup>
                </div>
            </div>
            <HeaderScroll />
        </header>
    )
}