import ProductsList from '@/components/products-page/ProductsList';
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
    title: "Products | #",
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
                                <Link href="/products">Products</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        
                    </BreadcrumbList>
                </Breadcrumb>

                <div className={styles.titleContainer}>
                    <h2>Products</h2>
                    <p>#</p>
                </div>
            </header>

            <div className={styles.contentContainer}>
                <ProductsList />
            </div>

        </main>
    )
}