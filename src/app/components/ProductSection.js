import Link from "next/link";
import { products, formatPrice } from "../data/products";
import styles from "./ProductSection.module.css";

export default function ProductSection() {
  const featured = products.filter((p) => p.popular).slice(0, 6);

  return (
    <section className={`section ${styles.products}`} id="produk">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Produk Kami</span>
          <h2>Stiker Untuk Semua <span style={{ color: 'var(--retro-orange)' }}>Kebutuhan</span></h2>
          <p>Dari personal branding hingga packaging UMKM, kami punya solusinya</p>
        </div>

        <div className={styles.productGrid}>
          {featured.map((product, index) => (
            <div
              key={product.id}
              className={styles.productCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.cardImageWrapper}>
                <img
                  src={product.image || "/images/stiker-vinyl.png"}
                  alt={product.name}
                  className={styles.cardImg}
                />
                <span className={styles.cardEmojiBadge}>{product.emoji}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeaderRow}>
                  <h3 className={styles.cardTitle}>
                    <Link href={`/produk/${product.slug}`}>{product.name}</Link>
                  </h3>
                  {product.popular && (
                    <span className={`badge badge-orange`} style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>Populer</span>
                  )}
                </div>
                <p className={styles.cardDesc}>{product.shortDesc}</p>
                <div className={styles.cardFeatures}>
                  {product.features.slice(0, 3).map((f, i) => (
                    <span key={i} className={styles.featureTag}>
                      {f}
                    </span>
                  ))}
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.cardPrice}>
                    <span className={styles.priceAmount}>{formatPrice(product.price)}</span>
                    <span className={styles.priceUnit}>/{product.unit}</span>
                  </div>
                  <div className={styles.cardActionRow}>
                    <Link
                      href={`/produk/${product.slug}`}
                      className={styles.cardDetailBtn}
                    >
                      Detail 🔍
                    </Link>
                    <Link
                      href={`/custom-order?product=${product.slug}`}
                      className={styles.cardBtn}
                    >
                      Pesan 🛒
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link href="/produk" className="btn btn-secondary">
            Lihat Semua Produk 📦
          </Link>
        </div>
      </div>
    </section>
  );
}

