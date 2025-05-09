"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { fetchClients } from "../../../../lib/api";

type Testimonial = {
  id: number | string;
  name: string;
  title: string;
  image: string;
  text: string;
};

export default function TestimonialSection({ locale }: { locale: string }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function getTestimonials() {
      try {
        const clientsResponse = await fetchClients(locale);
  
        const clients = clientsResponse.data || [];
  
        if (!Array.isArray(clients) || clients.length === 0) {
          console.warn("No valid clients returned from API");
          setTestimonials([]); 
          return;
        }
  
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  
        const formattedTestimonials = clients.map((client: any) => {
          const imageUrl = client.image?.url
            ? `${baseUrl}${client.image.url}`
            : "/placeholder-image.jpg";
  
          return {
            id: client.id || "No ID",
            name: client.name || "No Name",
            title: client.tittle || "No Title",
            image: imageUrl,
            text: client.feedback || "No Testimonial",
          };
        });
  
        setTestimonials(formattedTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    }
  
    getTestimonials();
  }, [locale]);

  if (testimonials.length === 0) {
    return <p>Loading testimonials...</p>;
  }

  const testimonial = testimonials[index];

  const prev = () =>
    setIndex((index - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((index + 1) % testimonials.length);

  return (
    <section
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="bg-brown text-white pt-16 px-4 md:pb-16"
    >
      <div className="w-[80%] mx-auto space-y-12">
        <div className={`text-left ${locale === "ar" ? "text-right" : ""}`}>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            {locale === "ar" ? "ما يقوله عملاؤنا" : "What our clients are saying"}
          </h2>
          <p className="text-sm text-white/80 max-w-2xl opacity-60">
            {locale === "ar"
              ? "عملاؤنا يشملون مستثمرين أفراد، وشركات محلية ودولية بالإضافة إلى شركات فورتشن 500."
              : "Our clients range from individual investors, to local, international as well as Fortune 500 companies."}
          </p>
        </div>

        <div
          className={`flex flex-col md:flex-row gap-10 md:gap-16 mb-0 ${
            locale === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <div className="w-64 h-64 relative rounded-md overflow-hidden shrink-0">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col justify-between flex-1 h-64">
            <p className="text-white/90 text-sm leading-relaxed opacity-60">
              "{testimonial.text}"
            </p>
            <div className="flex flex-col">
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-white/70 text-xs">{testimonial.title}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-brown transition"
            onClick={prev}
          >
            {locale === "ar" ? <FaArrowRight /> : <FaArrowLeft />}
          </button>
          <button
            className="w-10 h-10 rounded-full border border-white bg-white  text-brown flex items-center justify-center hover:text-white hover:bg-brown transition"
            onClick={next}
          >
            {locale === "ar" ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
        </div>
      </div>
    </section>
  );
}