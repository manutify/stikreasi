import Link from "next/link";
import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaBg}>
        <div className={styles.bgPattern}></div>
      </div>
      <div className={`container ${styles.ctaContent}`}>
        <div className={styles.ctaEmoji}>🚀</div>
        <h2 className={styles.ctaTitle}>
          Siap Wujudkan Stiker <span>Impianmu</span>?
        </h2>
        <p className={styles.ctaDesc}>
          Konsultasi GRATIS dan dapatkan penawaran terbaik untuk kebutuhan stiker kamu.
          Hubungi kami sekarang via WhatsApp!
        </p>
        <div className={styles.ctaButtons}>
          <Link
            href="https://wa.me/6289924539711?text=Halo%20Stikreasi%2C%20saya%20tertarik%20untuk%20memesan%20stiker"
            target="_blank"
            className="btn btn-whatsapp"
          >
            💬 Chat WhatsApp
          </Link>
          <Link href="/custom-order" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
            ✏️ Isi Form Order
          </Link>
        </div>
      </div>
    </section>
  );
}
