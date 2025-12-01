import type { Metadata } from "next";
import { ThemeProvider } from "@/app/providers/theme-provider"


import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import "./styles/typography.css"

import HeaderLayout from "@/components/global/header/HeaderLayout";
import FooterLayout from "@/components/global/footer/FooterLayout";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const loraSerif = Lora({
    variable: "--font-lora_serif",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Binary Division",
    description: "desc",
    icons: {
        icon: "/bd-icon-logo-b2.svg",
        shortcut: "/bd-icon-logo-b2.svg",
        apple: "/bd-icon-logo-b2.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} ${loraSerif.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                <HeaderLayout />
                {children}
                <FooterLayout />
                </ThemeProvider>
            </body>
        </html>
    );
}
