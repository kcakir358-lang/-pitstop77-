"use client"

import { useEffect, useState } from "react"
import { db } from "@/src/firebase"

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore"

export default function AdminPage() {

  const [giris, setGiris] = useState(false)
  const [sifre, setSifre] = useState("")
  const [arama, setArama] = useState("")
  const [talepler, setTalepler] = useState<any[]>([])

  const adminSifre = "pitstop77"

  useEffect(() => {

    if (!giris) return

    const q = query(
      collection(db, "servisTalepleri"),
      orderBy("tarih", "desc")
    )

    const unsub = onSnapshot(q, (querySnapshot) => {

      const liste: any[] = []

      querySnapshot.forEach((docu) => {

        liste.push({
          id: docu.id,
          ...docu.data()
        })

      })

      setTalepler(liste)

    })

    return () => unsub()

  }, [giris])

  // LOGIN
  if (!giris) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-zinc-900 border border-red-900 rounded-[35px] p-10 shadow-2xl">

          <h1 className="text-5xl font-black text-center mb-10 bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
            Admin Giriş
          </h1>

          <input
            type="password"
            placeholder="Şifre"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            className="w-full bg-black border border-red-900 rounded-2xl px-6 py-5 text-lg outline-none mb-6"
          />

          <button
            onClick={() => {

              if (sifre === adminSifre) {

                setGiris(true)

              } else {

                alert("Şifre yanlış")

              }

            }}
            className="w-full bg-red-600 hover:bg-red-700 duration-300 py-5 rounded-2xl text-xl font-black"
          >
            Giriş Yap
          </button>

        </div>

      </main>

    )
  }

  return (

    <main className="min-h-screen bg-black text-white p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <div>

          <h1 className="text-6xl font-black bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
            Admin Panel
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Gelen servis taleplerini yönetin
          </p>

        </div>

        <button
          onClick={() => setGiris(false)}
          className="bg-zinc-800 hover:bg-zinc-700 px-6 py-4 rounded-2xl font-bold"
        >
          Çıkış Yap
        </button>

      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Müşteri / Telefon / Araç ara..."
        value={arama}
        onChange={(e) => setArama(e.target.value)}
        className="w-full max-w-2xl bg-zinc-900 border border-red-900 rounded-2xl px-6 py-5 text-lg outline-none mb-12"
      />

      {/* LIST */}
      <div className="grid gap-8">

        {talepler
          .filter((talep) => {

            const kelime = arama.toLowerCase()

            return (

              talep.isim?.toLowerCase().includes(kelime) ||
              talep.telefon?.toLowerCase().includes(kelime) ||
              talep.arac?.toLowerCase().includes(kelime)

            )

          })
          .map((talep) => (

            <div
              key={talep.id}
              className={`rounded-[35px] p-8 border shadow-2xl transition-all duration-300 hover:scale-[1.01]
              ${talep.tamamlandi
                  ? "bg-gradient-to-br from-green-950 to-black border-green-600"
                  : "bg-gradient-to-br from-zinc-900 to-black border-red-700"
                }`}
            >

              {/* STATUS */}
              <div className="mb-6">

                {talep.tamamlandi ? (

                  <span className="bg-green-500 text-black px-5 py-2 rounded-full font-black shadow-lg">
                    Tamamlandı
                  </span>

                ) : (

                  <span className="bg-red-600 px-5 py-2 rounded-full font-black shadow-lg">
                    Bekliyor
                  </span>

                )}

              </div>

              {/* NAME */}
              <h2 className="text-4xl font-black mb-6">
                {talep.isim}
              </h2>

              {/* INFO */}
              <div className="space-y-4 text-xl text-gray-300">

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

              {/* MAP */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${talep.konum}`}
                target="_blank"
                className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-2xl font-bold"
              >
                Haritada Aç
              </a>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-4 mt-8">

                <button
                  onClick={async () => {

                    await updateDoc(
                      doc(db, "servisTalepleri", talep.id),
                      {
                        tamamlandi: true
                      }
                    )

                    alert("Servis tamamlandı")

                  }}
                  className="bg-green-600 hover:bg-green-700 px-6 py-4 rounded-2xl font-black"
                >
                  Tamamlandı
                </button>

                <button
                  onClick={async () => {

                    await deleteDoc(
                      doc(db, "servisTalepleri", talep.id)
                    )

                    alert("Talep silindi")

                  }}
                  className="bg-red-600 hover:bg-red-700 px-6 py-4 rounded-2xl font-black"
                >
                  Sil
                </button>

                <a
                  href={`https://wa.me/${talep.telefon}`}
                  target="_blank"
                  className="bg-green-500 hover:bg-green-600 text-black px-6 py-4 rounded-2xl font-black"
                >
                  WhatsApp
                </a>

              </div>

            </div>

          ))}

      </div>

    </main>

  )
}