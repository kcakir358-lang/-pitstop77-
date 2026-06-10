import type { Metadata } from "next";
import "./globals.css";
export const metadata = {
  title:
    "PITSTOP77 Mobil Oto Bakım | Yalova Yerinde Yağ Değişimi ve Araç Bakımı",
  description:
    "PITSTOP77 Yalova mobil oto bakım hizmeti. Yerinde yağ değişimi, filtre değişimi, fren bakımı, akü kontrolü, arıza tespiti ve genel araç bakımı. Aracınızın bulunduğu konuma geliyoruz.",
  keywords: [
    "Yalova mobil oto bakım",
    "yerinde yağ değişimi",
    "mobil servis",
    "araç bakımı",
    "Yalova yağ değişimi",
    "fren değişimi",
    "oto servis",
    "Pitstop77",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <meta
          name="google-site-verification"
          content="NlsE53lTOvE5b0UexWXGoWHw_Bb_44eTjvU_PrIPasA"
        />
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}