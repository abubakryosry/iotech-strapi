'use client';

import React from 'react';
import { fetchServices } from '@/lib/api';
import Link from 'next/link';
import CoverImage from '@/app/[locale]/components/CoverImage';

interface Service {
  id: number;
  title: string;
  description: string;
}

async function getServicesData(locale: string): Promise<Service[]> {
  const currentLocale = locale === 'ar' || locale === 'en' ? locale : 'en';
  return await fetchServices(currentLocale);
}

const Services = async ({ params }: { params: { locale?: string } }) => {
  const services = await getServicesData(params.locale ?? 'en');

  if (!services || services.length === 0) return <p>Loading...</p>;

  return (
    <>
      <CoverImage />
      <div dir={params.locale === 'ar' ? 'rtl' : 'ltr'} className="p-12 bg-gray-100 min-h-screen">
        {/* Conditional Title based on locale */}
        <h1 className="text-4xl font-extrabold mb-8 text-brown">
          {params.locale === 'ar' ? 'خدماتنا' : 'Our Services'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="p-6 bg-white rounded-lg shadow-lg transition transform hover:scale-105">
              <ul className="space-y-3">
                <li>
                  <Link
                    href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-gray-700 text-lg font-medium hover:text-blue-600 transition"
                  >
                    {service.title}
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;
