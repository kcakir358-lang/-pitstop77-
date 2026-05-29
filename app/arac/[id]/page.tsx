export default function AracDetayPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          margin: "80px auto",
          background: "#111",
          border: "1px solid #7f1d1d",
          borderRadius: "30px",
          padding: "35px",
        }}
      >
        <h1 style={{ color: "#ef1111" }}>PITSTOP77</h1>

        <h2>Araç Bakım Kartı</h2>

        <p><b>Plaka:</b> 77 ABC 123</p>
        <p><b>Müşteri:</b> Örnek Müşteri</p>
        <p><b>Telefon:</b> 0545 470 84 82</p>
        <p><b>Marka:</b> BMW</p>
        <p><b>Model:</b> 320i</p>
        <p><b>KM:</b> 120000</p>
        <p><b>Son Bakım:</b> 29.05.2026</p>
        <p><b>Yapılan İşlem:</b> Yağ Değişimi</p>

        <a
          href="https://wa.me/905454700482"
          style={{
            display: "inline-block",
            marginTop: "20px",
            background: "#dc2626",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "10px",
            textDecoration: "none",
          }}
        >
          WhatsApp İletişim
        </a>
      </div>
    </main>
  );
}