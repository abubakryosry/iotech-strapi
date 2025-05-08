"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchTeams } from "@/lib/api";

interface TeamSliderProps {
  locale: string;
}

export default function TeamSlider({ locale }: TeamSliderProps) {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const getTeams = async () => {
      try {
        const data = await fetchTeams(locale);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

        const formattedTeams =
          data?.data?.map((member: any) => {
            const imageUrl = member?.image?.url
              ? `${baseUrl}${member.image.url}`
              : "/image.png";

            return {
              id: member.id || "No ID",
              name: member.name || "Name Here",
              position: member.title || "Position Here",
              image: imageUrl,
            };
          }) || [];

        setTeamMembers(formattedTeams);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    getTeams();
  }, [locale]);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      if (swiperInstance && swiperInstance.params.navigation) {
        swiperInstance.params.navigation.prevEl = ".custom-prev-btn";
        swiperInstance.params.navigation.nextEl = ".custom-next-btn";
        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
      }
    }
  }, [teamMembers]);

  return (
    <section
      className={`bg-gray-200 py-16 px-4 text-center w-full ${
        locale === "ar" ? "rtl" : ""
      }`}
    >
      <h2 className="text-3xl font-bold text-brown mb-4">
        {locale === "ar" ? "فريقنا" : "Our Team"}
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-10">
        {locale === "ar"
          ? "لوريم إيبسوم هو نص شكلي يستخدم في صناعة الطباعة والتنضيد."
          : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
      </p>

      <div className="relative flex items-center gap-8 justify-center w-[80%] mx-auto">
        {/* Custom Left Arrow */}
        <button
          className={`${
            locale === "ar" ? "ml-32" : "mr-32"
          } cursor-pointer custom-prev-btn`}
          aria-label="Previous Slide"
          style={{
            position: "relative",
            zIndex: 10,
            background: "transparent",
            border: "none",
            outline: "none",
          }}
        >
          <ChevronLeft className="w-10 h-10 text-black pointer-events-none" />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".custom-prev-btn",
            nextEl: ".custom-next-btn",
          }}
          spaceBetween={30}
          slidesPerView={1}
          loop
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full"
        >
          {teamMembers.map((member) => (
            <SwiperSlide key={member.id}>
              <div>
                <div className="relative h-56 mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-brown">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500">{member.position}</p>
                <div className="flex justify-center gap-4 mt-3 text-brown text-lg">
                  <FaWhatsapp />
                  <FaPhoneAlt />
                  <FaEnvelope />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Right Arrow */}
        <button
          className={`${
            locale === "ar" ? "mr-32" : "ml-32"
          } cursor-pointer custom-next-btn`}
          aria-label="Next Slide"
          style={{
            position: "relative",
            zIndex: 10,
            background: "transparent",
            border: "none",
            outline: "none",
          }}
        >
          <ChevronRight className="w-10 h-10 text-black pointer-events-none" />
        </button>
      </div>
    </section>
  );
}