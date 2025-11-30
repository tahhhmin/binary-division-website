import type { Metadata } from "next";
import { ThemeProvider } from "@/app/providers/theme-provider"


import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import "./styles/typography.css"

import HeaderLayout from "@/components/global/header/HeaderLayout";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Binary Division",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                <HeaderLayout />
                {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
