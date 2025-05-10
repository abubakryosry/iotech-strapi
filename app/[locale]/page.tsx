import HeroSection from "@/app/[locale]/components/HeroSection/HeroSection";
import Testimonial from "@/app/[locale]/components/testimonial/Testimonial";
import WhiteSection from "@/app/[locale]/components/whitesection/WhiteSection";
import { Metadata } from "next";
import TeamSlider from "./components/Team";
import { notFound } from "next/navigation"; 

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;

  return {
    title: locale === "ar" ? "المهمة التقنية IO | الصفحة الرئيسية" : "IO Tech Task | Home",
    description: locale === "ar" ? "الصفحة الرئيسية" : "Home Page",
  };
}

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;

  if (!["en", "ar"].includes(locale)) {
    notFound(); 
    return; 
  }

  return (
    <>
      <HeroSection locale={locale} />
      <TeamSlider locale={locale} />
      <Testimonial locale={locale} />
      <WhiteSection locale={locale} />
    </>
  );
}
