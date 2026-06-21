import Link from "next/link";
import { pricingTiers, bulkPricing } from "../data/pricing";
import styles from "./page.module.css";

export const metadata = { title: "Harga" };

export default function HargaPage() {
  return (
    <div className={styles.hargaPage}>
      <section className={styles.pageHero}>
        <div className={styles.heroBg}></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>💰 Harga & Paket</span>
          <h1>Harga <span>Transparan</span> & Terjangkau</h1>
          <p>Pilih paket yang sesuai kebutuhan kamu, dari personal hingga bisnis</p>
        </div>
      </section>

      <section className={`section`}>
        <div className="container">
          <div className={styles.pricingGrid}>
            {pricingTiers.map((tier) => (
              <div key={tier.id} className={`${styles.pricingCard} ${tier.popular ? styles.popular : ""} ${styles[`card${tier.color}`]}`}>
                {tier.popular && <div className={styles.popularRibbon}>⭐ Paling Populer</div>}
                <div className={styles.cardHeader}>
                  <span className={styles.tierEmoji}>{tier.emoji}</span>
                  <h3 className={styles.tierName}>{tier.name}</h3>
                  <p className={styles.tierTagline}>{tier.tagline}</p>
                </div>
                <div className={styles.priceBox}>
                  <span className={styles.priceLabel}>{tier.priceLabel}</span>
                </div>
                <ul className={styles.featureList}>
                  {tier.features.map((f, i) => (
                    <li key={i}><span className={styles.checkIcon}>✓</span> {f}</li>
                  ))}
                </ul>
                <Link href="/custom-order" className={`btn ${tier.popular ? "btn-primary" : "btn-outline"} ${styles.tierCta}`}>
                  {tier.cta} →
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.bulkSection}>
            <h2 className={styles.bulkTitle}>📊 Diskon Quantity</h2>
            <p className={styles.bulkDesc}>Semakin banyak order, semakin hemat!</p>
            <div className={styles.bulkGrid}>
              {bulkPricing.map((b, i) => (
                <div key={i} className={styles.bulkCard}>
                  <span className={styles.bulkQty}>{b.qty}</span>
                  <span className={styles.bulkLabel}>lembar</span>
                  <span className={styles.bulkDiscount}>{b.discount}</span>
                  <span className={styles.bulkTag}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
