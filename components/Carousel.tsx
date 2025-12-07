"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

export function CarouselComponent() {
  const [current, setCurrent] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const duration = 5000
  const videoRefs = React.useRef<Array<HTMLVideoElement | null>>([])

  const slides = [
    {
      image: "/images/HD1.mp4",
      title: "Discover How to Become an Innovator with BRIDA",
      desc: "Jadilah bagian dari innovator kami, pelajari cara mendaftarkan inovasi, dan bangun kolaborasi dengan industri maupun para innovator.",
      button: "Learn How",
      link: "/contact"
    },
    {
      image: "/images/HD2.mp4",
      title: "MEET LEADING INNOVATORS",
      desc: "Jelajahi ide dan teknologi terbaru dari para innovator terbaik untuk mendukung pertumbuhan bisnis Anda.",
      button: "Explore Innovators",
      link: "/innovator"
    },
    // {
    //   image: "/images/CaroselDepan3.jpg",
    //   title: "WHAT'S NEXT IN INNOVATION",
    //   desc: "Arahkan inovasi Anda ke tahap berikutnya melalui business matching dan peluang pendanaan strategis.",
    //   button: "Discover Opportunities",
    //   link: "/matching"
    // }
  ]

  const quickLinks = [
    { title: "Lihat", desc: "Inovasi Terbaru", link: "/innovation" },
    { title: "Ikuti", desc: "Berita Terbaru", link: "/news" },
    { title: "Kunjungi", desc: "Event", link: "/events" },
    { title: "Baca", desc: "Tentang Kami", link: "/about" },
  ]

  const isVideo = (src: string) => src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov")

  React.useEffect(() => {
    // Play first video immediately
    const firstVid = videoRefs.current[0]
    if (firstVid) firstVid.play().catch(() => {})

    const interval = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % slides.length
        const vid = videoRefs.current[next]
        if (vid) vid.play().catch(() => {})
        setProgress(0)
        return next
      })
    }, duration)

    const progressInterval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 100 : prev + 100 / (duration / 100)))
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [slides.length])

  return (
    <section className="w-full h-screen overflow-hidden">
      <div className="max-w-11/12 flex flex-col items-center mx-auto h-full">

        {/* TEXT OVERLAY */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20 pointer-events-none">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-xl mb-4 transition-all duration-700">
            {slides[current].title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-lg mb-6 transition-all duration-700">
            {slides[current].desc}
          </p>
          <Link
            href={slides[current].link}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-md transition-all shadow-lg pointer-events-auto"
          >
            {slides[current].button}
          </Link>
        </div>

        {/* CAROUSEL */}
        <div className="flex-1 flex items-center justify-center">
          <div className="absolute inset-0 -z-10">
            <Carousel opts={{ align: "center", loop: true }}>
              <CarouselContent>
                {slides.map((slide, index) => (
                  <CarouselItem
                    key={index}
                    className={cn(
                      "flex items-center justify-center min-w-screen h-screen shrink-0 transition-opacity duration-700",
                      current === index
                        ? "opacity-100"
                        : "opacity-0 absolute inset-0 pointer-events-none"
                    )}
                  >
                    <div className="w-full h-full relative">
                      {isVideo(slide.image) ? (
                        <video
                          ref={el => { videoRefs.current[index] = el }}
                          src={slide.image}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          loop
                          preload="auto"
                        />
                      ) : (
                        <Image
                          src={slide.image}
                          alt={`Slide ${index + 1}`}
                          fill
                          priority={index === 0}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* PROGRESS BAR */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* BULLET INDICATOR */}
        <div className="mt-6 flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-2 w-8 rounded-full transition-all cursor-pointer",
                index === current ? "bg-white w-14" : "bg-white/40 hover:bg-white/60"
              )}
              onClick={() => {
                setCurrent(index)
                setProgress(0)
                const vid = videoRefs.current[index]
                if (vid) vid.play().catch(() => {})
              }}
            />
          ))}
        </div>

        {/* QUICK LINKS MOBILE 2x2 */}
        <div className="grid grid-cols-2 gap-2 w-full mt-6 md:hidden px-4">
          {quickLinks.map((item, index) => (
            <Card key={index} className="border-none shadow-none bg-transparent hover:bg-white/50 transition rounded-md">
              <CardContent className="text-white p-3">
                <Link href={item.link} className="text-base font-semibold hover:text-blue-600 transition-colors">
                  <div className="text-sm">{item.title}</div>
                  <div className="text-xs">{item.desc}</div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* QUICK LINKS DESKTOP 1x4 */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-4 w-full mt-6">
          {quickLinks.map((item, index) => (
            <Card key={index} className="border-none shadow-none bg-transparent hover:bg-white/50 transition rounded-none">
              <CardContent className="text-white p-6">
                <Link href={item.link} className="text-lg font-semibold hover:text-blue-600 transition-colors">
                  <div className="text-xl">{item.title}</div>
                  <div className="text-2xl">{item.desc}</div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}