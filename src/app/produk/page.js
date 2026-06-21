"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { products as initialProducts, categories as initialCategories, formatPrice } from "../data/products";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabase";

export default function ProdukPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Kategori
        const { data: catData, error: catError } = await supabase.from('product_categories').select('*');
        if (catData && !catError && catData.length > 0) {
          // Pastikan 'Semua' ada di awal
          const allCat = catData.find(c => c.id === 'all');
          const otherCats = catData.filter(c => c.id !== 'all');
          setCategories(allCat ? [allCat, ...otherCats] : catData);
        }

        // Fetch Produk
        const { data: prodData, error: prodError } = await supabase.from('products').select('*').order('id');
        if (prodData && !prodError && prodData.length > 0) {
          const formattedProducts = prodData.map(p => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            category: p.category_id,
            description: p.description,
            shortDesc: p.short_desc,
            price: p.price,
            minOrder: p.min_order,
            unit: p.unit,
            features: p.features || [],
            popular: p.popular,
            emoji: p.emoji,
            image: p.image_url,
            specs: p.specs
          }));
          setProducts(formattedProducts);
        }
      } catch (err) {
        console.error("Gagal mengambil data dari Supabase:", err);
      }
    }
    fetchData();
  }, []);

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className={styles.produkPage}>
      {/* Hero Banner */}
      <section className={styles.pageHero}>
        <div className={styles.heroBg}></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>📦 Katalog Produk</span>
          <h1>Koleksi Stiker <span>Lengkap</span></h1>
          <p>Temukan stiker yang sempurna untuk kebutuhan personal, mahasiswa, dan bisnis UMKM kamu</p>
        </div>
      </section>

      {/* Filter & Search */}
      <section className={`section ${styles.catalogSection}`}>
        <div className="container">
          <div className={styles.filterBar}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Cari stiker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.categoryTabs}>
              {categories.slice(0, 8).map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.tabActive : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.emoji}</span> {cat.name}
                </button>
              ))}
              <div className={styles.moreCategories}>
                {categories.slice(8).map((cat) => (
                  <button
                    key={cat.id}
                    className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.tabActive : ""}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span>{cat.emoji}</span> {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className={styles.resultCount}>
            Menampilkan <strong>{filtered.length}</strong> produk
          </p>

          <div className={styles.productGrid}>
            {filtered.map((product, index) => (
              <div
                key={product.id}
                className={styles.productCard}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className={styles.cardImageWrapper}>
                  <img
                    src={product.image || "/images/stiker-vinyl.png"}
                    alt={product.name}
                    className={styles.cardImg}
                  />
                  <span className={styles.cardEmojiBadge}>{product.emoji}</span>
                  {product.popular && (
                    <span className={styles.popularBadge} style={{ position: 'absolute', top: '0.8rem', right: '0.8rem' }}>🔥 Populer</span>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    <Link href={`/produk/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p className={styles.cardDesc}>{product.description}</p>

                  <div className={styles.cardFeatures}>
                    {product.features.map((f, i) => (
                      <span key={i} className={styles.featureTag}>
                        ✓ {f}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardBottom}>
                    <div className={styles.priceInfo}>
                      <span className={styles.price}>{formatPrice(product.price)}</span>
                      <span className={styles.unit}>/{product.unit}</span>
                      <span className={styles.minOrder}>Min. {product.minOrder} {product.unit}</span>
                    </div>
                    <div className={styles.cardActions}>
                      <Link
                        href={`/produk/${product.slug}`}
                        className="btn btn-outline"
                        style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                      >
                        Detail 🔍
                      </Link>
                      <Link
                        href={`/custom-order?product=${product.slug}`}
                        className="btn btn-primary"
                        style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                      >
                        Pesan 🛒
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className={styles.emptyState}>
              <span className={styles.emptyEmoji}>😕</span>
              <h3>Produk tidak ditemukan</h3>
              <p>Coba ubah kata kunci atau kategori pencarian kamu</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
