"use client";

import { useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

export default function Home() {
  const [ad, setAd] = useState("");
  const [telefon, setTelefon] = useState("");
  const [plaka, setPlaka] = useState("");
  const [arac, setArac] = useState("");
  const [konum, setKonum] = useState("");
  const [hizmet, setHizmet] = useState("Yağ Değişimi");
  const [sorguPlaka, setSorguPlaka] = useState("");

  const talepGonder = async () => {
    if (!ad || !telefon || !plaka) {
      alert("Ad, telefon ve plaka zorunlu");
      return;
    }

    await addDoc(collection(db, "talepler"), {
      ad,
      telefon,
      plaka,
      arac,
      konum,
      hizmet,
      durum: "Bekliyor",
      tarih: new Date(),
    });

    alert("Talebiniz alındı. En kısa sürede dönüş yapılacak.");

    setAd("");
    setTelefon("");
    setPlaka("");
    setArac("");
    setKonum("");
    setHizmet("Yağ Değişimi");
  };

  const aracSorgula = () => {
    if (!sorguPlaka) {
      alert("Plaka girin");
      return;
    }

    const id = sorguPlaka.replace(/\s+/g, "").toUpperCase();
    window.location.href = `/arac/${id}`;
  };

  return (
    <main className="home-page">
      <style>{`
        .home-page {
          min-height: 100vh;
          background: #000;
          color: white;
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          background: rgba(0,0,0,.88);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #7f1d1d;
        }

        .nav-inner {
          max-width: 1200px;
          margin: auto;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .logo {
          width: 105px;
          border-radius: 12px;
        }

        .nav-links {
          display: flex;
          gap: 28px;
          font-weight: 800;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
        }

        .nav-links a:hover {
          color: #ef4444;
        }

        .call-btn,
        .primary {
          background: #dc2626;
          color: white;
          padding: 15px 24px;
          border-radius: 16px;
          text-decoration: none;
          font-weight: 900;
          border: none;
          cursor: pointer;
          display: inline-block;
        }

        .secondary {
          border: 1px solid #555;
          color: white;
          padding: 15px 24px;
          border-radius: 16px;
          text-decoration: none;
          font-weight: 900;
        }

        .hero {
          padding: 150px 24px 90px;
          background:
            radial-gradient(circle at top left, rgba(220,38,38,.35), transparent 35%),
            linear-gradient(135deg, #000 0%, #080808 45%, #240000 100%);
        }

        .hero-inner {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 60px;
          align-items: center;
        }

        .badge {
          display: inline-block;
          background: rgba(220,38,38,.15);
          border: 1px solid #dc2626;
          color: #ff6b6b;
          padding: 10px 16px;
          border-radius: 999px;
          font-weight: 900;
          margin-bottom: 24px;
        }

        h1 {
          font-size: 72px;
          line-height: 1.05;
          margin: 0 0 28px;
          font-weight: 1000;
        }

        .red {
          color: #ef1111;
        }

        .hero p {
          font-size: 21px;
          line-height: 1.7;
          color: #d1d5db;
          margin-bottom: 34px;
        }

        .hero-actions {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }

        .hero-card {
          position: relative;
          background: #070707;
          border: 1px solid #7f1d1d;
          border-radius: 36px;
          padding: 16px;
          box-shadow: 0 30px 90px rgba(0,0,0,.6);
        }

        .hero-card img {
          width: 100%;
          border-radius: 28px;
          display: block;
          opacity: .9;
        }

        .floating {
          position: absolute;
          left: 35px;
          bottom: -30px;
          background: #050505;
          border: 1px solid #dc2626;
          border-radius: 24px;
          padding: 20px 26px;
          box-shadow: 0 20px 50px rgba(0,0,0,.7);
        }

        .floating h3 {
          color: #ef4444;
          margin: 0 0 8px;
          font-size: 28px;
        }

        .floating p {
          margin: 0;
          font-size: 16px;
          color: #ddd;
        }

        .section {
          padding: 90px 24px;
        }

        .container {
          max-width: 1200px;
          margin: auto;
        }

        .section-title {
          text-align: center;
          font-size: 48px;
          margin: 0 0 14px;
          font-weight: 1000;
        }

        .section-desc {
          text-align: center;
          color: #aaa;
          font-size: 20px;
          margin-bottom: 50px;
        }

        .services {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .service-card,
        .feature,
        .contact-box,
        .talep-box {
          background: linear-gradient(135deg, #111, #050505);
          border: 1px solid #7f1d1d;
          border-radius: 28px;
        }

        .service-card {
          padding: 32px;
          transition: .25s;
        }

        .service-card:hover {
          transform: translateY(-6px);
          border-color: #ef4444;
        }

        .icon {
          font-size: 48px;
          margin-bottom: 18px;
        }

        .service-card h3 {
          font-size: 27px;
          margin: 0 0 14px;
        }

        .service-card p {
          color: #bbb;
          font-size: 18px;
          line-height: 1.6;
        }

        .why {
          background: linear-gradient(180deg, #000, #170000);
        }

        .features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .feature {
          padding: 24px;
          text-align: center;
        }

        .feature strong {
          display: block;
          font-size: 24px;
          color: #ef4444;
          margin-bottom: 8px;
        }

        .gallery {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }

        .gallery img,
        .gallery video {
          width: 100%;
          border-radius: 24px;
          border: 1px solid #7f1d1d;
          background: #050505;
        }

        .contact-box {
          max-width: 760px;
          margin: auto;
          padding: 36px;
          text-align: center;
        }

        .contact-box h2,
        .talep-box h2 {
          font-size: 44px;
          margin: 0 0 12px;
        }

        .contact-box p,
        .talep-box p,
        .seo-text p {
          color: #bbb;
          font-size: 20px;
          line-height: 1.6;
        }

        .talep-box {
          max-width: 760px;
          margin: auto;
          padding: 36px;
        }

        .talep-box input,
        .talep-box select {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          margin-bottom: 14px;
          background: #050505;
          color: white;
          border: 1px solid #7f1d1d;
          font-size: 16px;
        }

        .talep-box button {
          margin-top: 10px;
        }

        .seo-text {
          background: #050505;
          border-top: 1px solid #7f1d1d;
          border-bottom: 1px solid #7f1d1d;
        }

        .footer {
          border-top: 1px solid #7f1d1d;
          padding: 30px 24px;
          text-align: center;
          color: #aaa;
          background: #050505;
        }

        @media (max-width: 900px) {
          .nav-links {
            display: none;
          }

          .hero-inner,
          .services,
          .features,
          .gallery {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 46px;
          }

          .section-title {
            font-size: 36px;
          }

          .floating {
            position: static;
            margin-top: 16px;
          }
        }
      `}</style>

      <header className="navbar">
        <div className="nav-inner">
          <img src="/logo.png" alt="PITSTOP77" className="logo" />

          <nav className="nav-links">
            <a href="#">Ana Sayfa</a>
            <a href="#hizmetler">Hizmetler</a>
            <a href="#neden">Neden Biz?</a>
            <a href="#galeri">Galeri</a>
            <a href="#iletisim">İletişim</a>
            <a href="#talep">Talep Oluştur</a>
          </nav>

          <a className="call-btn" href="https://wa.me/905454708482">
            Servis Çağır
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div>
            <span className="badge">Yalova 7/24 Mobil Oto Bakım</span>

            <h1>
              Aracının <span className="red">Bakımı</span> Ayağına Gelsin
            </h1>

            <p>
              Yağ değişimi, fren bakımı, filtre değişimi ve arıza tespiti için
              servisimize gelmene gerek yok. PITSTOP77 mobil servis ekibi
              bulunduğun konuma gelir.
            </p>

            <div className="hero-actions">
              <a className="primary" href="https://wa.me/905454708482">
                WhatsApp’tan Servis Çağır
              </a>

              <a className="secondary" href="#talep">
                Bakım Talebi Oluştur
              </a>
            </div>
          </div>

          <div className="hero-card">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop"
              alt="Mobil oto bakım"
            />

            <div className="floating">
              <h3>Hızlı Servis</h3>
              <p>Konumuna gelir, bakımını yerinde yaparız.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="hizmetler" className="section">
        <div className="container">
          <h2 className="section-title">Hizmetlerimiz</h2>
          <p className="section-desc">
            Yalova mobil oto bakımda ihtiyacın olan temel hizmetler.
          </p>

          <div className="services">
            <div className="service-card">
              <div className="icon">🛢️</div>
              <h3>Yağ Değişimi</h3>
              <p>Motor yağı ve filtre değişimi yerinde, hızlı ve güvenli şekilde yapılır.</p>
            </div>

            <div className="service-card">
              <div className="icon">🧰</div>
              <h3>Filtre Değişimi</h3>
              <p>Hava, polen, yağ ve yakıt filtreleri kontrol edilip değiştirilir.</p>
            </div>

            <div className="service-card">
              <div className="icon">🛞</div>
              <h3>Fren Bakımı</h3>
              <p>Fren balatası kontrolü ve değişimi ile güvenli sürüş sağlanır.</p>
            </div>

            <div className="service-card">
              <div className="icon">🔧</div>
              <h3>Arıza Tespiti</h3>
              <p>Bilgisayarlı arıza tespit cihazı ile aracın hızlıca kontrol edilir.</p>
            </div>

            <div className="service-card">
              <div className="icon">⚡</div>
              <h3>Buji Değişimi</h3>
              <p>Motor performansı için buji kontrolü ve değişimi yapılır.</p>
            </div>

            <div className="service-card">
              <div className="icon">✅</div>
              <h3>Genel Kontrol</h3>
              <p>Aracın temel bakım noktaları yerinde kontrol edilir.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="talep-box">
          <h2>🔍 Plaka ile Araç Sorgula</h2>

          <p>Bakım geçmişinizi görmek için plakanızı yazın.</p>
<p style={{ color: "#aaa", fontSize: 14 }}>
  Gizlilik nedeniyle müşteri adı ve telefon bilgileri gösterilmez.
</p>
          <input
            placeholder="Örn: 77 ADP 019"
            value={sorguPlaka}
            onChange={(e) => setSorguPlaka(e.target.value)}
          />

          <button onClick={aracSorgula} className="primary">
            Araç Bilgilerini Gör
          </button>
        </div>
      </section>

      <section id="neden" className="section why">
        <div className="container">
          <h2 className="section-title">Neden PITSTOP77?</h2>
          <p className="section-desc">
            Zamandan tasarruf et, bakımını bulunduğun konumda yaptır.
          </p>

          <div className="features">
            <div className="feature">
              <strong>7/24</strong>
              Mobil destek
            </div>
            <div className="feature">
              <strong>Yerinde</strong>
              Servis hizmeti
            </div>
            <div className="feature">
              <strong>Hızlı</strong>
              Talep dönüşü
            </div>
            <div className="feature">
              <strong>Güvenli</strong>
              Profesyonel bakım
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Müşteri Yorumları</h2>
          <p className="section-desc">PITSTOP77 hizmetlerinden memnun kalan müşterilerimiz.</p>

          <div className="services">
            <div className="service-card">
              <h3>⭐ ⭐ ⭐ ⭐ ⭐</h3>
              <p>Yağ değişimi için geldiler, hızlı ve temiz çalıştılar. Tavsiye ederim.</p>
              <strong>— Gökberk</strong>
            </div>

            <div className="service-card">
              <h3>⭐ ⭐ ⭐ ⭐ ⭐</h3>
              <p>Aracı servise götürmeden bulunduğum yerde bakım yaptırdım. Çok pratik.</p>
              <strong>— Yalova Müşterisi</strong>
            </div>

            <div className="service-card">
              <h3>⭐ ⭐ ⭐ ⭐ ⭐</h3>
              <p>Fren bakımı ve genel kontrol yapıldı. İlgili ve güvenilir hizmet.</p>
              <strong>— PITSTOP77 Müşterisi</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="galeri" className="section">
        <div className="container">
          <h2 className="section-title">Çalışmalarımız</h2>
          <p className="section-desc">
            Mobil oto bakım hizmetlerimizden fotoğraf ve video görüntüleri.
          </p>

          <div className="gallery">
            <img src="/galeri/servis.jpg" alt="PITSTOP77 servis çalışması" />

            <video controls>
              <source src="/video/pitstop77.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section id="iletisim" className="section">
        <div className="contact-box">
          <h2>Servis Çağır</h2>
          <p>
            Aracın için destek almak istiyorsan WhatsApp üzerinden bize hemen ulaş.
          </p>

          <a className="primary" href="https://wa.me/905454708482">
            WhatsApp ile İletişime Geç
          </a>
        </div>
      </section>

      <section id="talep" className="section">
        <div className="talep-box">
          <h2>🚗 Bakım Talebi Oluştur</h2>
          <p>
            Yalova ve çevresinde mobil oto bakım hizmeti almak için formu doldurun,
            size en kısa sürede dönüş yapalım.
          </p>

          <input placeholder="Ad Soyad" value={ad} onChange={(e) => setAd(e.target.value)} />
          <input placeholder="Telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
          <input placeholder="Plaka" value={plaka} onChange={(e) => setPlaka(e.target.value)} />
          <input placeholder="Araç Marka / Model" value={arac} onChange={(e) => setArac(e.target.value)} />
          <input placeholder="Konum" value={konum} onChange={(e) => setKonum(e.target.value)} />

          <select value={hizmet} onChange={(e) => setHizmet(e.target.value)}>
            <option>Yağ Değişimi</option>
            <option>Filtre Değişimi</option>
            <option>Fren Değişimi</option>
            <option>Arıza Tespiti</option>
            <option>Buji Değişimi</option>
            <option>Genel Kontrol</option>
          </select>

          <button onClick={talepGonder} className="primary">
            Talep Gönder
          </button>
        </div>
      </section>

      <section className="section seo-text">
        <div className="container">
          <h2 className="section-title">Yalova Mobil Oto Bakım Hizmeti</h2>
          <p>
            PITSTOP77 olarak Yalova ve çevresinde mobil oto bakım hizmeti
            sunuyoruz. Yağ değişimi, filtre değişimi, fren bakımı, arıza tespiti
            ve araç kontrollerini bulunduğunuz konumda gerçekleştiriyoruz.
            Yalova merkez, Çiftlikköy, Altınova, Termal ve çevre bölgelerde
            mobil servis desteği sağlıyoruz.
          </p>
        </div>
      </section>

      <footer className="footer">
        PITSTOP77 Mobil Oto Bakım • Yalova • 0 545 470 84 82
      </footer>
    </main>
  );
}