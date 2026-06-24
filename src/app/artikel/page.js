import Link from "next/link";
import { articles } from "../../data/articles";
import styles from "./page.module.css";

export const metadata = {
  title: "Artikel & Edukasi | Stikreasi",
  description: "Kumpulan artikel, panduan, dan tips seputar dunia percetakan stiker untuk kebutuhan personal dan bisnismu.",
};

export default function ArtikelPage() {
  return (
    <div className={styles.artikelPage}>
      <section className={styles.pageHero}>
        <div className={styles.heroBg}></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>📚 Blog Stikreasi</span>
          <h1>Edukasi & <span>Inspirasi</span> Stiker</h1>
          <p>Temukan panduan lengkap, tips desain, dan informasi menarik seputar dunia cetak stiker untuk memaksimalkan bisnismu.</p>
        </div>
      </section>

      <section className={`container`}>
        <div className={styles.articleGrid}>
          {articles.map((article) => (
            <article key={article.id} className={styles.articleCard}>
              <Link href={`/artikel/${article.slug}`}>
                <div className={styles.articleImageWrapper}>
                  {/* Jika ada gambar asli, gunakan <img>, untuk sementara pakai emoji/placeholder */}
                  <span className={styles.categoryBadge}>{article.category}</span>
                  <span className={styles.placeholderIcon}>📝</span>
                </div>
              </Link>
              <div className={styles.articleContent}>
                <div className={styles.articleMeta}>
                  <span>🗓️ {new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>⏱️ {article.readTime}</span>
                </div>
                <Link href={`/artikel/${article.slug}`} style={{ textDecoration: 'none' }}>
                  <h2 className={styles.articleTitle}>{article.title}</h2>
                </Link>
                <p className={styles.articleExcerpt}>{article.excerpt}</p>
                <Link href={`/artikel/${article.slug}`} className={styles.readMoreBtn}>
                  Baca Selengkapnya <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
