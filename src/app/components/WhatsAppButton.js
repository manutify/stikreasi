"use client";
import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/6289924539711?text=Halo%20Stikreasi%2C%20saya%20mau%20tanya%20soal%20stiker"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappFloat}
      aria-label="Chat via WhatsApp"
    >
      <span className={styles.whatsappIcon}>💬</span>
      <span className={styles.whatsappPulse}></span>
    </a>
  );
}
