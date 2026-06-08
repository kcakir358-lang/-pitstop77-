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
        <div style={styles.card}>
          <h1 style={styles.logo}>PITSTOP77</h1>
          <p>Yükleniyor...</p>
        </div>
      </main>
    );
  }

  if (!arac) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.logo}>PITSTOP77</h1>
          <h2>Araç bulunamadı</h2>
          <p>Bu QR koda ait araç kaydı bulunamadı.</p>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.logo}>PITSTOP77</h1>
            <p style={styles.subtitle}>Mobil Oto Bakım Servis Kartı</p>
          </div>

          <div style={styles.plateBox}>
            {arac.plaka}
          </div>
        </div>

        <div style={styles.statusBox}>
          <strong>Son Bakım:</strong> {arac.sonBakim || "-"}  
          <br />
          <strong>Sonraki Bakım KM:</strong> {arac.sonrakiBakimKm || "-"}
        </div>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Araç Bilgileri</h2>

          <div style={styles.grid}>
            <div style={styles.infoItem}>
              <span>Müşteri</span>
              <b>{arac.musteri || "-"}</b>
            </div>

            <div style={styles.infoItem}>
              <span>Telefon</span>
              <b>{arac.telefon || "-"}</b>
            </div>

            <div style={styles.infoItem}>
              <span>Marka / Model</span>
              <b>{arac.marka || "-"} {arac.model || ""}</b>
            </div>

            <div style={styles.infoItem}>
              <span>Güncel KM</span>
              <b>{arac.km || "-"}</b>
            </div>

            <div style={styles.infoItem}>
              <span>Son İşlem</span>
              <b>{arac.islem || "-"}</b>
            </div>

            <div style={styles.infoItem}>
              <span>Servis</span>
              <b>PITSTOP77</b>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Bakım Geçmişi</h2>

          {arac.bakimGecmisi && arac.bakimGecmisi.length > 0 ? (
            <div style={styles.timeline}>
              {arac.bakimGecmisi.map((bakim: any, index: number) => (
                <div key={index} style={styles.timelineItem}>
                  <div style={styles.dot}></div>

                  <div style={styles.historyCard}>
                    <div style={styles.historyTop}>
                      <strong>{bakim.islem}</strong>
                      <span>{bakim.tarih}</span>
                    </div>

                    <p style={styles.historyText}>
                      <b>KM:</b> {bakim.km}
                    </p>

                    {bakim.not && (
                      <p style={styles.note}>
                        {bakim.not}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={styles.empty}>Henüz bakım geçmişi eklenmedi.</p>
          )}
        </section>

        <div style={styles.footer}>
          <a href="https://wa.me/905427255217" style={styles.whatsapp}>
            WhatsApp ile Servis Çağır
          </a>

          <a href="/" style={styles.homeBtn}>
            Ana Sayfa
          </a>
        </div>
      </div>
    </main>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #300000, #050505 45%, #000)",
    color: "white",
    padding: 24,
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  card: {
    maxWidth: 850,
    margin: "40px auto",
    background: "rgba(10,10,10,.95)",
    border: "1px solid #7f1d1d",
    borderRadius: 32,
    padding: 30,
    boxShadow: "0 30px 90px rgba(0,0,0,.7)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    flexWrap: "wrap",
    borderBottom: "1px solid #7f1d1d",
    paddingBottom: 24,
    marginBottom: 24,
  },
  logo: {
    color: "#ef1111",
    fontSize: 42,
    margin: 0,
    fontWeight: 900,
  },
  subtitle: {
    color: "#aaa",
    marginTop: 8,
  },
  plateBox: {
    background: "#ef1111",
    color: "white",
    padding: "16px 24px",
    borderRadius: 18,
    fontSize: 30,
    fontWeight: 900,
    letterSpacing: 1,
  },
  statusBox: {
    background: "linear-gradient(135deg, rgba(239,17,17,.2), rgba(0,0,0,.7))",
    border: "1px solid #ef4444",
    borderRadius: 20,
    padding: 20,
    marginBottom: 26,
    lineHeight: 1.8,
    color: "#fecaca",
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 28,
    color: "#ef4444",
    marginBottom: 18,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  infoItem: {
    background: "#050505",
    border: "1px solid #7f1d1d",
    borderRadius: 18,
    padding: 18,
  },
  timeline: {
    borderLeft: "2px solid #7f1d1d",
    marginLeft: 10,
    paddingLeft: 20,
  },
  timelineItem: {
    position: "relative",
    marginBottom: 18,
  },
  dot: {
    position: "absolute",
    left: -30,
    top: 18,
    width: 16,
    height: 16,
    background: "#ef1111",
    borderRadius: "50%",
    border: "3px solid #111",
  },
  historyCard: {
    background: "#050505",
    border: "1px solid #7f1d1d",
    borderRadius: 18,
    padding: 18,
  },
  historyTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    color: "#fff",
    fontSize: 18,
  },
  historyText: {
    color: "#ddd",
  },
  note: {
    background: "rgba(239,68,68,.12)",
    border: "1px solid #7f1d1d",
    borderRadius: 12,
    padding: 12,
    color: "#fecaca",
  },
  empty: {
    color: "#aaa",
  },
  footer: {
    marginTop: 34,
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  whatsapp: {
    background: "#16a34a",
    color: "white",
    padding: "15px 20px",
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 900,
  },
  homeBtn: {
    background: "#333",
    color: "white",
    padding: "15px 20px",
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 900,
  },
};