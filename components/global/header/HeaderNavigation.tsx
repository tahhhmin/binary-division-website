"use client"

import * as React from "react"
import Link from "next/link"
import styles from './HeaderNavigation.module.css'

import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const services: { title: string; href: string; description: string }[] = [
    {
        title: "3D Printing",
        href: "/services/3d-printing",
        description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
];

const products: { title: string; href: string; description: string }[] = [
    {
        title: "Rover",
        href: "/products/rover",
        description: "A powerful tool for professional users to enhance productivity.",
    },
    {
        title: "Drone",
        href: "/products/drone",
        description: "Everything you need to get started quickly.",
    },
  // ... more product items
];

const industries: { title: string; href: string; description: string }[] = [
    {
        title: "Steel",
        href: "/industries/Steel",
        description: "A powerful tool for professional users to enhance productivity.",
    },
    {
        title: "Blackhole",
        href: "/industries/blackhole",
        description: "Everything you need to get started quickly.",
    },
  // ... more product items
];

export function NavigationMenuDemo() {
    const isMobile = useIsMobile()

    return (
        <div className={styles.navigationContainer}>
        <NavigationMenu viewport={isMobile}>
            <NavigationMenuList className="flex-wrap">

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Link href='/services'>Services</Link> 
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {services.map((item) => (
                            <ListItem key={item.title} title={item.title} href={item.href}>
                            {item.description}
                            </ListItem>
                        ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {products.map((item) => (
                            <ListItem key={item.title} title={item.title} href={item.href}>
                            {item.description}
                            </ListItem>
                        ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
 
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/projects">Projects</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Link href='/industries'>Industries</Link>   
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {industries.map((component) => (
                            <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                            >
                            {component.description}
                            </ListItem>
                        ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/news">News</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/docs">Career</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>Teams</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-4">
                        <li>
                            <NavigationMenuLink asChild>
                            <Link href="#">
                                <div className="font-medium">Components</div>
                                <div className="text-muted-foreground">
                                Browse all components in the library.
                                </div>
                            </Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                            <Link href="#">
                                <div className="font-medium">Documentation</div>
                                <div className="text-muted-foreground">
                                Learn how to use the library.
                                </div>
                            </Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                            <Link href="#">
                                <div className="font-medium">Blog</div>
                                <div className="text-muted-foreground">
                                Read our latest blog posts.
                                </div>
                            </Link>
                            </NavigationMenuLink>
                        </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
        
            </NavigationMenuList>
        </NavigationMenu>
        </div>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
