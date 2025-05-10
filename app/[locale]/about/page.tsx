import React from "react";
import { notFound } from "next/navigation";
import CoverImage from "../components/CoverImage";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

type AboutData = {
  description: string;
};

async function fetchAbout(locale: string): Promise<AboutData> {
  const apiUrl = `${baseUrl}/api/abouts?locale=${locale}&populate=*`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to fetch about data for locale: ${locale}`);
    }
    const data = await response.json();

    const aboutData = data?.data?.[0];

    return {
      description: aboutData?.description || "No description available.",
    };
  } catch (error) {
    console.error("Error fetching about data:", error);
    throw new Error("Data fetch failed");
  }
}

const AboutPage = async ({ params }: { params: { locale: string } }) => {
  try {
    const locale = params.locale || "en";
    const about = await fetchAbout(locale);

    return (
      <>
      <CoverImage/>
      <section className="min-h-screen bg-gray-150 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-brown">
            {locale === "ar" ? "من نحن" : "About Us"}
          </h1>
          <p className="text-xl text-gray-700 text-center max-w-6xl mx-auto whitespace-pre-line">
            {about.description}
          </p>
        </div>
      </section></>
    );
  } catch {
    notFound();
  }
};

export default AboutPage;

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}
