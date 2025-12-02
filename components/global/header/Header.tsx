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



import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react';




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

                <div className={styles.fullScreenButtons}>
                    <ButtonGroup>
                        <Button variant="outline">Contact</Button>
                        <Button variant="outline">Log In</Button>
                        <ThemeToggleButton />
                    </ButtonGroup>
                </div>

                <div className={styles.halfScreenButtons}>
                    <ButtonGroup>
                        <Button variant="outline">Contact</Button>
                        <Button variant="outline">Log In</Button>
                    </ButtonGroup>

                    <ButtonGroup>
                        <ThemeToggleButton />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" sideOffset={5} className={styles.dropdownContent}>
                                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link href="/">Home</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/services">Services</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/products">Products</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/industries">Industries</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/news">News</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/career">Career</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/teams">Teams</Link>
                                </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Profile
                                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Log out
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                </DropdownMenuGroup> 

                            </DropdownMenuContent>
                        </DropdownMenu>         
                    </ButtonGroup>
                </div>
            </div>
            <HeaderScroll />
        </header>
    )
}