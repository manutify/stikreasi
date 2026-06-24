"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { products, formatPrice } from "../../data/products";
import styles from "./page.module.css";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("specs");
  const [qty, setQty] = useState(50);

  useEffect(() => {
    if (slug) {
      const foundProduct = products.find((p) => p.slug === slug);
      if (foundProduct) {
        setProduct(foundProduct);
        setQty(foundProduct.minOrder);
      } else {
        router.push("/produk");
      }
    }
  }, [slug, router]);

  if (!product) {
    return (
      <div className={styles.loadingContainer}>
        <span className={styles.spinner}>🎨</span>
        <p>Memuat detail produk...</p>
      </div>
    );
  }

  const getDiscountedPrice = () => {
    let base = product.price;
    let factor = 1;
    if (qty >= 500) factor = 0.7;
    else if (qty >= 100) factor = 0.8;
    else if (qty >= 50) factor = 0.9;
    return base * qty * factor;
  };

  const getPerItemPrice = () => {
    let base = product.price;
    let factor = 1;
    if (qty >= 500) factor = 0.7;
    else if (qty >= 100) factor = 0.8;
    else if (qty >= 50) factor = 0.9;
    return base * factor;
  };

  const handleWhatsAppOrder = () => {
    const msg = `Halo Stikreasi! Saya ingin pesan stiker berikut:%0A%0A` +
      `*Produk:* ${product.name}%0A` +
      `*Jumlah:* ${qty} ${product.unit}%0A` +
      `*Harga per item (setelah diskon):* ${formatPrice(getPerItemPrice())}%0A` +
      `*Total Estimasi:* ${formatPrice(getDiscountedPrice())}%0A%0A` +
      `Mohon infokan langkah selanjutnya. Terima kasih!`;
    window.open(`https://wa.me/6289524539171?text=${msg}`, "_blank");
  };

  return (
    <div className={styles.detailPage}>
      <div className="container">
        <Link href="/produk" className={styles.backLink}>
          ← Kembali ke Katalog
        </Link>

        <div className={styles.productLayout}>
          {/* Left: Product Image */}
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <img
                src={product.image || "/images/stiker-vinyl.png"}
                alt={product.name}
                className={styles.productImg}
              />
              <span className={styles.emojiBadge}>{product.emoji}</span>
            </div>
            <div className={styles.quickGuarantees}>
              <div className={styles.guaranteeItem}>
                <span>⚡</span>
                <p>Cepat (1-3 hari)</p>
              </div>
              <div className={styles.guaranteeItem}>
                <span>🛡️</span>
                <p>Kualitas Terjamin</p>
              </div>
              <div className={styles.guaranteeItem}>
                <span>🇮🇩</span>
                <p>Support UMKM</p>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className={styles.infoColumn}>
            <div className={styles.badgeRow}>
              <span className={`badge badge-blue`}>{product.category.toUpperCase()}</span>
              {product.popular && <span className={`badge badge-orange`}>🔥 Terpopuler</span>}
            </div>

            <h1 className={styles.productTitle}>{product.name}</h1>
            <p className={styles.productPriceRange}>
              {formatPrice(product.price)} <span className={styles.priceUnit}>/{product.unit}</span>
            </p>

            <p className={styles.productDesc}>{product.description}</p>

            {/* Tab Navigation */}
            <div className={styles.tabNav}>
              <button
                className={`${styles.tabBtn} ${activeTab === "specs" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("specs")}
              >
                📋 Spesifikasi
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === "pricing" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("pricing")}
              >
                💰 Simulasi Harga & Order
              </button>
            </div>

            {/* Tab Contents */}
            <div className={styles.tabContent}>
              {activeTab === "specs" && (
                <div className={styles.specsTab}>
                  <table className={styles.specsTable}>
                    <tbody>
                      {product.specs &&
                        Object.entries(product.specs).map(([key, val]) => (
                          <tr key={key}>
                            <td className={styles.specLabel}>{key}</td>
                            <td className={styles.specVal}>{val}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "pricing" && (
                <div className={styles.pricingTab}>
                  <div className={styles.simulationCard}>
                    <div className="form-group">
                      <label>Jumlah Pesanan ({product.unit})</label>
                      <div className={styles.qtyInputRow}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => setQty((prev) => Math.max(product.minOrder, prev - 10))}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={qty}
                          onChange={(e) => setQty(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))}
                          className="form-input"
                          style={{ textAlign: "center", width: "120px" }}
                        />
                        <button
                          className={styles.qtyBtn}
                          onClick={() => setQty((prev) => prev + 10)}
                        >
                          +
                        </button>
                      </div>
                      <span className={styles.minOrderAlert}>
                        * Minimal pemesanan untuk {product.name} adalah {product.minOrder} {product.unit}
                      </span>
                    </div>

                    <div className={styles.priceCalculation}>
                      <div className={styles.priceCalcRow}>
                        <span>Harga Satuan Dasar</span>
                        <span>{formatPrice(product.price)}</span>
                      </div>
                      <div className={styles.priceCalcRow}>
                        <span>Jumlah</span>
                        <span>{qty} {product.unit}</span>
                      </div>
                      {qty >= 50 && (
                        <div className={`${styles.priceCalcRow} ${styles.discountText}`}>
                          <span>Diskon Kuantitas</span>
                          <span>
                            {qty >= 500 ? "-30% (Bulk)" : qty >= 100 ? "-20% (Grosir)" : "-10%"}
                          </span>
                        </div>
                      )}
                      <div className={`${styles.priceCalcRow} ${styles.totalPriceRow}`}>
                        <span>Estimasi Total</span>
                        <span className={styles.grandPrice}>{formatPrice(getDiscountedPrice())}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action CTAs */}
            <div className={styles.actionButtons}>
              <button onClick={handleWhatsAppOrder} className={`btn btn-whatsapp ${styles.actionBtn}`}>
                💬 Pesan Cepat via WhatsApp
              </button>
              <Link
                href={`/custom-order?product=${product.slug}`}
                className={`btn btn-outline ${styles.actionBtn}`}
                style={{ textAlign: "center" }}
              >
                ✏️ Form Custom Full Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
