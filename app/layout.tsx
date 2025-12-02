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
    title: "Binary Division | AI & Robotics Solutions for Humanity",
    description: "Binary Division develops AI-driven robotics including drones, rovers, and inspection devices to advance humanity. Explore innovative solutions in medical delivery, disaster response, and more.",
    icons: {
        icon: "/bd-icon-logo-b2.svg",
        shortcut: "/bd-icon-logo-b2.svg",
        apple: "/bd-icon-logo-b2.svg",
    },
    openGraph: {
        title: "Binary Division | AI & Robotics Solutions",
        description: "Innovative AI-driven robotics for medical delivery, disaster response, and industrial applications.",
        url: "https://www.binarydivision.org", // update with real domain
        siteName: "Binary Division",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Binary Division | AI & Robotics",
        description: "Building AI-driven drones, rovers, and devices to advance humanity.",
        images: ["/og-image.png"],
        site: "@BinaryDivision", // Twitter handle if any
        creator: "@BinaryDivision",
    },
    robots: "index, follow",
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
                <main>{children}</main>
                <FooterLayout />
                </ThemeProvider>
            </body>
        </html>
    );
}
