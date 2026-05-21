import type { Metadata } from "next";
import "./globals.css";
export const metadata = {
  title: "PITSTOP77",
  description: "Mobil oto bakım servisi",
  verification: {
    google: "NlsE53lTOvE5b0UexWXGoWHw_Bb_44eTjvU_PrIPasA",
  },
}

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