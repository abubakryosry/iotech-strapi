import HeroSection from "@/app/[locale]/components/HeroSection/HeroSection";
import Testimonial from "@/app/[locale]/components/testimonial/Testimonial";
import WhiteSection from "@/app/[locale]/components/whitesection/WhiteSection";
import { Metadata } from "next";
import TeamSlider from "./components/Team";
import { notFound } from "next/navigation"; // Import the notFound utility for redirecting

// Define metadata dynamically based on locale
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;

  return {
    title: locale === "ar" ? "المهمة التقنية IO | الصفحة الرئيسية" : "IO Tech Task | Home",
    description: locale === "ar" ? "الصفحة الرئيسية" : "Home Page",
  };
}

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;

  // Check if the locale is valid
  if (!["en", "ar"].includes(locale)) {
    notFound(); // This will return a 404 error page (or you can redirect to another page)
    return; // This line ensures no further code runs after the redirect
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
