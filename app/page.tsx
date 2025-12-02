// app/page.tsx
import React from "react";
import styles from "./styles/page.module.css";

import HeroSection from "@/components/home-page/HeroSection";
import ProjectSection from "@/components/home-page/ProjectSection";
import IndustriesSection from "@/components/home-page/IndustriesSection";
import PartnersSection from "@/components/home-page/PartnersSection";
import CareerSection from "@/components/home-page/CareerSection";
import ServicesProductsSection from "@/components/home-page/ServicesProductsSection";
import TeamsSection from "@/components/home-page/TeamsSection";
import QuoteSection from "@/components/home-page/QuoteSection";
import NewsSection from "@/components/home-page/NewsSection";

// ⭐ SEO Metadata (Fully Crawlable)
export const metadata = {
    title: "Robotics & Engineering Solutions | Your Brand",
    description:
        "Explore advanced robotics, engineering solutions, automation systems, industry projects, and the latest innovations from Your Brand.",
    keywords: [
        "robotics",
        "automation",
        "engineering",
        "machines",
        "industrial robotics",
        "AI robotics",
        "robotic systems",
        "engineering services",
        "automation solutions",
        "mechanical engineering",
    ],
    openGraph: {
        title: "Your Brand — Robotics & Engineering Solutions",
        description:
            "Discover cutting-edge robotics, industrial automation, and engineering innovations powering industries worldwide.",
        url: "https://yourwebsite.com",
        type: "website",
        siteName: "Your Brand",
        images: [
            {
                url: "https://yourwebsite.com/og-image.jpg", // optional: replace with your image
                width: 1200,
                height: 630,
                alt: "Your Brand Robotics and Engineering",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Your Brand — Robotics & Engineering",
        description:
            "Advanced robotics & automation solutions for industries worldwide.",
        images: ["https://yourwebsite.com/og-image.jpg"], // optional
    },
};

export default function Page() {
    return (
        <main className={styles.main}>
            <HeroSection />

            <ServicesProductsSection />

            <QuoteSection
                quote="Our machines go where people shouldn't have to, protecting those who move the world."
                showAuthor={false}
                author=""
            />

            <ProjectSection />

            <IndustriesSection />

            <NewsSection />

            <PartnersSection />

            <CareerSection />

            <QuoteSection
                quote="Somewhere, something incredible is waiting to be known."
                showAuthor={true}
                author="Carl Sagan"
            />

            <TeamsSection />
        </main>
    );
}
