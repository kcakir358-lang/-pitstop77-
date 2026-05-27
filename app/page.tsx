export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur border-b border-red-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <img src="/logo.png" alt="Pitstop77" className="w-24" />

          <nav className="hidden md:flex gap-10 text-lg font-semibold">
            <a href="#" className="hover:text-red-500 duration-300">Ana Sayfa</a>
            <a href="#hizmetler" className="hover:text-red-500 duration-300">Hizmetler</a>
            <a href="#iletisim" className="hover:text-red-500 duration-300">İletişim</a>
          </nav>

          <a href="https://wa.me/905427255217" className="bg-red-600 hover:bg-red-700 duration-300 px-6 py-3 rounded-xl font-bold">
            Servis Çağır
          </a>
        </div>
      </header>

      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img src="/logo.png" alt="Pitstop77" className="w-48 mb-8" />

            <h1 className="text-6xl md:text-7xl font-black leading-tight mb-8">
              Aracının
              <span className="block text-red-600">Bakımı</span>
              Ayağına Gelsin
            </h1>

            <p className="text-gray-300 text-xl leading-relaxed mb-10">
              Mobil servis aracımız ile bulunduğunuz konuma geliyoruz. Yağ değişimi,
              fren değişimi ve arıza tespiti hizmetlerini profesyonel şekilde sunuyoruz.
            </p>

            <div className="flex flex-wrap gap-5">
              <a href="https://wa.me/905427255217" className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl font-bold text-lg duration-300">
                Servis Çağır
              </a>

              <a href="#iletisim" className="border border-gray-600 hover:border-red-600 px-8 py-4 rounded-2xl font-bold text-lg duration-300">
                WhatsApp Destek
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop"
              alt="Car"
              className="rounded-[40px] shadow-2xl"
            />

            <div className="absolute -bottom-8 left-10 bg-black border border-red-700 px-8 py-5 rounded-3xl shadow-2xl">
              <h3 className="text-red-500 text-3xl font-black">7/24 Mobil Servis</h3>
              <p className="text-gray-300 mt-2">Bulunduğunuz konuma geliyoruz</p>
            </div>
          </div>
        </div>
      </section>

      <section id="hizmetler" className="py-28 px-6 bg-gradient-to-b from-black to-red-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6">Hizmetlerimiz</h2>
            <p className="text-gray-400 text-xl">Profesyonel mobil oto bakım hizmetleri</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black border border-red-900 rounded-3xl p-10">
              <h3 className="text-3xl font-black mb-4">Yağ Değişimi</h3>
              <p className="text-gray-400 text-lg">Profesyonel yağ ve filtre değişimi hizmeti.</p>
            </div>

            <div className="bg-black border border-red-900 rounded-3xl p-10">
              <h3 className="text-3xl font-black mb-4">Fren Değişimi</h3>
              <p className="text-gray-400 text-lg">Balata ve fren sistemi kontrolü.</p>
            </div>

            <div className="bg-black border border-red-900 rounded-3xl p-10">
              <h3 className="text-3xl font-black mb-4">Arıza Tespiti</h3>
              <p className="text-gray-400 text-lg">Bilgisayarlı arıza tespit hizmeti.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="iletisim" className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-5xl font-black mb-6">Servis Talebi Oluştur</h2>
            <p className="text-gray-400 text-xl">Bize WhatsApp üzerinden ulaşabilirsiniz.</p>
          </div>

          <a
            href="https://wa.me/905427255217"
            className="block text-center w-full bg-red-600 hover:bg-red-700 duration-300 py-5 rounded-2xl text-2xl font-black"
          >
            WhatsApp ile Servis Talebi Gönder
          </a>
        </div>
      </section>
    </main>
  );
}