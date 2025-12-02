'use client';

import React from 'react';
import Header from '@/components/global/header/Header';
import { usePathname } from 'next/navigation';

export default function HeaderLayout() {
    const pathname = usePathname();
    const showHeader = pathname !== '/admin-panel' && pathname !== '/auth';

    return (
        <>
            {showHeader && <Header />}
        </>
    );
}