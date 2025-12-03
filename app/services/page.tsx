import ServicesList from '@/components/services-page/ServicesList';
import styles from './page.module.css'
import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import Link from 'next/link';

export const metadata = {
    title: "Services | #",
    description: "#",
};

export default function page() {
    return (
        <main className={styles.main}>
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
                                <Link href="/services">Services</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        
                    </BreadcrumbList>
                </Breadcrumb>

                <div className={styles.titleContainer}>
                    <h2>Services</h2>
                    <p>#</p>
                </div>
            </header>

            <div className={styles.contentContainer}>
                <ServicesList />
            </div>

        </main>
    )
}