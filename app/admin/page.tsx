"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
export default function AdminPage() {

  const [talepler, setTalepler] = useState<any[]>([]);

useEffect(() => {
  setTalepler([
    {
      id: "1",
      isim: "Örnek Müşteri",
      telefon: "0542 725 52 17",
      arac: "BMW 3.20",
      konum: "Yalova",
      hizmet: "Yağ Değişimi",
      durum: "Bekliyor",
      ucret: 0,
    },
  ]);
}, []);
  return (
    <main className="admin-page">
      <style>{`
        .admin-page {
          min-height: 100vh;
          background: radial-gradient(circle at top, #220000, #050505 45%, #000);
          color: white;
          padding: 32px;
          font-family: Arial, Helvetica, sans-serif;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 36px;
        }

        .admin-title {
          font-size: 52px;
          font-weight: 900;
          color: #ef1111;
          margin: 0;
        }

        .admin-subtitle {
          color: #aaa;
          font-size: 18px;
          margin-top: 8px;
        }

        .back-btn {
          background: #ef1111;
          color: white;
          padding: 14px 22px;
          border-radius: 14px;
          font-weight: 800;
          text-decoration: none;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 34px;
        }

        .stat-card {
          background: rgba(10,10,10,.85);
          border: 1px solid #7f1d1d;
          border-radius: 26px;
          padding: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,.4);
        }

        .stat-label {
          color: #aaa;
          margin: 0 0 12px;
        }

        .stat-value {
          font-size: 42px;
          font-weight: 900;
          margin: 0;
        }

        .panel {
          background: rgba(10,10,10,.85);
          border: 1px solid #7f1d1d;
          border-radius: 30px;
          padding: 28px;
          box-shadow: 0 20px 60px rgba(0,0,0,.45);
        }

        .panel-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          margin-bottom: 25px;
        }

        .panel-title {
          font-size: 34px;
          margin: 0 0 8px;
          font-weight: 900;
        }

        .panel-desc {
          color: #aaa;
          margin: 0;
        }

        .search {
          background: #050505;
          border: 1px solid #7f1d1d;
          color: white;
          padding: 15px 18px;
          border-radius: 14px;
          min-width: 260px;
          outline: none;
        }

        .request-card {
          background: linear-gradient(135deg, #111, #050505);
          border: 1px solid #7f1d1d;
          border-radius: 26px;
          padding: 24px;
        }

        .badge {
          display: inline-block;
          background: #f59e0b;
          color: black;
          padding: 8px 14px;
          border-radius: 999px;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .customer {
          font-size: 30px;
          font-weight: 900;
          margin: 0 0 18px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          color: #ddd;
          font-size: 18px;
        }

        .actions {
          margin-top: 24px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn {
          border: none;
          padding: 13px 18px;
          border-radius: 14px;
          color: white;
          font-weight: 900;
          cursor: pointer;
        }

        .btn.green { background: #16a34a; }
        .btn.blue { background: #2563eb; }
        .btn.red { background: #dc2626; }

        @media (max-width: 900px) {
          .admin-header,
          .panel-top {
            flex-direction: column;
            align-items: flex-start;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .search {
            width: 100%;
          }
        }
      `}</style>

      <div className="admin-header">
        <div>
          <h1 className="admin-title">PITSTOP77</h1>
          <p className="admin-subtitle">Mobil servis yönetim paneli</p>
        </div>

        <a href="/" className="back-btn">
          Siteye Dön
        </a>
      </div>

      <div className="stats">
        <div className="stat-card">
          <p className="stat-label">Toplam İş</p>
          <p className="stat-value">{talepler.length}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Tamamlanan</p>
          <p className="stat-value" style={{ color: "#22c55e" }}>
  {talepler.filter((t) => t.durum === "Tamamlandı").length}
</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Bekleyen</p>
          <p className="stat-value" style={{ color: "#f59e0b" }}>
  {talepler.filter((t) => t.durum !== "Tamamlandı").length}
</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Toplam Kazanç</p>
          <p className="stat-value" style={{ color: "#ef4444" }}>
  ₺{talepler.reduce((toplam, t) => toplam + Number(t.ucret || 0), 0)}
</p>
        </div>
      </div>

      <section className="panel">
        <div className="panel-top">
          <div>
            <h2 className="panel-title">Servis Talepleri</h2>
            <p className="panel-desc">Gelen müşteri talepleri burada listelenecek.</p>
          </div>

          <input className="search" placeholder="Müşteri ara..." />
        </div>

        {talepler.map((talep, index) => (
          <div className="request-card" key={index}>
            <span className="badge">{talep.durum}</span>

            <h3 className="customer">{talep.isim}</h3>

            <div className="info-grid">
              <p>📞 {talep.telefon}</p>
              <p>🚗 {talep.arac}</p>
              <p>🔧 {talep.hizmet}</p>
              <p>📍 {talep.konum}</p>
            </div>

            <div className="actions">
              <button className="btn green">Tamamlandı</button>
              <button className="btn blue">Haritada Aç</button>
              <button className="btn red">Sil</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}