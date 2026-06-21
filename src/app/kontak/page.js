"use client";
import { useState } from "react";
import styles from "./page.module.css";

const contactInfo = [
  { icon: "💬", label: "WhatsApp", value: "0899-2453-9711", link: "https://wa.me/6289924539711", color: "green" },
  { icon: "📧", label: "Email", value: "hello@stikreasi.com", link: "mailto:hello@stikreasi.com", color: "blue" },
  { icon: "📸", label: "Instagram", value: "@stikreasi", link: "https://instagram.com/stikreasi", color: "orange" },
  { icon: "⏰", label: "Jam Operasional", value: "Senin - Sabtu, 08:00 - 17:00", link: null, color: "blue" },
];

export default function KontakPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Halo Stikreasi!%0A%0A*Nama:* ${form.name}%0A*Email:* ${form.email}%0A*Subject:* ${form.subject}%0A%0A${form.message}`;
    window.open(`https://wa.me/6289524539171?text=${msg}`, "_blank");
    setSent(true);
  };

  return (
    <div className={styles.kontakPage}>
      <section className={styles.pageHero}>
        <div className={styles.heroBg}></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>📞 Hubungi Kami</span>
          <h1>Ada <span>Pertanyaan</span>? Yuk Ngobrol!</h1>
          <p>Tim kami siap membantu kamu. Jangan ragu untuk menghubungi kami!</p>
        </div>
      </section>

      <section className={`section`}>
        <div className="container">
          <div className={styles.kontakGrid}>
            {/* Contact Info Cards */}
            <div className={styles.infoSide}>
              <h2 className={styles.infoTitle}>Cara Menghubungi Kami</h2>
              <p className={styles.infoDesc}>Pilih cara yang paling nyaman buat kamu</p>
              <div className={styles.infoCards}>
                {contactInfo.map((c, i) => (
                  <div key={i} className={styles.infoCard}>
                    <span className={styles.infoIcon}>{c.icon}</span>
                    <div>
                      <h4>{c.label}</h4>
                      {c.link ? (
                        <a href={c.link} target="_blank" rel="noopener noreferrer" className={styles.infoLink}>{c.value}</a>
                      ) : (
                        <p>{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/6289924539711?text=Halo%20Stikreasi!" target="_blank" rel="noopener noreferrer" className={`btn btn-whatsapp ${styles.bigWaBtn}`}>
                💬 Chat WhatsApp Sekarang
              </a>
            </div>

            {/* Contact Form */}
            <div className={styles.formSide}>
              {sent ? (
                <div className={styles.sentCard}>
                  <span>✅</span>
                  <h3>Pesan Terkirim!</h3>
                  <p>Terima kasih sudah menghubungi kami. Kami akan segera merespons!</p>
                  <button className="btn btn-primary" onClick={() => setSent(false)}>Kirim Pesan Lagi</button>
                </div>
              ) : (
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                  <h3>Kirim Pesan</h3>
                  <div className="form-group">
                    <label>Nama *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="form-input" placeholder="Nama kamu" required />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="form-input" placeholder="email@example.com" required />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} className="form-input" placeholder="Tentang apa?" required />
                  </div>
                  <div className="form-group">
                    <label>Pesan *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} className="form-input" placeholder="Tulis pesan kamu..." rows={5} required />
                  </div>
                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                    Kirim Pesan 📨
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQ */}
          <div className={styles.faqSection}>
            <div className="section-header">
              <span className="section-badge">FAQ</span>
              <h2>Pertanyaan yang Sering <span style={{ color: 'var(--retro-orange)' }}>Ditanyakan</span></h2>
            </div>
            <div className={styles.faqGrid}>
              {[
                { q: "Berapa lama pengerjaan stiker?", a: "Pengerjaan normal 1-3 hari kerja. Untuk kebutuhan urgent bisa same day (hubungi kami via WhatsApp)." },
                { q: "Apakah bisa pesan satuan?", a: "Bisa! Beberapa produk seperti Stiker A3+ Sheet bisa dipesan mulai dari 1 lembar." },
                { q: "Bagaimana cara kirim desain?", a: "Desain bisa dikirim via WhatsApp dalam format PNG, JPG, PDF, atau AI/CDR." },
                { q: "Apakah ada jasa desain?", a: "Ada! Kami menyediakan jasa desain GRATIS untuk paket UMKM Starter dan Pro." },
                { q: "Pengiriman ke seluruh Indonesia?", a: "Ya, kami melayani pengiriman ke seluruh Indonesia via JNE, J&T, SiCepat, dan lainnya." },
                { q: "Metode pembayaran apa saja?", a: "Transfer bank (BCA, BRI, Mandiri), e-wallet (GoPay, OVO, Dana), dan COD untuk area tertentu." },
              ].map((faq, i) => (
                <div key={i} className={styles.faqCard}>
                  <h4>{faq.q}</h4>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
