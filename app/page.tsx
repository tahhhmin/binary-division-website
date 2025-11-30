import React from 'react'
import styles from './styles/page.module.css'
import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from "lucide-react"

export default function page() {
    return (
        <main className={styles.main}>
            <Button variant="outline">Button</Button>
            <Button variant="outline" size="icon" aria-label="Submit">
                <ArrowUpIcon />
            </Button>
        </main>
    )
}
