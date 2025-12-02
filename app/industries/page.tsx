import styles from './page.module.css'
import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import IndustriesSection from '@/components/industries-page/IndustriesList'

export default function page() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />
                                                
                            <BreadcrumbItem>  
                                <BreadcrumbLink asChild>
                                    <Link href="/industries">Industries</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className={styles.headerTitle}>
                        <h2>Industries</h2>
                        <p>Your Trusted Partner</p>
                    </div>
                </header>

                <div className={styles.gird}>
                    <IndustriesSection />
                </div>
            </div>
        </main>
    )
}