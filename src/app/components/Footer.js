import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWave}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V120H0V40Z" fill="var(--retro-blue-dark)" />
        </svg>
      </div>
      <div className={styles.footerMain}>
        <div className={`container ${styles.footerGrid}`}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <span className={styles.logoIcon}>🎨</span>
              <span className={styles.logoText}>
                Stik<span className={styles.logoAccent}>reasi</span>
              </span>
            </div>
            <p className={styles.footerDesc}>
              Solusi cetak stiker terbaik untuk personal, mahasiswa, dan UMKM Indonesia. 
              Kualitas premium, harga bersahabat, pengerjaan cepat.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com/stikreasi" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                📸
              </a>
              <a href="https://wa.me/6289924539711" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
                💬
              </a>
              <a href="https://tiktok.com/@stikreasi" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="TikTok">
                🎵
              </a>
              <a href="mailto:hello@stikreasi.com" className={styles.socialLink} aria-label="Email">
                📧
              </a>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Produk</h4>
            <ul className={styles.columnLinks}>
              <li><Link href="/produk">Stiker Vinyl</Link></li>
              <li><Link href="/produk">Stiker Chromo</Link></li>
              <li><Link href="/produk">Stiker Transparan</Link></li>
              <li><Link href="/produk">Stiker Hologram</Link></li>
              <li><Link href="/produk">Stiker Die-Cut</Link></li>
              <li><Link href="/produk">Label UMKM</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Navigasi</h4>
            <ul className={styles.columnLinks}>
              <li><Link href="/">Beranda</Link></li>
              <li><Link href="/produk">Katalog Produk</Link></li>
              <li><Link href="/custom-order">Custom Order</Link></li>
              <li><Link href="/harga">Harga</Link></li>
              <li><Link href="/tentang">Tentang Kami</Link></li>
              <li><Link href="/kontak">Kontak</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Kontak</h4>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactIcon}>📍</span>
                <span>Indonesia</span>
              </li>
              <li>
                <span className={styles.contactIcon}>📱</span>
                <a href="https://wa.me/6289924539711">0899-2453-9711</a>
              </li>
              <li>
                <span className={styles.contactIcon}>📧</span>
                <a href="mailto:hello@stikreasi.com">hello@stikreasi.com</a>
              </li>
              <li>
                <span className={styles.contactIcon}>⏰</span>
                <span>Senin - Sabtu, 08:00 - 17:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.footerBottomInner}`}>
          <p>© {currentYear} Stikreasi. All rights reserved.</p>
          <p className={styles.footerTagline}>Dibuat dengan ❤️ di Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
