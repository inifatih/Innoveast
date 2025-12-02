// app/events/page.tsx atau components/Events.tsx
import { getPublicNews } from "@/app/(MainLayout)/news/action"; // sesuaikan path
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default async function Events() {
  // Fetch data langsung di server
  const newsItems = await getPublicNews();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
        <Image
          src="/images/Acer1.jpg"
          alt="Innovation Cover"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 drop-shadow-md">Berita</h1>
          <p className="text-lg sm:text-xl max-w-2xl drop-shadow-sm">
            Temukan berita - berita yang cocok.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-11/12 mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-[#1A1333] mb-12">
            News
          </h2>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {newsItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden border-0 shadow-none hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative w-full h-56">
                  {item.image_url && (
                    <Image
                      src={item.image_url}
                      alt={item.judul_news}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-[#1A1333]">
                    {item.judul_news}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    {item.deskripsi_news}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(item.tanggal_news).toLocaleString("id-ID", {
                      timeZone: "Asia/Jakarta",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    | {item.penulis_news}
                  </p>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
