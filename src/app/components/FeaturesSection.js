import styles from "./FeaturesSection.module.css";

const features = [
  {
    icon: "⚡",
    title: "Cepat & Tepat Waktu",
    description: "Pengerjaan 1-3 hari kerja. Urgent? Bisa same day service untuk kebutuhan mendadak.",
    color: "orange"
  },
  {
    icon: "💎",
    title: "Kualitas Premium",
    description: "Mesin cetak digital terbaru dengan resolusi tinggi. Warna tajam, detail presisi.",
    color: "blue"
  },
  {
    icon: "💰",
    title: "Harga Bersahabat",
    description: "Harga kompetitif tanpa mengorbankan kualitas. Diskon hingga 30% untuk bulk order.",
    color: "green"
  },
  {
    icon: "🎨",
    title: "Desain Gratis",
    description: "Tim desainer kami siap bantu wujudkan desain impianmu secara GRATIS untuk paket tertentu.",
    color: "orange"
  },
  {
    icon: "📦",
    title: "Bahan Lengkap",
    description: "Vinyl, chromo, hologram, transparan, ritrama — semua bahan stiker tersedia lengkap.",
    color: "blue"
  },
  {
    icon: "🤝",
    title: "Support UMKM",
    description: "Konsultasi gratis untuk branding dan packaging UMKM. Kami tumbuh bersama bisnis kamu.",
    color: "green"
  },
];

export default function FeaturesSection() {
  return (
    <section className={`section ${styles.features}`} id="keunggulan">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Keunggulan Kami</span>
          <h2>Kenapa Pilih <span style={{ color: 'var(--retro-blue)' }}>Stikreasi</span>?</h2>
          <p>Kami berkomitmen memberikan layanan cetak stiker terbaik</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.featureCard} ${styles[`card${feature.color}`]}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.featureIcon}>
                <span>{feature.icon}</span>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
