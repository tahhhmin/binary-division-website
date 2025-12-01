'use client';

import React from 'react';
import Footer from '@/components/global/footer/Footer';
import { usePathname } from 'next/navigation';

export default function FooterLayout() {
    const pathname = usePathname();
    const showFooter = pathname !== '/link' && pathname !== '/link';

    return (
        <>
            {showFooter && <Footer />}
        </>
    );
}