// app/news/page.tsx
import { 
            Breadcrumb, 
            BreadcrumbItem, 
            BreadcrumbLink, 
            BreadcrumbList, 
            BreadcrumbSeparator 
        } from "@/components/ui/breadcrumb";
import styles from "./page.module.css";
import NewsList from "@/components/news-page/NewsList";
import Link from "next/link";

export const metadata = {
    title: "News | The Latest Updates",
    description: "Stay updated with our latest news, announcements, and activities.",
};

export default function NewsPage() {
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
                                    <Link href="/news">News</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className={styles.containerHeader}>
                        <h2>News</h2>
                        <p>The Latest Updates</p>
                    </div>
                </header>

                <NewsList />
            </div>
        </main>
    );
}
