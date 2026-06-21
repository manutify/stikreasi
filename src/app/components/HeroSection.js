import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroBg}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgCircle3}></div>
        <div className={styles.gridLines}></div>
      </div>

      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroText}>
          <div className={styles.heroBadge}>
            <span>🎉</span> Cetak Stiker #1 di Indonesia
          </div>
          <h1 className={styles.heroTitle}>
            Wujudkan <span className={styles.titleOrange}>Kreasi</span> Stikermu
            <br />
            Bersama <span className={styles.titleBlue}>Stikreasi</span>
          </h1>
          <p className={styles.heroDesc}>
            Solusi cetak stiker terbaik untuk personal branding, mahasiswa, dan UMKM. 
            Dari stiker vinyl premium hingga label kemasan — kualitas terjamin, 
            harga bersahabat, dan pengerjaan super cepat! 🚀
          </p>
          <div className={styles.heroCtas}>
            <Link href="/produk" className="btn btn-primary">
              🛒 Lihat Produk
            </Link>
            <Link href="/custom-order" className="btn btn-outline">
              ✏️ Custom Order
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>5000+</span>
              <span className={styles.statLabel}>Order Selesai</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>⭐ 4.9</span>
              <span className={styles.statLabel}>Rating</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>1-3</span>
              <span className={styles.statLabel}>Hari Pengerjaan</span>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.stickerShowcase}>
            <div className={`${styles.floatingSticker} ${styles.sticker1}`}>
              <div className={styles.stickerContent}>
                <span>💎</span>
                <p>Vinyl</p>
              </div>
            </div>
            <div className={`${styles.floatingSticker} ${styles.sticker2}`}>
              <div className={styles.stickerContent}>
                <span>🌈</span>
                <p>Hologram</p>
              </div>
            </div>
            <div className={`${styles.floatingSticker} ${styles.sticker3}`}>
              <div className={styles.stickerContent}>
                <span>✂️</span>
                <p>Die-Cut</p>
              </div>
            </div>
            <div className={`${styles.floatingSticker} ${styles.sticker4}`}>
              <div className={styles.stickerContent}>
                <span>🏪</span>
                <p>UMKM</p>
              </div>
            </div>
            <div className={`${styles.floatingSticker} ${styles.sticker5}`}>
              <div className={styles.stickerContent}>
                <span>🔮</span>
                <p>Transparan</p>
              </div>
            </div>
            <div className={styles.centerCircle}>
              <span className={styles.centerEmoji}>🎨</span>
              <p>Stikreasi</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>Scroll ke bawah</span>
        <div className={styles.scrollArrow}>↓</div>
      </div>
    </section>
  );
}
