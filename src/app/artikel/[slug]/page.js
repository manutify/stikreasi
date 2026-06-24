"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getArticleBySlug } from "../../../data/articles";
import styles from "./page.module.css";

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (slug) {
      const foundArticle = getArticleBySlug(slug);
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        router.push("/artikel");
      }
    }
  }, [slug, router]);

  if (!article) {
    return (
      <div className="container" style={{ padding: "8rem 0", textAlign: "center" }}>
        <p>Memuat artikel...</p>
      </div>
    );
  }

  return (
    <div className={styles.articleDetail}>
      <div className="container">
        <Link href="/artikel" className={styles.backLink}>
          ← Kembali ke Blog
        </Link>

        <header className={styles.articleHeader}>
          <span className={styles.categoryBadge}>{article.category}</span>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.meta}>
            <span>🗓️ {new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>✍️ {article.author}</span>
            <span>⏱️ {article.readTime}</span>
          </div>
        </header>

        <div className={styles.articleBody}>
          <div className={styles.heroImagePlaceholder}>
            📝
          </div>
          
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </div>
  );
}
