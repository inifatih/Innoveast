import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      id="innovation-partner"
      className="py-20 bg-white px-6 border-t border-gray-100 max-w-7xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row items-start gap-8">
        
        {/* Kiri: Judul */}
        <div className="lg:w-1/3 text-center flex flex-col items-center gap-3">
          <h1 className="text-5xl font-bold text-orange-500">
            ORBIT
          </h1>

          <div className="flex items-center gap-3 mt-2">
            {/* Logo B */}
            <div
              className="w-12 h-12 flex items-center justify-center rounded-xl text-white font-bold text-2xl"
              style={{
                background: "linear-gradient(135deg, #A3D9C9 0%, #6BC7C0 100%)",
              }}
            >
              B
            </div>

            {/* Teks BRIDA JATIM */}
            <h1 className="text-3xl font-semibold text-teal-700 tracking-tight">
              BRIDA JATIM
            </h1>
          </div>
        </div>

        {/* Kanan: Isi */}
        <div className="lg:w-2/3 text-left text-gray-700 space-y-6">
          <h2 className="text-lg font-semibold mb-4">
            Unlocking Innovation, Empowering East Java
          </h2>

          <div className="space-y-6 leading-relaxed">
            <div>
              <h3 className="font-bold text-xl mb-2">Who We Are</h3>
              <p className="text-justify leading-normal text-gray-700">
                ORBIT Jatim (Organisasi Repositori dan Jembatan Inovasi Teknologi) adalah platform digital terintegrasi yang mengakselerasi komersialisasi produk inovasi dengan mempertemukan inventor, industri, investor, dan pemangku kebijakan dalam ekosistem kolaboratif yang terukur. Terdapat tiga fitur utama ORBIT Jatim, yaitu:
              </p>

              {/* Features List */}
              <ol className="space-y-4 list-decimal list-inside text-gray-700">
                <li>
                  <span className="font-semibold">Innovation Portfolio Management System:</span> 
                  katalog komprehensif produk inovasi dengan dokumentasi lengkap, spesifikasi teknis, dan status IPR yang terverifikasi.
                </li>
                <li>
                  <span className="font-semibold">Innovation Matching Feature:</span> 
                  mencocokkan kebutuhan spesifik industri dengan solusi inovasi yang telah dikurasi oleh BRIDA Jawa Timur.
                </li>
                <li>
                  <span className="font-semibold">Pusat Informasi Ekosistem Inovasi:</span> 
                  menyediakan update event, berita terkini, dan insight perkembangan inovasi regional untuk mendukung keputusan strategis stakeholder.
                </li>
              </ol>
            </div>
          </div>

          {/* Link to About Orbit Jatim */}
          <Link
            href="/about"
            className="mt-6 inline-block text-cyan-600 font-semibold underline hover:underline-offset-2 transition-colors"
          >
            Learn more about Orbit Jatim &gt;
          </Link>
        </div>
      </div>
    </section>
  );
}