import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sözleşme Mimarı — Otomatik Sözleşme Üreticisi",
  description:
    "Türk hukuk mevzuatına tam uyumlu, alıcı odaklı satınalma sözleşmesi taslakları.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
