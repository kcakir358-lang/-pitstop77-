export default function Home() {
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
        }

        .logo {
          width: 105px;
          border-radius: 12px;
        }

        .nav-links {
          display: flex;
          gap: 32px;
          font-weight: 800;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
        }

        .nav-links a:hover {
          color: #ef4444;
        }

        .call-btn {
          background: #dc2626;
          color: white;
          padding: 14px 22px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 900;
        }

        .hero {
          padding: 150px 24px 80px;
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

        .primary {
          background: #dc2626;
          color: white;
          padding: 17px 26px;
          border-radius: 16px;
          text-decoration: none;
          font-weight: 900;
        }

        .secondary {
          border: 1px solid #555;
          color: white;
          padding: 17px 26px;
          border-radius: 16px;
          text-decoration: none;
          font-weight: 900;
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
          opacity: .88;
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

        .service-card {
          background: linear-gradient(135deg, #111, #050505);
          border: 1px solid #7f1d1d;
          border-radius: 28px;
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
          background: rgba(0,0,0,.7);
          border: 1px solid #5f1515;
          border-radius: 22px;
          padding: 24px;
          text-align: center;
        }

        .feature strong {
          display: block;
          font-size: 24px;
          color: #ef4444;
          margin-bottom: 8px;
        }

        .contact-box {
          max-width: 750px;
          margin: auto;
          background: linear-gradient(135deg, #111, #050505);
          border: 1px solid #7f1d1d;
          border-radius: 34px;
          padding: 36px;
          text-align: center;
        }

        .contact-box h2 {
          font-size: 44px;
          margin: 0 0 12px;
        }

        .contact-box p {
          color: #bbb;
          font-size: 20px;
          line-height: 1.6;
          margin-bottom: 28px;
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
          .features {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 48px;
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
            <a href="#iletisim">İletişim</a>
          </nav>

          <a className="call-btn" href="https://wa.me/905427255217">
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
              Yağ değişimi, fren bakımı ve arıza tespiti için servisimize gelmene gerek yok.
              PITSTOP77 mobil servis ekibi bulunduğun konuma gelir.
            </p>

            <div className="hero-actions">
              <a className="primary" href="https://wa.me/905427255217">
                WhatsApp’tan Servis Çağır
              </a>

              <a className="secondary" href="#hizmetler">
                Hizmetleri Gör
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
          <p className="section-desc">Mobil oto bakımda ihtiyacın olan temel hizmetler.</p>

          <div className="services">
            <div className="service-card">
              <div className="icon">🛢️</div>
              <h3>Yağ Değişimi</h3>
              <p>Motor yağı ve filtre değişimi yerinde, hızlı ve güvenli şekilde yapılır.</p>
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
          </div>
        </div>
      </section>

      <section id="neden" className="section why">
        <div className="container">
          <h2 className="section-title">Neden PITSTOP77?</h2>
          <p className="section-desc">Zamandan tasarruf et, bakımını konumunda yaptır.</p>

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

      <section id="iletisim" className="section">
        <div className="contact-box">
          <h2>Servis Talebi Oluştur</h2>
          <p>
            Aracın için destek almak istiyorsan WhatsApp üzerinden bize hemen ulaş.
          </p>

          <a className="primary" href="https://wa.me/905427255217">
            WhatsApp ile İletişime Geç
          </a>
        </div>
      </section>
<section className="container">
  <h2>Yalova Mobil Oto Bakım Hizmeti</h2>

  <p>
    Pitstop77 olarak Yalova ve çevresinde mobil oto bakım hizmeti
    sunuyoruz. Yağ değişimi, filtre değişimi, fren bakımı ve araç
    kontrollerini bulunduğunuz konumda gerçekleştiriyoruz.
  </p>
</section>

      <footer className="footer">
        PITSTOP77 Mobil Oto Bakım © 2026
      </footer>
    </main>
  );
}