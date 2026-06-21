"use client";
import { useState, useEffect } from "react";
import { testimonials as initialTestimonials } from "../data/testimonials";
import styles from "./TestimonialSection.module.css";
import { supabase } from "@/lib/supabase";

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase.from('testimonials').select('*').order('id');
        if (data && !error && data.length > 0) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error("Gagal mengambil data testimoni:", err);
      }
    }
    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={styles.star}>
        {i < rating ? "★" : "☆"}
      </span>
    ));
  };

  return (
    <section className={`section ${styles.testimonials}`} id="testimoni">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Testimoni</span>
          <h2>Apa Kata <span style={{ color: 'var(--retro-green)' }}>Pelanggan</span> Kami?</h2>
          <p>Ribuan pelanggan puas dengan layanan Stikreasi</p>
        </div>

        <div className={styles.testimonialCarousel}>
          <button className={styles.carouselBtn} onClick={prevTestimonial} aria-label="Previous testimonial">
            ←
          </button>

          <div className={styles.testimonialSlider}>
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className={`${styles.testimonialCard} ${index === activeIndex ? styles.active : ""}`}
              >
                <div className={styles.quoteIcon}>"</div>
                <p className={styles.testimonialText}>{t.text}</p>
                <div className={styles.starRating}>
                  {renderStars(t.rating)}
                </div>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>
                    {t.avatar}
                  </div>
                  <div className={styles.authorInfo}>
                    <h4 className={styles.authorName}>{t.name}</h4>
                    <p className={styles.authorRole}>{t.role}</p>
                  </div>
                  <span className={`badge badge-blue`}>{t.category}</span>
                </div>
              </div>
            ))}
          </div>

          <button className={styles.carouselBtn} onClick={nextTestimonial} aria-label="Next testimonial">
            →
          </button>
        </div>

        <div className={styles.carouselDots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
