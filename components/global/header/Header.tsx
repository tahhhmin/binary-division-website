import React from 'react'
import styles from './Header.module.css'

import Logo from '@/public/typographic-logo.svg'

import Link from 'next/link'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

import { ThemeToggleButton } from "@/components/global/buttons/ThemeToggleButton"
import { NavigationMenuDemo } from '@/components/global/header/HeaderNavigation'
import HeaderScroll from './HeaderScroll'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <Link href='./'>
                        <Image src={Logo} alt='' className={styles.logo}></Image>
                    </Link>
                </div>

                <div className={styles.navigation}>
                    <NavigationMenuDemo />
                </div>

                <div className={styles.buttons}>
                    <ButtonGroup className="hidden sm:flex">
                        <Button variant="outline">Contact </Button>
                        <Button variant="outline">Log In</Button>
                        <ThemeToggleButton />
                    </ButtonGroup>
                </div>
            </div>
            <HeaderScroll />
        </header>
    )
}
