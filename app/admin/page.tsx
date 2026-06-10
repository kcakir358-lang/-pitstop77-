"use client";

import { useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import jsPDF from "jspdf";
import {
  getFirestore,
  initializeFirestore,
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwNzCNF3RRvlc0MdBhRh4Z4471tKOgJCI",
  authDomain: "pitstop77-e1074.firebaseapp.com",
  projectId: "pitstop77-e1074",
  storageBucket: "pitstop77-e1074.firebasestorage.app",
  messagingSenderId: "238971614624",
  appId: "1:238971614624:web:61f80396faad54f67620c5",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);

const db = (() => {
  try {
    return initializeFirestore(app, {
      experimentalForceLongPolling: true,
    });
  } catch {
    return getFirestore(app);
  }
})();

export default function AdminPage() {
  const [giris, setGiris] = useState(false);
  const [sifre, setSifre] = useState("");
  const [arama, setArama] = useState("");

  const [araclar, setAraclar] = useState<any[]>([]);
  const [talepler, setTalepler] = useState<any[]>([]);

  const [plaka, setPlaka] = useState("");
  const [musteri, setMusteri] = useState("");
  const [telefon, setTelefon] = useState("");
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [km, setKm] = useState("");
  const [islem, setIslem] = useState("Yağ Değişimi");
  const [duzenlenenId, setDuzenlenenId] = useState("");

  const [bakimAracId, setBakimAracId] = useState("");
  const [bakimKm, setBakimKm] = useState("");
  const [bakimIslem, setBakimIslem] = useState("Yağ Değişimi");
  const [bakimNot, setBakimNot] = useState("");
  const [bakimDosya, setBakimDosya] = useState<File | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "araclar"), (snapshot) => {
      const liste = snapshot.docs.map((d) => ({
        ...d.data(),
        id: d.id,
      }));

      setAraclar(liste);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "talepler"), (snapshot) => {
      const liste = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setTalepler(liste);
    });

    return () => unsub();
  }, []);

  const temizle = () => {
    setPlaka("");
    setMusteri("");
    setTelefon("");
    setMarka("");
    setModel("");
    setKm("");
    setIslem("Yağ Değişimi");
    setDuzenlenenId("");
  };

  const aracEkle = async () => {
    if (!plaka || !musteri || !telefon) {
      alert("Plaka, müşteri ve telefon zorunlu");
      return;
    }

    const id = duzenlenenId || plaka.replace(/\s+/g, "").toUpperCase();

    await setDoc(
      doc(db, "araclar", id),
      {
        id,
        plaka,
        musteri,
        telefon,
        marka,
        model,
        km,
        islem,
        sonBakim: new Date().toLocaleDateString("tr-TR"),
        sonrakiBakimKm: Number(km || 0) + 10000,
        link: `https://pitstop77web-five.vercel.app/arac/${id}`,
        updatedAt: new Date(),
      },
      { merge: true }
    );

    alert(duzenlenenId ? "Araç güncellendi" : "Araç kaydedildi");
    temizle();
  };

  const aracSil = async (id: string) => {
    if (!confirm("Bu aracı silmek istediğine emin misin?")) return;
    await deleteDoc(doc(db, "araclar", id));
    alert("Araç silindi");
  };

  const aracDuzenle = (arac: any) => {
    setDuzenlenenId(arac.id);
    setPlaka(arac.plaka || "");
    setMusteri(arac.musteri || "");
    setTelefon(arac.telefon || "");
    setMarka(arac.marka || "");
    setModel(arac.model || "");
    setKm(arac.km || "");
    setIslem(arac.islem || "Yağ Değişimi");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bakimEkle = async () => {
    if (!bakimAracId || !bakimKm || !bakimIslem) {
      alert("Araç, KM ve işlem seçmelisin");
      return;
    }

    const secilenArac = araclar.find((a) => a.id === bakimAracId);

    let medyaUrl = "";
    let medyaTipi = "";

    if (bakimDosya) {
      const dosyaRef = ref(
        storage,
        `araclar/${bakimAracId}/${Date.now()}-${bakimDosya.name}`
      );

      await uploadBytes(dosyaRef, bakimDosya);
      medyaUrl = await getDownloadURL(dosyaRef);
      medyaTipi = bakimDosya.type.startsWith("video") ? "video" : "foto";
    }

    const yeniBakim = {
      tarih: new Date().toLocaleDateString("tr-TR"),
      km: bakimKm,
      islem: bakimIslem,
      not: bakimNot,
      medyaUrl,
      medyaTipi,
    };

    const eskiGecmis = secilenArac?.bakimGecmisi || [];

    await updateDoc(doc(db, "araclar", bakimAracId), {
      km: bakimKm,
      islem: bakimIslem,
      sonBakim: yeniBakim.tarih,
      sonrakiBakimKm: Number(bakimKm || 0) + 10000,
      bakimGecmisi: [yeniBakim, ...eskiGecmis],
    });

    alert("Bakım geçmişi eklendi");

    setBakimAracId("");
    setBakimKm("");
    setBakimIslem("Yağ Değişimi");
    setBakimNot("");
    setBakimDosya(null);
  };

  const talepSil = async (id: string) => {
    if (!confirm("Bu talebi silmek istediğine emin misin?")) return;

    await deleteDoc(doc(db, "talepler", id));
    alert("Talep silindi");
  };

  const talebiAracaCevir = async (talep: any) => {
    const id = String(talep.plaka || "")
      .replace(/\s+/g, "")
      .toUpperCase();

    if (!id) {
      alert("Talepte plaka yok");
      return;
    }

    await setDoc(
      doc(db, "araclar", id),
      {
        id,
        plaka: talep.plaka,
        musteri: talep.ad,
        telefon: talep.telefon,
        marka: talep.arac,
        model: "",
        km: "",
        islem: talep.hizmet,
        sonBakim: new Date().toLocaleDateString("tr-TR"),
        sonrakiBakimKm: "",
        link: `https://pitstop77web-five.vercel.app/arac/${id}`,
        talepId: talep.id,
        updatedAt: new Date(),
      },
      { merge: true }
    );

    await deleteDoc(doc(db, "talepler", talep.id));
    alert("Talep araç kaydına dönüştürüldü");
  };

  const talepDurumGuncelle = async (id: string, durum: string) => {
    await updateDoc(doc(db, "talepler", id), {
      durum,
    });

    alert("Talep durumu güncellendi");
  };

  const pdfOlustur = (arac: any) => {
    const belge = new jsPDF();

    belge.setFontSize(20);
    belge.text("PITSTOP77 SERVIS RAPORU", 20, 20);

    belge.setFontSize(12);
    belge.text(`Plaka: ${arac.plaka}`, 20, 40);
    belge.text(`Musteri: ${arac.musteri}`, 20, 50);
    belge.text(`Telefon: ${arac.telefon}`, 20, 60);
    belge.text(`Arac: ${arac.marka} ${arac.model}`, 20, 70);
    belge.text(`KM: ${arac.km}`, 20, 80);
    belge.text(`Son Bakim: ${arac.sonBakim || "-"}`, 20, 90);
    belge.text(`Son Islem: ${arac.islem || "-"}`, 20, 100);

    let y = 120;

    belge.setFontSize(16);
    belge.text("Bakim Gecmisi", 20, y);
    y += 15;

    if (arac.bakimGecmisi?.length) {
      arac.bakimGecmisi.forEach((bakim: any) => {
        belge.setFontSize(11);
        belge.text(`${bakim.tarih} | ${bakim.km} KM | ${bakim.islem}`, 20, y);
        y += 10;

        if (bakim.not) {
          belge.text(`Not: ${bakim.not}`, 25, y);
          y += 10;
        }

        y += 5;
      });
    } else {
      belge.text("Bakim kaydi bulunamadi.", 20, y);
    }

    belge.save(`${arac.plaka}-servis-raporu.pdf`);
  };

  if (!giris) {
    return (
      <main style={styles.loginPage}>
        <div style={styles.loginBox}>
          <h1 style={styles.logo}>PITSTOP77 Admin</h1>

          <input
            type="password"
            placeholder="Admin şifresi"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={() =>
              sifre === "pitstop77" ? setGiris(true) : alert("Şifre yanlış")
            }
            style={styles.redButton}
          >
            Giriş Yap
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <h1 style={styles.logo}>PITSTOP77 Admin</h1>

      <section style={styles.panel}>
        <h2>{duzenlenenId ? "Araç Bilgilerini Düzenle" : "Yeni Araç Ekle"}</h2>

        <input style={styles.input} placeholder="Plaka" value={plaka} onChange={(e) => setPlaka(e.target.value)} />
        <input style={styles.input} placeholder="Müşteri Adı" value={musteri} onChange={(e) => setMusteri(e.target.value)} />
        <input style={styles.input} placeholder="Telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
        <input style={styles.input} placeholder="Marka" value={marka} onChange={(e) => setMarka(e.target.value)} />
        <input style={styles.input} placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
        <input style={styles.input} placeholder="KM" value={km} onChange={(e) => setKm(e.target.value)} />

        <select style={styles.input} value={islem} onChange={(e) => setIslem(e.target.value)}>
          <option>Yağ Değişimi</option>
          <option>Fren Değişimi</option>
          <option>Arıza Tespiti</option>
          <option>Filtre Değişimi</option>
          <option>Buji Değişimi</option>
          <option>Genel Kontrol</option>
        </select>

        <button onClick={aracEkle} style={styles.redButton}>
          {duzenlenenId ? "Araç Bilgilerini Güncelle" : "Araç Kaydı Oluştur"}
        </button>

        {duzenlenenId && (
          <button onClick={temizle} style={styles.grayButton}>
            Vazgeç
          </button>
        )}
      </section>

      <section style={styles.panel}>
        <h2>Gelen Talepler</h2>

        {talepler.length === 0 && (
          <p style={{ color: "#aaa" }}>Henüz gelen talep yok.</p>
        )}

        {talepler.map((talep) => (
          <div key={talep.id} style={styles.card}>
            <h3 style={styles.plate}>{talep.plaka}</h3>

            <p><b>Ad:</b> {talep.ad}</p>
            <p><b>Telefon:</b> {talep.telefon}</p>
            <p><b>Araç:</b> {talep.arac}</p>
            <p><b>Konum:</b> {talep.konum}</p>
            <p><b>Hizmet:</b> {talep.hizmet}</p>
            <p><b>Durum:</b> {talep.durum}</p>

            <div style={styles.actions}>
              <button
                onClick={() => talepDurumGuncelle(talep.id, "İşlemde")}
                style={styles.grayButton}
              >
                İşlemde
              </button>

              <button
                onClick={() => talepDurumGuncelle(talep.id, "Tamamlandı")}
                style={styles.blueButton}
              >
                Tamamlandı
              </button>

              <button
                onClick={() => talebiAracaCevir(talep)}
                style={styles.blueButton}
              >
                Araç Kaydına Çevir
              </button>

              <a
                href={`https://wa.me/90${String(talep.telefon)
                  .replace(/\D/g, "")
                  .replace(/^0/, "")}?text=${encodeURIComponent(
                  `Merhaba ${talep.ad},

PITSTOP77 bakım talebiniz alınmıştır. Size yardımcı olmak için ulaşıyoruz.`
                )}`}
                target="_blank"
                style={styles.linkButton}
              >
                WhatsApp
              </a>

              <button
                onClick={() => talepSil(talep.id)}
                style={styles.redButton}
              >
                Talebi Sil
              </button>
            </div>
          </div>
        ))}
      </section>

      <section style={styles.panel}>
        <h2>Bakım Geçmişi Ekle</h2>

        <select style={styles.input} value={bakimAracId} onChange={(e) => setBakimAracId(e.target.value)}>
          <option value="">Araç Seç</option>
          {araclar.map((arac) => (
            <option key={arac.id} value={arac.id}>
              {arac.plaka} - {arac.musteri}
            </option>
          ))}
        </select>

        <input style={styles.input} placeholder="Bakım KM" value={bakimKm} onChange={(e) => setBakimKm(e.target.value)} />

        <select style={styles.input} value={bakimIslem} onChange={(e) => setBakimIslem(e.target.value)}>
          <option>Yağ Değişimi</option>
          <option>Fren Değişimi</option>
          <option>Arıza Tespiti</option>
          <option>Filtre Değişimi</option>
          <option>Genel Kontrol</option>
        </select>

        <input style={styles.input} placeholder="Not" value={bakimNot} onChange={(e) => setBakimNot(e.target.value)} />

        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setBakimDosya(e.target.files?.[0] || null)}
          style={styles.input}
        />

        <button onClick={bakimEkle} style={styles.redButton}>
          Bakım Geçmişi Ekle
        </button>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Kayıtlı Araçlar</h2>

        <input
          style={styles.input}
          placeholder="Plaka, müşteri veya telefon ara..."
          value={arama}
          onChange={(e) => setArama(e.target.value)}
        />

        {araclar
          .filter((arac) => {
            const kelime = arama.toLowerCase();

            return (
              arac.plaka?.toLowerCase().includes(kelime) ||
              arac.musteri?.toLowerCase().includes(kelime) ||
              arac.telefon?.toLowerCase().includes(kelime)
            );
          })
          .map((arac) => {
            const aracLink = `https://pitstop77web-five.vercel.app/arac/${arac.id}`;
            const kalanKm = Number(arac.sonrakiBakimKm) - Number(arac.km);

            return (
              <div key={arac.id} style={styles.card}>
                <h3 style={styles.plate}>{arac.plaka}</h3>

                <p><b>ID:</b> {arac.id}</p>
                <p><b>Müşteri:</b> {arac.musteri}</p>
                <p><b>Telefon:</b> {arac.telefon}</p>
                <p><b>Araç:</b> {arac.marka} {arac.model}</p>
                <p><b>KM:</b> {arac.km}</p>
                <p><b>Son Bakım:</b> {arac.sonBakim}</p>
                <p><b>Sonraki Bakım KM:</b> {arac.sonrakiBakimKm}</p>

                {kalanKm <= 2000 && kalanKm > 0 && (
                  <div style={styles.warning}>
                    ⚠ Bakıma {kalanKm} KM kaldı
                  </div>
                )}

                {Number(arac.km) >= Number(arac.sonrakiBakimKm) && (
                  <div style={styles.danger}>
                    🔴 Bakım zamanı geldi!
                  </div>
                )}

                <p><b>İşlem:</b> {arac.islem}</p>

                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(aracLink)}&v=${arac.id}`}
                  alt="QR"
                  style={styles.qr}
                />

                <div style={styles.actions}>
                  <a href={aracLink} target="_blank" style={styles.linkButton}>
                    Sayfayı Aç
                  </a>

                  <button onClick={() => window.print()} style={styles.grayButton}>
                    QR Yazdır
                  </button>

                  <button onClick={() => aracDuzenle(arac)} style={styles.blueButton}>
                    Düzenle
                  </button>

                  <a
                    href={`https://wa.me/90${String(arac.telefon)
                      .replace(/\D/g, "")
                      .replace(/^0/, "")}?text=${encodeURIComponent(
                      `Merhaba ${arac.musteri},

Aracınızın bakım zamanı yaklaşmıştır.

PITSTOP77
0545 470 84 82`
                    )}`}
                    target="_blank"
                    style={styles.linkButton}
                  >
                    WhatsApp Hatırlat
                  </a>

                  <button onClick={() => pdfOlustur(arac)} style={styles.blueButton}>
                    PDF Oluştur
                  </button>

                  <button onClick={() => aracSil(arac.id)} style={styles.redButton}>
                    Aracı Sil
                  </button>
                </div>
              </div>
            );
          })}
      </section>
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
  loginPage: {
    minHeight: "100vh",
    background: "#050505",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial",
  },
  loginBox: {
    background: "#111",
    border: "1px solid #7f1d1d",
    borderRadius: 24,
    padding: 30,
    width: "100%",
    maxWidth: 400,
  },
  logo: {
    color: "#ef1111",
    fontSize: 44,
  },
  panel: {
    background: "#111",
    padding: 25,
    borderRadius: 20,
    border: "1px solid #7f1d1d",
    marginTop: 25,
  },
  card: {
    background: "#111",
    border: "1px solid #7f1d1d",
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
  },
  plate: {
    color: "#ef4444",
    fontSize: 30,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    background: "#050505",
    color: "white",
    border: "1px solid #7f1d1d",
  },
  qr: {
    background: "white",
    padding: 12,
    borderRadius: 16,
    marginTop: 10,
  },
  actions: {
    marginTop: 15,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  redButton: {
    background: "#dc2626",
    color: "white",
    padding: "12px 18px",
    borderRadius: 12,
    border: "none",
    fontWeight: 900,
    cursor: "pointer",
  },
  blueButton: {
    background: "#2563eb",
    color: "white",
    padding: "12px 18px",
    borderRadius: 12,
    border: "none",
    fontWeight: 900,
    cursor: "pointer",
  },
  grayButton: {
    background: "#333",
    color: "white",
    padding: "12px 18px",
    borderRadius: 12,
    border: "none",
    fontWeight: 900,
    cursor: "pointer",
  },
  linkButton: {
    background: "#16a34a",
    color: "white",
    padding: "12px 18px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 900,
  },
  warning: {
    background: "#f59e0b",
    color: "#000",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    fontWeight: 900,
  },
  danger: {
    background: "#dc2626",
    color: "white",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    fontWeight: 900,
  },
};