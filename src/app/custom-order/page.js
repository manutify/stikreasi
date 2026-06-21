"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, formatPrice } from "../data/products";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabase";

const materials = [
  "Vinyl Premium",
  "Chromo / HVS",
  "Art Paper",
  "Transparan",
  "Hologram",
  "Ritrama / Cutting",
];

const sizes = [
  "3 x 3 cm",
  "5 x 5 cm",
  "7 x 7 cm",
  "10 x 10 cm",
  "A5 (14.8 x 21 cm)",
  "A4 (21 x 29.7 cm)",
  "A3+ (32 x 48.3 cm)",
  "Custom (tentukan sendiri)",
];

const finishes = ["Glossy", "Matte / Doff", "Laminasi", "Tanpa Finishing"];

function CustomOrderForm() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    productType: "",
    material: "",
    size: "",
    customWidth: "",
    customHeight: "",
    finish: "",
    shape: "Persegi / Kotak",
    quantity: 50,
    notes: "",
    hasDesign: "belum",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productSlug) {
      const product = products.find((p) => p.slug === productSlug);
      if (product) {
        setFormData((prev) => ({ ...prev, productType: product.name }));
      }
    }
  }, [productSlug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const estimatePrice = () => {
    let basePrice = 5000;
    const selectedProduct = products.find((p) => p.name === formData.productType);
    if (selectedProduct) basePrice = selectedProduct.price;

    let total = basePrice * formData.quantity;

    if (formData.quantity >= 500) total *= 0.7;
    else if (formData.quantity >= 100) total *= 0.8;
    else if (formData.quantity >= 50) total *= 0.9;

    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Simpan ke database Supabase
      const { error } = await supabase.from('custom_orders').insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          product_type: formData.productType,
          material: formData.material,
          size: formData.size,
          finish: formData.finish,
          shape: formData.shape,
          quantity: formData.quantity,
          notes: formData.notes,
          has_design: formData.hasDesign === "sudah",
          estimated_price: estimatePrice()
        }
      ]);

      if (error) {
        console.error("Gagal menyimpan pesanan ke Supabase:", error);
        // Tetap lanjut ke WA meskipun gagal simpan (supaya UX user tidak terganggu)
      }

      // 2. Buat pesan WhatsApp
      const message = `Halo Stikreasi! Saya ingin order stiker custom:%0A%0A` +
        `*Nama:* ${formData.name}%0A` +
        `*Produk:* ${formData.productType}%0A` +
        `*Bahan:* ${formData.material}%0A` +
        `*Ukuran:* ${formData.size}%0A` +
        `*Finishing:* ${formData.finish}%0A` +
        `*Bentuk:* ${formData.shape}%0A` +
        `*Jumlah:* ${formData.quantity} lembar%0A` +
        `*Punya Desain:* ${formData.hasDesign}%0A` +
        `*Catatan:* ${formData.notes || '-'}%0A%0A` +
        `*Estimasi:* ${formatPrice(estimatePrice())}`;

      window.open(`https://wa.me/6289924539711?text=${message}`, "_blank");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={`container ${styles.successContainer}`}>
        <div className={styles.successCard}>
          <span className={styles.successEmoji}>🎉</span>
          <h2>Order Terkirim!</h2>
          <p>Pesan kamu sudah dikirim via WhatsApp. Tim kami akan segera merespons dalam 1x24 jam.</p>
          <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
            Buat Order Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.orderLayout}>
        <form className={styles.orderForm} onSubmit={handleSubmit}>
          <div className={styles.formSection}>
            <h3 className={styles.formSectionTitle}>👤 Data Diri</h3>
            <div className={styles.formRow}>
              <div className="form-group">
                <label>Nama Lengkap *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Masukkan nama kamu"
                  required
                />
              </div>
              <div className="form-group">
                <label>No. WhatsApp *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email (opsional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.formSectionTitle}>📦 Detail Stiker</h3>
            <div className="form-group">
              <label>Jenis Stiker *</label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Pilih jenis stiker...</option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.emoji} {p.name} — {formatPrice(p.price)}/{p.unit}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formRow}>
              <div className="form-group">
                <label>Bahan *</label>
                <select
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Pilih bahan...</option>
                  {materials.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Ukuran *</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Pilih ukuran...</option>
                  {sizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className="form-group">
                <label>Finishing *</label>
                <select
                  name="finish"
                  value={formData.finish}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Pilih finishing...</option>
                  {finishes.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Bentuk Potongan</label>
                <select
                  name="shape"
                  value={formData.shape}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="Persegi / Kotak">Persegi / Kotak</option>
                  <option value="Bulat / Oval">Bulat / Oval</option>
                  <option value="Die-Cut (ikut bentuk desain)">Die-Cut (ikut bentuk desain)</option>
                  <option value="Custom shape">Custom shape</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Jumlah (lembar) *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="form-input"
                min="1"
                required
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.formSectionTitle}>🎨 Desain</h3>
            <div className="form-group">
              <label>Sudah punya desain?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="hasDesign"
                    value="sudah"
                    checked={formData.hasDesign === "sudah"}
                    onChange={handleChange}
                  />
                  <span>Sudah punya desain</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="hasDesign"
                    value="belum"
                    checked={formData.hasDesign === "belum"}
                    onChange={handleChange}
                  />
                  <span>Minta dibuatkan desain</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Catatan Tambahan</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-input"
                placeholder="Deskripsikan kebutuhan stiker kamu, referensi warna, dan detail lainnya..."
                rows={4}
              />
            </div>
          </div>

          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
            💬 Kirim Order via WhatsApp
          </button>
        </form>

        {/* Price Estimator Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.priceCard}>
            <h3 className={styles.priceCardTitle}>💰 Estimasi Harga</h3>
            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span>Jenis</span>
                <span>{formData.productType || "-"}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Bahan</span>
                <span>{formData.material || "-"}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Ukuran</span>
                <span>{formData.size || "-"}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Jumlah</span>
                <span>{formData.quantity} lembar</span>
              </div>
              {formData.quantity >= 50 && (
                <div className={`${styles.priceRow} ${styles.discount}`}>
                  <span>Diskon Qty</span>
                  <span>
                    {formData.quantity >= 500
                      ? "-30%"
                      : formData.quantity >= 100
                      ? "-20%"
                      : "-10%"}
                  </span>
                </div>
              )}
            </div>
            <div className={styles.totalRow}>
              <span>Estimasi Total</span>
              <span className={styles.totalPrice}>{formatPrice(estimatePrice())}</span>
            </div>
            <p className={styles.priceNote}>
              * Harga estimasi, harga final akan dikonfirmasi via WhatsApp
            </p>
          </div>

          <div className={styles.infoCard}>
            <h4>📋 Cara Order</h4>
            <ol className={styles.orderSteps}>
              <li>Isi form order di samping</li>
              <li>Klik kirim, otomatis ke WhatsApp</li>
              <li>Konfirmasi detail & desain</li>
              <li>Pembayaran (Transfer / COD)</li>
              <li>Stiker diproses & dikirim 🚀</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomOrderPage() {
  return (
    <div className={styles.customPage}>
      <section className={styles.pageHero}>
        <div className={styles.heroBg}></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>✏️ Custom Order</span>
          <h1>Buat Stiker <span>Sesuai Keinginanmu</span></h1>
          <p>Isi form di bawah dan dapatkan estimasi harga instan!</p>
        </div>
      </section>

      <section className={`section ${styles.orderSection}`}>
        <Suspense fallback={<div className="container" style={{textAlign: 'center', padding: '2rem'}}>Loading Form...</div>}>
          <CustomOrderForm />
        </Suspense>
      </section>
    </div>
  );
}
