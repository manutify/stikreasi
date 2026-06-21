import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "Stikreasi — Cetak Stiker Custom & Premium Indonesia",
    template: "%s | Stikreasi",
  },
  description:
    "Stikreasi adalah layanan cetak stiker terbaik di Indonesia. Stiker vinyl, hologram, die-cut, label UMKM, dan personalisasi. Kualitas premium, harga terjangkau, pengerjaan cepat 1-3 hari.",
  keywords: [
    "cetak stiker",
    "stiker custom",
    "stiker vinyl",
    "stiker hologram",
    "label UMKM",
    "stiker murah",
    "stiker premium",
    "cetak stiker online",
    "stikreasi",
  ],
  openGraph: {
    title: "Stikreasi — Cetak Stiker Custom & Premium Indonesia",
    description:
      "Solusi cetak stiker terbaik untuk personal, mahasiswa, dan UMKM. Kualitas premium, harga bersahabat!",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
