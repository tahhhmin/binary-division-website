// app/news/page.tsx
import styles from "./page.module.css";
import NewsList from "@/components/news-page/NewsList";

export const metadata = {
    title: "News | The Latest Updates",
    description: "Stay updated with our latest news, announcements, and activities.",
};

export default function NewsPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>News</h1>
                    <p>The Latest Updates</p>
                </div>
                <NewsList />
            </div>
        </main>
    );
}
