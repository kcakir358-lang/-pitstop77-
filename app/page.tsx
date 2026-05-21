"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminPage() {
  const [talepler, setTalepler] = useState<any[]>([]);
  const [sifre, setSifre] = useState("");
  const [giris, setGiris] = useState(false);

  useEffect(() => {
    const kontrol = localStorage.getItem("admin");
    if (kontrol === "true") {
      setGiris(true);
      verileriGetir();
    }
  }, []);

  const login = () => {
    if (sifre === "pitstop77") {
      localStorage.setItem("admin", "true");
      setGiris(true);
      verileriGetir();
    } else {
      alert("Şifre yanlış");
    }
  };

  const verileriGetir = async () => {
    const querySnapshot = await getDocs(
      collection(db, "servisTalepleri")
    );

    const liste: any[] = [];

    querySnapshot.forEach((docItem) => {
      liste.push({
        id: docItem.id,
        ...docItem.data(),
      });
    });

    setTalepler(liste);
  };

  const sil = async (id: string) => {
    await deleteDoc(doc(db, "servisTalepleri", id));
    verileriGetir();
  };

  const tamamla = async (id: string) => {
    await updateDoc(doc(db, "servisTalepleri", id), {
      tamamlandi: true,
    });

    verileriGetir();
  };

  if (!giris) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md border border-red-900">
          <h1 className="text-4xl font-black text-white mb-8 text-center">
            Admin Giriş
          </h1>

          <input
            type="password"
            placeholder="Şifre"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            className="w-full p-4 rounded-2xl bg-black border border-red-900 text-white mb-6"
          />

          <button
            onClick={login}
            className="w-full bg-red-600 hover:bg-red-700 duration-300 py-4 rounded-2xl text-white font-black text-xl"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-black mb-10">
        PITSTOP77 Admin Panel
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-12">

        <div className="bg-zinc-900 p-6 rounded-3xl border border-red-900">
          <h2 className="text-gray-400 mb-2">
            Toplam İş
          </h2>

          <p className="text-4xl font-black">
            {talepler.length}
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl border border-green-700">
          <h2 className="text-gray-400 mb-2">
            Tamamlanan
          </h2>

          <p className="text-4xl font-black text-green-500">
            {talepler.filter((t) => t.tamamlandi).length}
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl border border-yellow-700">
          <h2 className="text-gray-400 mb-2">
            Bekleyen
          </h2>

          <p className="text-4xl font-black text-yellow-400">
            {talepler.filter((t) => !t.tamamlandi).length}
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl border border-red-700">
          <h2 className="text-gray-400 mb-2">
            Toplam Kazanç
          </h2>

          <p className="text-4xl font-black text-red-500">
            ₺
            {talepler.reduce(
              (toplam, t) => toplam + (t.ucret || 0),
              0
            )}
          </p>
        </div>

      </div>

      <div className="grid gap-8">

        {talepler.map((talep) => (

          <div
            key={talep.id}
            className="bg-zinc-900 border border-red-900 rounded-3xl p-8"
          >

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <h2 className="text-3xl font-black mb-4">
                  {talep.isim}
                </h2>

                <div className="space-y-2 text-lg text-gray-300">

                  <p>
                    📞 {talep.telefon}
                  </p>

                  <p>
                    🚗 {talep.arac}
                  </p>

                  <p>
                    📍 {talep.konum}
                  </p>

                  <p>
                    🔧 {talep.hizmet}
                  </p>

                </div>

                <p className="text-3xl font-black text-green-500 mt-6">
                  ₺ {talep.ucret || 0}
                </p>

                <p
                  className={`mt-4 text-xl font-bold ${
                    talep.tamamlandi
                      ? "text-green-500"
                      : "text-yellow-400"
                  }`}
                >
                  {talep.tamamlandi
                    ? "Tamamlandı"
                    : "Bekliyor"}
                </p>

              </div>

              <div className="flex flex-col gap-4">

                <a
                  href={`https://wa.me/${talep.telefon}`}
                  target="_blank"
                  className="bg-green-600 hover:bg-green-700 px-6 py-4 rounded-2xl font-bold text-center"
                >
                  WhatsApp
                </a>

                <button
                  onClick={() => tamamla(talep.id)}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-2xl font-bold"
                >
                  Tamamlandı
                </button>

                <button
                  onClick={() => sil(talep.id)}
                  className="bg-red-600 hover:bg-red-700 px-6 py-4 rounded-2xl font-bold"
                >
                  Sil
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}