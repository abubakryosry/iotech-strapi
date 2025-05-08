"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

type Slide = {
  type: "image" | "video";
  src: string;
  alt: string;
};

type HeroSectionProps = {
  locale: string;
};

const fetchHeroSection = async (): Promise<Slide[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/hero-section?populate=*`);
    if (!response.ok) throw new Error("Failed to fetch hero section data");

    const data = await response.json();
    const heroData = data?.data?.hero || [];

    // Format the media URLs
    const formattedSlides: Slide[] = heroData.map((item: any) => {
      const url = item.url ? `${baseUrl}${item.url}` : "";
      const type = item.mime.startsWith("video/") ? "video" : "image";
      const alt = item.alternativeText || "Hero slide";
      return { type, src: url, alt };
    });

    return formattedSlides;
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return [];
  }
};

const HeroSection = ({ locale }: HeroSectionProps) => {
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    const loadSlides = async () => {
      const data = await fetchHeroSection();
      setSlides(data);
    };
    loadSlides();
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Swiper */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            renderBullet: (index, className) =>
              `<span class="${className} custom-bullet"></span>`,
          }}
          loop
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              {slide.type === "image" ? (
                <div className="relative w-full h-full">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 bg-black/60"></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto h-full flex items-center justify-center px-6 w-[90%]">
        <div
          className={`flex w-full items-center justify-between ${
            locale === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          {/* Left Section: Pagination - Text - Image */}
          <div
            className={`flex flex-col space-y-6 w-[80%] ${
              locale === "ar" ? "flex-row-reverse" : ""
            }`}
          >
            <div className="custom-pagination flex flex-col space-y-3"></div>
            <div
              className={`text-white ${
                locale === "ar" ? "md:mr-20 text-right" : "md:ml-20 text-left"
              }`}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {locale === "ar" ? "لوريم إيبسوم" : "Lorem Ipsum"}
              </h1>
              <p className="text-md max-w-md w-[150%]">
                {locale === "ar"
                  ? "لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد. كان لوريم إيبسوم النص الوهمي القياسي للصناعة منذ القرن السادس عشر."
                  : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}
              </p>
              <button className="bg-white text-brown px-6 py-3 md:mt-10 rounded-md font-semibold hover:bg-gray-100 transition">
                {locale === "ar" ? "اقرأ المزيد" : "Read More"}
              </button>
            </div>
          </div>

          {/* Right Section: Square Image */}
          <div className="bg-brown p-2 rounded-md shadow-lg w-[300px] h-[300px] flex items-center justify-center">
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              width={300}
              height={300}
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
