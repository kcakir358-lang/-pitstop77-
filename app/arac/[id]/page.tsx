"use client";

import { useEffect, useState } from "react";
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
 
export default function AracPage({ params }: { params: { id: string } }) {
  const [arac, setArac] = useState<any>(null);

  useEffect(() => {
    const getir = async () => {
      const ref = doc(db, "araclar", params.id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setArac(snap.data());
      }
    };

    getir();
  }, [params.id]);

  if (!arac) {
    return (
      <main style={{ minHeight: "100vh", background: "#050505", color: "white", padding: 30 }}>
        <h1>Araç bulunamadı</h1>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "white", padding: 30, fontFamily: "Arial" }}>
      <div style={{ maxWidth: 650, margin: "60px auto", background: "#111", border: "1px solid #7f1d1d", borderRadius: 30, padding: 35 }}>
        <h1 style={{ color: "#ef1111" }}>PITSTOP77</h1>
        <h2>Araç Bakım Kartı</h2>

        <img
  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://pitstop77web-five.vercel.app/arac/${params.id}`}
  style={{ background: "white", padding: 12, borderRadius: 16 }}
/>

        <p><b>Plaka:</b> {arac.plaka}</p>
        <p><b>Müşteri:</b> {arac.musteri}</p>
        <p><b>Telefon:</b> {arac.telefon}</p>
        <p><b>Araç:</b> {arac.marka} {arac.model}</p>
        <p><b>KM:</b> {arac.km}</p>
        <p><b>Son Bakım:</b> {arac.sonBakim}</p>
        <p><b>Sonraki Bakım KM:</b> {arac.sonrakiBakimKm}</p>
        <p><b>İşlem:</b> {arac.islem}</p>
<div
  style={{
    marginTop: 30,
    borderTop: "1px solid #7f1d1d",
    paddingTop: 25,
  }}
>
  <h2 style={{ color: "#ef4444" }}>Bakım Geçmişi</h2>

  {arac.bakimGecmisi && arac.bakimGecmisi.length > 0 ? (
    arac.bakimGecmisi.map((bakim: any, index: number) => (
      <div
        key={index}
        style={{
          background: "#050505",
          border: "1px solid #7f1d1d",
          borderRadius: 16,
          padding: 18,
          marginBottom: 15,
        }}
      >
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
        <a href="https://wa.me/905427255217" style={{ display: "inline-block", marginTop: 20, background: "#dc2626", color: "white", padding: "14px 20px", borderRadius: 12, textDecoration: "none" }}>
          WhatsApp İletişim
        </a>
      </div>
    </main>
  );
}