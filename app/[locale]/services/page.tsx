// app/[locale]/services/page.tsx

import React from 'react';
import CoverImage from '../components/CoverImage';
import { fetchServices } from '@/lib/api';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

type Service = {
  id: number;
  title: string;
  description: string;
};

// Fetch services based on locale
async function fetchServicesData(locale: string): Promise<Service[]> {
  const apiUrl = `${baseUrl}/api/services?locale=${locale}`;

  try {
    const response = await fetch(apiUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    const data = await response.json();
    return (
      data?.data?.map((service: any) => ({
        id: service.id,
        title: service.serviceName,
        description: service.description,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// SSR Page Component
const ServicesPage = async ({ params }: { params: { locale: string } }) => {
  const locale = params.locale || 'en'; // Fallback to 'en' if locale is undefined
  const services = await fetchServicesData(locale);

  return (
    <>
      <CoverImage />
      <div
        className={`p-12 min-h-screen bg-gray-100 ${locale === 'ar' ? 'text-right' : 'text-left'}`}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <h1 className="text-4xl font-extrabold mb-8 text-brown">
          {locale === 'ar' ? 'خدماتنا' : 'Our Services'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.length === 0 ? (
            <p className="text-gray-700">
              {locale === 'ar' ? 'لا توجد خدمات.' : 'No services found.'}
            </p>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="p-6 bg-white rounded-lg shadow-lg transition transform hover:scale-105"
              >
                <ul className="space-y-3">
                  <li>
                    <a
                      href={`/${locale}/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-gray-700 text-lg font-medium hover:text-blue-600 transition"
                    >
                      {service.title}
                    </a>
                  </li>
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ServicesPage;

// Enable dynamic params to support locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
