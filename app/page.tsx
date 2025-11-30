import React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from "lucide-react"

export default function page() {
    return (
        <div>
            <Button variant="outline">Button</Button>
            <Button variant="outline" size="icon" aria-label="Submit">
                <ArrowUpIcon />
            </Button>
        </div>
    )
}
