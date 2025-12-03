
import TutorialSection from '@/components/services-page/3dprinting/TutorialSection';
import styles from './page.module.css'
import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import Link from 'next/link';
import UploadSection from '@/components/services-page/3dprinting/UploadSection';

export const metadata = {
    title: "3D Printing | #",
    description: "#",
};

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
                                    <Link href="/services">Services</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>  
                                <BreadcrumbLink asChild>
                                    <Link href="/services/3d-printing">3D Printing</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className={styles.titleContainer}>
                        <h2>3D Printing</h2>
                        <p>Get an instant & accurate quotation</p>
                    </div>
                </header>

                <div className={styles.contentContainer}>
                    <TutorialSection />
                    <UploadSection />
                </div>
            </div>
        </main>
    )
}