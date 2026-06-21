import styles from "./page.module.css";

export const metadata = { title: "Tentang Kami" };

const stats = [
  { number: "5000+", label: "Order Selesai", emoji: "📦" },
  { number: "1000+", label: "Pelanggan Puas", emoji: "😊" },
  { number: "4.9/5", label: "Rating", emoji: "⭐" },
  { number: "1-3", label: "Hari Pengerjaan", emoji: "⚡" },
];

const timeline = [
  { year: "2021", title: "Awal Mula", desc: "Stikreasi lahir dari garasi kecil dengan modal semangat dan 1 mesin cetak." },
  { year: "2022", title: "Mulai Berkembang", desc: "Menambah mesin cutting dan mulai melayani UMKM se-Indonesia secara online." },
  { year: "2023", title: "1000 Pelanggan", desc: "Milestone 1000 pelanggan tercapai. Upgrade mesin ke kualitas industri." },
  { year: "2024", title: "Ekspansi Layanan", desc: "Menambah layanan stiker hologram, transparan, dan desain gratis untuk UMKM." },
  { year: "2025", title: "Terus Bertumbuh", desc: "5000+ order selesai. Berkomitmen jadi solusi cetak stiker #1 di Indonesia." },
];

const team = [
  { name: "Founder & CEO", role: "Visioner di balik Stikreasi", emoji: "👨‍💼" },
  { name: "Head of Production", role: "Menjamin kualitas setiap cetakan", emoji: "🏭" },
  { name: "Creative Designer", role: "Wujudkan desain impian pelanggan", emoji: "🎨" },
  { name: "Customer Success", role: "Siap bantu 24/7 via WhatsApp", emoji: "💬" },
];

export default function TentangPage() {
  return (
    <div className={styles.tentangPage}>
      <section className={styles.pageHero}>
        <div className={styles.heroBg}></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>📖 Tentang Kami</span>
          <h1>Cerita di Balik <span>Stikreasi</span></h1>
          <p>Dari passion menjadi solusi cetak stiker terpercaya di Indonesia</p>
        </div>
      </section>

      {/* Story */}
      <section className={`section`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyText}>
              <h2>Kami Percaya Setiap <span style={{color:'var(--retro-orange)'}}>Stiker</span> Punya Cerita</h2>
              <p>Stikreasi didirikan dengan satu misi sederhana: membantu setiap orang dan bisnis di Indonesia mendapatkan stiker berkualitas premium dengan harga yang terjangkau.</p>
              <p>Mulai dari mahasiswa yang ingin menghias laptop, pelaku UMKM yang butuh label kemasan profesional, hingga kreator yang ingin menjual merchandise — kami hadir untuk semua.</p>
              <p>Dengan mesin cetak digital terbaru dan tim yang berdedikasi, kami menjamin setiap stiker yang keluar dari workshop kami memiliki kualitas terbaik.</p>
            </div>
            <div className={styles.storyVisual}>
              <div className={styles.visualCard}>
                <span>🎯</span>
                <h4>Misi Kami</h4>
                <p>Menjadi partner cetak stiker #1 yang terpercaya dan terjangkau untuk seluruh Indonesia.</p>
              </div>
              <div className={styles.visualCard}>
                <span>👁️</span>
                <h4>Visi Kami</h4>
                <p>Memberdayakan kreativitas dan bisnis melalui produk stiker berkualitas tinggi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <div key={i} className={styles.statCard}>
                <span className={styles.statEmoji}>{s.emoji}</span>
                <span className={styles.statNumber}>{s.number}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Perjalanan Kami</span>
            <h2>Timeline <span style={{color:'var(--retro-blue)'}}>Stikreasi</span></h2>
          </div>
          <div className={styles.timeline}>
            {timeline.map((t, i) => (
              <div key={i} className={`${styles.timelineItem} ${i % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineCard}>
                  <span className={styles.timelineYear}>{t.year}</span>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`section ${styles.teamSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Tim Kami</span>
            <h2>Orang-Orang di Balik <span style={{color:'var(--retro-green)'}}>Stikreasi</span></h2>
          </div>
          <div className={styles.teamGrid}>
            {team.map((t, i) => (
              <div key={i} className={styles.teamCard}>
                <div className={styles.teamEmoji}>{t.emoji}</div>
                <h4>{t.name}</h4>
                <p>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
