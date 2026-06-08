"use client";

import { useEffect, useState, use } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwNzCNF3RRvlc0MdBhRh4Z4471tKOgJCI",
  authDomain: "pitstop77-e1074.firebaseapp.com",
  projectId: "pitstop77-e1074",
  storageBucket: "pitstop77-e1074.firebasestorage.app",
  messagingSenderId: "238971614624",
  appId: "1:238971614624:web:61f80396faad54f67620c5",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export default function AracPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [arac, setArac] = useState<any>(null);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const getir = async () => {
      const temizId = id.replace(/\s+/g, "").toUpperCase();
      const ref = doc(db, "araclar", temizId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setArac(snap.data());
      }

      setYukleniyor(false);
    };

    getir();
  }, [id]);

  if (yukleniyor) {
    return (
      <main style={styles.page}>
        <h1>Yükleniyor...</h1>
      </main>
    );
  }

  if (!arac) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.logo}>PITSTOP77</h1>
          <h2>Araç bulunamadı</h2>
          <p>Bu QR koda ait araç kaydı yok.</p>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.logo}>PITSTOP77</h1>
        <h2>Araç Bakım Kartı</h2>

        <p><b>Plaka:</b> {arac.plaka}</p>
        <p><b>Müşteri:</b> {arac.musteri}</p>
        <p><b>Telefon:</b> {arac.telefon}</p>
        <p><b>Araç:</b> {arac.marka} {arac.model}</p>
        <p><b>KM:</b> {arac.km}</p>
        <p><b>Son Bakım:</b> {arac.sonBakim}</p>
        <p><b>Sonraki Bakım KM:</b> {arac.sonrakiBakimKm}</p>
        <p><b>İşlem:</b> {arac.islem}</p>

        <div style={styles.historyBox}>
          <h2 style={{ color: "#ef4444" }}>Bakım Geçmişi</h2>

          {arac.bakimGecmisi && arac.bakimGecmisi.length > 0 ? (
            arac.bakimGecmisi.map((bakim: any, index: number) => (
              <div key={index} style={styles.historyItem}>
                <p><b>Tarih:</b> {bakim.tarih}</p>
                <p><b>KM:</b> {bakim.km}</p>
                <p><b>İşlem:</b> {bakim.islem}</p>
                <p><b>Not:</b> {bakim.not || "-"}</p>
              </div>
            ))
          ) : (
            <p>Henüz bakım geçmişi yok.</p>
          )}
        </div>

        <a href="https://wa.me/905427255217" style={styles.button}>
          WhatsApp İletişim
        </a>
      </div>
    </main>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#050505",
    color: "white",
    padding: 30,
    fontFamily: "Arial",
  },
  card: {
    maxWidth: 650,
    margin: "60px auto",
    background: "#111",
    border: "1px solid #7f1d1d",
    borderRadius: 30,
    padding: 35,
  },
  logo: {
    color: "#ef1111",
  },
  historyBox: {
    marginTop: 30,
    borderTop: "1px solid #7f1d1d",
    paddingTop: 25,
  },
  historyItem: {
    background: "#050505",
    border: "1px solid #7f1d1d",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
  },
  button: {
    display: "inline-block",
    marginTop: 20,
    background: "#dc2626",
    color: "white",
    padding: "14px 20px",
    borderRadius: 12,
    textDecoration: "none",
  },
};